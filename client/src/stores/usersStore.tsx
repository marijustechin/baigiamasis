import { create } from 'zustand';
import type { IUser } from '../types/user';

interface UsersState {
  users: IUser[] | null;
  setUsers: (users: IUser[]) => void;
  deleteUser: (_id: string) => void;
}

export const useUsersStore = create<UsersState>()();
