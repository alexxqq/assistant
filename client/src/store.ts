import { makeStore } from "@/src/shared/redux/makeStore";

import authReducer from "@/src/entities/auth/model/authSlice";
import chatReducer from "@/src/entities/chat/model/chatSlice";

export const store = makeStore({
  auth: authReducer,
  chat: chatReducer,
});
