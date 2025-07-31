import { create } from 'zustand';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  showProfileSetupModal: boolean; // New
  login: (user: User) => void;
  logout: () => void;
  openProfileSetupModal: () => void; // New
  closeProfileSetupModal: () => void; // New
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  showProfileSetupModal: false, // New
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
  openProfileSetupModal: () => set({ showProfileSetupModal: true }), // New
  closeProfileSetupModal: () => set({ showProfileSetupModal: false }), // New
}));
