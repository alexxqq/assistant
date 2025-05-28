const HOST: string = 'https://api.detect.uno';

enum ENDPOINTS {
  LOGOUT = '/auth/logout',
  ME = '/auth/me',
  USER = '/auth/user',
  ALL_CHATS = '/chat/all_chats',
  UPLOAD = '/chat/upload/',
}

export const API = {
  logout: `${HOST}${ENDPOINTS.LOGOUT}`,
  me: `${HOST}${ENDPOINTS.ME}`,
  user: `${HOST}${ENDPOINTS.USER}`,
  allChats: `${HOST}${ENDPOINTS.ALL_CHATS}`,
  upload: `${HOST}${ENDPOINTS.UPLOAD}`,

  chatMessages: (chatId: string | number) => `${HOST}/chat/${chatId}/messages`,
  ask: (chatId: string | number) => `${HOST}/chat/${chatId}/ask`,
  deleteChat: (chatId: string | number) => `${HOST}/chat/${chatId}`,
  updateChat: (chatId: string | number) => `${HOST}/chat/${chatId}`,
};
