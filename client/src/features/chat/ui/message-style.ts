import styled from "styled-components";
import { MessageProps } from "@/src/features/chat/models/types";

export const MessageContainer = styled.div<MessageProps>`
  display: flex;
  justify-content: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  padding: 8px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem 0 2rem;
  height: 95vh;
  justify-content: space-between;
`;

export const MessageBubble = styled.div<MessageProps>`
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
  word-wrap: break-word;
  box-shadow: ${(props) =>
    props.$isUser
      ? "2px 2px 5px rgba(0, 0, 0, 0.1)"
      : "2px 2px 5px rgba(0, 0, 0, 0.05)"};
  border: ${(props) =>
    props.$isUser ? "1px solid #727171" : "1px solid #727171"};
`;

export const ScrollWrapper = styled.div`
  flex: 1;
  overflow-y: scroll;
`;