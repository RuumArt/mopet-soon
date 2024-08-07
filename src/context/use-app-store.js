import { create } from 'zustand';

export const useAppStore = create(set => ({
  fontsLoaded: false,
  setFontsLoaded: fontsLoaded => set(s => ({ ...s, fontsLoaded })),
  siteLoad: false,
  setSiteLoad: siteLoad => set(s => ({ ...s, siteLoad })),
}));
