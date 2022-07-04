import createStore from 'zustand';

export const useUserStore = createStore((set) => ({
  //
  user: {},
  //
  updateUser: (updatedUser) =>
    set((state) => ({
      user: { ...state.user, ...updatedUser }
    })),
  //
  clearUser: () =>
    set(() => ({
      user: {}
    }))
}));
