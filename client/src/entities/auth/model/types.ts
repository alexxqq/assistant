export interface AuthState {
    user: { id: string; email: string; name: string; picture: string } | null;
    loading: boolean;
    error: string | null;
  }
