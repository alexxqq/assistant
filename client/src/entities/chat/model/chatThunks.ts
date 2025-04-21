import * as chatApi from "@/src/entities/chat/api/chatApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async (_, { rejectWithValue }) => {
    try {
      return await chatApi.fetchChats();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const askQuestion = createAsyncThunk(
  "chat/askQuestion",
  async (
    { chatId, question }: { chatId: string; question: string },
    { rejectWithValue }
  ) => {
    try {
      return await chatApi.askQuestion(chatId, question);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (chatId: string, { rejectWithValue }) => {
    try {
      return await chatApi.fetchMessages(chatId);
    } catch (error : any) {
      console.log(error)
      console.log(error.message)
      return rejectWithValue(error.message);
    }
  }
);

export const uploadFile = createAsyncThunk(
  "chat/uploadFile",
  async (file: File, { rejectWithValue }) => {
    try {
      return await chatApi.uploadFile(file);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteChat = createAsyncThunk(
  "chat/deleteChat",
  async (chatId: string, { rejectWithValue }) => {
    try {
      return await chatApi.deleteChat(chatId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateChatTitle = createAsyncThunk(
  "chat/updateChatTitle",
  async (args: { chatId: string; title: string }, { rejectWithValue }) => {
    try {
      return await chatApi.updateChatTitle(args.chatId, args.title);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
