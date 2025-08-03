import { create } from 'zustand';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  showProfileSetupModal: boolean;
  showBasicInfoModal: boolean; // New: Controls visibility of basic info modal
  editingSection: string | null; // New: Tracks which section is being edited
  login: (user: User) => void;
  logout: () => void;
  openProfileSetupModal: () => void;
  closeProfileSetupModal: () => void;
  openBasicInfoModal: () => void; // New: Opens basic info modal
  closeBasicInfoModal: () => void; // New: Closes basic info modal
  openEditModal: (section: string) => void; // New: Opens a specific section's edit modal
  closeEditModal: () => void; // New: Closes the edit modal
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  showProfileSetupModal: false,
  showBasicInfoModal: false, // Initialize to false
  editingSection: null, // Initialize to null
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
  openProfileSetupModal: () => set({ showProfileSetupModal: true }),
  closeProfileSetupModal: () => set({ showProfileSetupModal: false }),
  openBasicInfoModal: () => set({ showBasicInfoModal: true }), // Action to open basic info modal
  closeBasicInfoModal: () => set({ showBasicInfoModal: false }), // Action to close basic info modal
  openEditModal: (section) => set({ editingSection: section }), // Set the section to be edited
  closeEditModal: () => set({ editingSection: null }), // Clear the editing section
}));
