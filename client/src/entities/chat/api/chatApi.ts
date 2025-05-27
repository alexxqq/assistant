import { API } from "@/src/shared/endpoints";

export const fetchChats = async () => {
  const response = await fetch(API.allChats, {
    credentials: "include",
  });
  if (response.status == 404) {
    return [];
  }

  if (!response.ok) {
    const error = await response.text();
    throw error;
  }

  return await response.json();
};

export const fetchMessages = async (chatId: string) => {
  const response = await fetch(
    API.chatMessages(chatId),
    {
      credentials: "include",
    }
  );
  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw 'Error';
  }

  return await response.json();
};

export const askQuestion = async (chatId: string, question: string) => {
  const response = await fetch(API.ask(chatId), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: question }),
  });

  const res = await response.json()

  if (!response.ok) {
    const error = await response.text();
    throw error;
  }

  return res;
};
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(API.upload, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw error;
  }

  return await response.json();
};
export const deleteChat = async (chatId: string) => {
  const response = await fetch(API.deleteChat(chatId), {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.text();
    throw error;
  }

  return chatId;
};

export const updateChatTitle = async (chatId: string, title: string) => {
  try {
    const response = await fetch(API.updateChat(chatId), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ chat_title: title }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw error;
    }

    return { chatId: chatId, title: title };
  } catch (err) {
    throw err;
  }
};
