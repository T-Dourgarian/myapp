import { create } from 'zustand';

export const appState = create(set => ({
  user: "Thomas",
  setUser: user => set({ user }),
}));