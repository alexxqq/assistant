import React from "react";
import { MessageBubble, MessageContainer } from "./message-style";
import { Message as MessageType } from "@/src/entities/chat/model/types";

export default function Message({msg}: {msg:MessageType}) {
  return (
    <MessageContainer key={msg.id} $isUser={msg.role === "user"}>
      <MessageBubble $isUser={msg.role === "user"}>{msg.content}</MessageBubble>
    </MessageContainer>
  );
}
