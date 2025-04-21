'use client';
import { useAppSelector } from '@/src/shared/redux/hooks';
import {
  selectCurrentUser,
  selectAuthLoading,
  selectAuthError,
} from '@/src/entities/auth/model/authSlice';
import { UserCard } from '@/src/features/user/ui/UserCard';

export const UserProfile = () => {
  const user = useAppSelector(selectCurrentUser);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  if (loading) return <div>Loading user info...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found.</div>;

  return <UserCard user={user} />;
};
