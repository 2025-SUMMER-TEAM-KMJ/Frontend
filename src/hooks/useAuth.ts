import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const { isLoggedIn, user, login, logout } = useAuthStore();
  return { isLoggedIn, user, login, logout };
};
