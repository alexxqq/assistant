import { useEffect } from "react";
import { fetchUser } from "@/src/entities/auth/model/authThunks";
import { useAppDispatch,useAppSelector } from "@/src/shared/redux/hooks";
import { selectCurrentUser,selectAuthError,selectAuthLoading } from "@/src/entities/auth/model/authSlice";
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return {
    user,
    loading,
    error,
  };
};
