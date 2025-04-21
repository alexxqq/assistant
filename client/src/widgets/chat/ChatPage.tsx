"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch,useAppSelector } from "@/src/shared/redux/hooks";
import { fetchMessages, askQuestion } from "@/src/entities/chat";
import {
  addMessage,
  selectIsAsking,
  selectMessagesLoading,
  selectChatError,
  selectMessagesByChatId,
} from "@/src/entities/chat/model/chatSlice";

import { AskInput } from "@/src/features/chat/ui/AskInput";
import { toast } from "sonner";
import MessageLoader from "@/src/features/chat/ui/MessageLoader";
import Message from "@/src/features/chat/ui/Message";
import { Message as MessageType } from "@/src/entities/chat/model/types";
import { ScrollWrapper } from "@/src/features/chat/ui/message-style";
import MessageSkeleton from "@/src/features/chat/ui/MessageSkeleton";
import { Container } from "@/src/features/chat/ui/message-style";

export default function ChatBox() {
  const params = useParams();

  const chatId = params?.chat_id as string;

  const [userInput, setUserInput] = useState("");
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessagesByChatId());
  const error = useAppSelector(selectChatError);
  const asking = useAppSelector(selectIsAsking);
  const messagesLoading = useAppSelector(selectMessagesLoading);
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  useEffect(() => {
    if (chatId) {
      dispatch(fetchMessages(chatId));
    }
  }, [chatId, dispatch]);

  const handleSendMessage = () => {
    const trimmed = userInput.trim();
    if (trimmed) {
      const newMessage = {
        id: Date.now().toString(),
        role: "user",
        content: trimmed,
        createdAt: new Date().toISOString(),
      };
      dispatch(addMessage({ message: newMessage }));
      dispatch(askQuestion({ chatId, question: trimmed }));
      setUserInput("");
    }
  };

  if (messagesLoading) {
    return <MessageSkeleton />;
  }

  if (error) {
    toast(error);
    return null;
  }
  return (
    <Container>
      <ScrollWrapper>
        {messages.length === 0 ? (
          <p>Ask question about topic</p>
        ) : (
          [...messages]
            .reverse()
            .map((msg: MessageType, index) => <Message msg={msg} key={msg?.id || index} />)
        )}
        {asking && <MessageLoader />}
        <div ref={messagesEndRef} />
      </ScrollWrapper>
      <AskInput
        value={userInput}
        confirm={handleSendMessage}
        onChange={(e: any) => setUserInput(e.target.value)}
      />
    </Container>
  );
}
