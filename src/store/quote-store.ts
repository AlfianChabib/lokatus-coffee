import { create } from "zustand";

type SVGColor = {
  start: string;
  end: string;
  offset: string;
  stopColor: string;
};

type QuoteColor = {
  content: string;
  background: string;
  svg: SVGColor[];
  gradientType: "linear" | "radial";
};

const initialState: QuoteColor = {
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  background: "#333333",
  svg: [
    { start: "0%", end: "100%", offset: "0%", stopColor: "#006466" },
    { start: "100%", end: "0%", offset: "100%", stopColor: "#4d194d" },
  ],
  gradientType: "linear",
};

type QuoteActions = {
  setContent: (content: string) => void;
  setBackground: (background: string) => void;
  setSVG: (svg: SVGColor[]) => void;
  setGradientType: (type: "linear" | "radial") => void;
};

export type QuoteStore = QuoteColor & QuoteActions;

export const useQuoteStore = create<QuoteStore>()((set) => ({
  ...initialState,
  setContent: (content: string) => set({ content }),
  setBackground: (background: string) => set({ background }),
  setSVG: (svg: SVGColor[]) => set({ svg }),
  setGradientType: (type: "linear" | "radial") => set({ gradientType: type }),
}));
