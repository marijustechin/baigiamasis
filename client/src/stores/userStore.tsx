import { create } from 'zustand';
import type { IUser } from '../types/user';
import UserService from '../services/user.service';
import HelperService from '../services/helper.service';

interface UserState {
  users: IUser[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });

    try {
      const users = await UserService.getAllUsers();
      set({ users, loading: false });
    } catch (error: unknown) {
      set({
        error: HelperService.errorToString(error),
        loading: false,
      });
    }
  },
}));
