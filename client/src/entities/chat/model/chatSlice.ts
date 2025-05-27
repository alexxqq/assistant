import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/src/shared/redux/makeStore";
import { ChatState, Chat, Message } from "./types";
import { askQuestion, deleteChat, fetchChats, fetchMessages, updateChatTitle, uploadFile } from "./chatThunks";

const initialState: ChatState = {
  chats: null,
  messages: null,
  asking: false,
  loading: false,
  messagesLoading: false, 
  error: null,
  uploadError: null, 
  uploadLoading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<Chat[]>) {
      state.chats = action.payload;
    },
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    setChatLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setChatError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    addMessage: (state, action) => {
        const { message } = action.payload;
        if (!state.messages) {
          state.messages = [];
        }
        state.messages.unshift(message);
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.chats = action.payload.chats;
        state.loading = false;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.chats = null;
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.messagesLoading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
          if (!state.messages) {
            state.messages = [];
          }
          state.messages = action.payload.messages;
        state.messagesLoading = false; 
      })
      .addCase(fetchMessages.rejected, (state,action) => {
        state.messagesLoading = false;
        state.error = action.payload as string;
      })
      .addCase(askQuestion.pending, (state) => {
        state.asking = true;
        state.error = null;
      })
      .addCase(askQuestion.fulfilled, (state, action) => {
        const newMessage: Message = {
          content: action.payload.result,
          chat_id: action.payload.chat_id,
          id: action.payload.id,
          created_at: action.payload.timestamp,
          role: action.payload.role,
        };

        if (state.messages) {
          state.messages = [newMessage, ...state.messages];
        } else {
          state.messages = [newMessage];
        }
        state.asking = false;
      })
      .addCase(askQuestion.rejected, (state, action) => {
        state.messages = null;
        state.asking = false;
        state.error = action.error.message as string;
      }) .addCase(uploadFile.pending, (state) => {
        state.uploadLoading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        const newMessage: Message = {
          content: action.payload.result,
          chat_id: action.payload.chat_id,
          id: action.payload.id,
          created_at: action.payload.timestamp,
          role: action.payload.role,
        };
    
        if (state.messages) {
          state.messages = [...state.messages, newMessage];
        } else {
          state.messages = [newMessage];
        }
        state.uploadLoading = false;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadError = action.payload as string || "File upload failed";
      }).addCase(deleteChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        if (state.chats) state.chats = state.chats?.filter(chat => chat.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to delete chat";
      })
      .addCase(updateChatTitle.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateChatTitle.fulfilled, (state, action) => {
        const chatIndex = state.chats?.findIndex((chat) => chat.id === action.payload.chatId);
        if (chatIndex !== undefined && chatIndex >= 0) {
          state.chats![chatIndex].title = action.payload.title;
        }
        state.loading = false;
      })
      .addCase(updateChatTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to update chat title";
      });
  },
});

export const selectChats = (state: RootState) => state.chat.chats;
export const selectMessages = (state: RootState) => state.chat.messages;
export const selectChatLoading = (state: RootState) => state.chat.loading;
export const selectUploadLoading = (state: RootState) => state.chat.uploadLoading;
export const selectChatError = (state: RootState) => state.chat.error;
export const selectChatMessagesError = (state: RootState) => state.chat;
export const selectUploadError = (state: RootState) => state.chat.uploadError;
export const selectMessagesByChatId = () => (state: RootState) => state.chat.messages || [];
export const selectIsAsking = (state: RootState) => state.chat.asking;
export const selectMessagesLoading = (state: RootState) => state.chat.messagesLoading;
  
export const { setChats, setMessages, setChatLoading, setChatError, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
