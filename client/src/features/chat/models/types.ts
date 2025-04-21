export interface MessageProps {
    $isUser: boolean;
  }
  
export interface Message {
    id: string;
    chat_id: string;
    content: string;
    created_at: string;
    role: string;
  }

export interface IChat {
    id: string;
    title: string;
  }