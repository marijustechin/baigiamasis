import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IUser } from '../types/user';

interface AuthState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', // localstorage pavadinimas
      partialize: (state) => ({ user: state.user }),
    }
  )
);
