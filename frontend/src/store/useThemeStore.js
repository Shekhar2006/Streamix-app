import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("streamix-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("streamix-theme", theme);
    set({ theme });
  },
}));