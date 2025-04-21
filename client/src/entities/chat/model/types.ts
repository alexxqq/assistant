export interface Chat {
    id: string;
    title: string;
    user_id: string;
    pinecone_namespace: string;
    created_at: string;
  }
  
  export interface Message {
    id: string;
    chat_id: string;
    content: string;
    created_at: string;
    role: string
  }
  
  
  export interface ChatState {
    chats: Chat[] | null;
    messages: Message[] | null;
    loading: boolean;
    messagesLoading: boolean;
    error: string | null;
    asking: boolean;
    uploadError: string | null;
    uploadLoading: boolean;
  }
  