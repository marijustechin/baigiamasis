import { create } from 'zustand';
import type { IUser } from '../types/user';
import UserService from '../services/user.service';
import HelperService from '../services/helper.service';

interface UserPagination {
  users: IUser[];
  total: number;
  page: number;
  totalPages: number;
}

interface QueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: string;
}

interface UserState extends UserPagination {
  loading: boolean;
  error: string | null;
  fetchUsers: (query?: Partial<QueryOptions>) => Promise<void>;
  clearUsers: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  total: 0,
  page: 1,
  totalPages: 0,
  loading: false,
  error: null,

  fetchUsers: async (query = {}) => {
    set({ loading: true, error: null });

    try {
      const data = await UserService.getAllUsers(query);

      set({
        users: data.users,
        total: data.total,
        page: data.page,
        totalPages: data.totalPages,
        loading: false,
      });
    } catch (err: unknown) {
      set({
        error: HelperService.errorToString(err),
        loading: false,
      });
    }
  },

  clearUsers: () =>
    set({ users: [], total: 0, page: 1, totalPages: 0, error: null }),
}));
