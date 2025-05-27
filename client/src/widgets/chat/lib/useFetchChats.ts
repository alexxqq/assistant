import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/shared/redux/hooks";
import { fetchChats } from "@/src/entities/chat";
import { selectChats,selectChatLoading,selectChatError } from "@/src/entities/chat/model/chatSlice";
import { selectCurrentUser } from "@/src/entities/auth/model/authSlice";

export function useFetchChats() {
  const dispatch = useAppDispatch();
  const chats = useAppSelector(selectChats);
  const loading = useAppSelector(selectChatLoading);
  const error = useAppSelector(selectChatError);
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (user && (!chats || chats.length === 0)) {
      dispatch(fetchChats());
    }
  }, [user, dispatch, chats?.length, chats]);

  return { chats, loading, error };
}
