import { create } from "zustand";

const useLikeStore = create((set) => ({
  likes: JSON.parse(localStorage.getItem("likes")) || [],
  loading: true,
  error: "",

  addLike: (newLike) => {
    set((state) => {
      const updatedLikes = [...state.likes, newLike];
      localStorage.setItem("likes", JSON.stringify(updatedLikes));
      return { likes: updatedLikes };
    });
  },

  removeLike: (likeId) => {
    set((state) => {
      const updatedLikes = state.likes.filter((like) => like.id !== likeId);
      localStorage.setItem("likes", JSON.stringify(updatedLikes));
      return { likes: updatedLikes };
    });
  },

  setError: (errorMessage) => set({ error: errorMessage }),

  setLoading: (isLoading) => set({ loading: isLoading }),
}));

export default useLikeStore;
