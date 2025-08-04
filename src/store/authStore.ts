import { create } from 'zustand';
import { QnA } from '@/types';

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
  showQnAModal: boolean; // New: Controls visibility of QnA modal
  selectedQnA: QnA | null; // New: Stores the selected QnA for the modal
  profileViewMode: string; // New: Stores the profile view mode
  login: (user: User) => void;
  logout: () => void;
  openProfileSetupModal: () => void;
  closeProfileSetupModal: () => void;
  openBasicInfoModal: () => void; // New: Opens basic info modal
  closeBasicInfoModal: () => void; // New: Closes basic info modal
  openEditModal: (section: string) => void; // New: Opens a specific section's edit modal
  closeEditModal: () => void; // New: Closes the edit modal
  openQnAModal: (qna: QnA) => void; // New: Opens QnA modal with selected QnA
  closeQnAModal: () => void; // New: Closes QnA modal
  setProfileViewMode: (mode: string) => void; // New: Sets the profile view mode
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  showProfileSetupModal: false,
  showBasicInfoModal: false, // Initialize to false
  editingSection: null, // Initialize to null
  showQnAModal: false, // Initialize to false
  selectedQnA: null, // Initialize to null
  profileViewMode: 'default', // Initialize to 'default'
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
  openProfileSetupModal: () => set({ showProfileSetupModal: true }),
  closeProfileSetupModal: () => set({ showProfileSetupModal: false }),
  openBasicInfoModal: () => set({ showBasicInfoModal: true }), // Action to open basic info modal
  closeBasicInfoModal: () => set({ showBasicInfoModal: false }), // Action to close basic info modal
  openEditModal: (section) => set({ editingSection: section }), // Set the section to be edited
  closeEditModal: () => set({ editingSection: null }), // Clear the editing section
  openQnAModal: (qna) => set({ showQnAModal: true, selectedQnA: qna }), // Action to open QnA modal
  closeQnAModal: () => set({ showQnAModal: false, selectedQnA: null }), // Action to close QnA modal
  setProfileViewMode: (mode) => set({ profileViewMode: mode }), // Action to set profile view mode
}));
