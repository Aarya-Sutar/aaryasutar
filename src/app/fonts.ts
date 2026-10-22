import { Anton, Bricolage_Grotesque, Geist_Mono } from "next/font/google";

export const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

// Text and UI. Variable weight + width: headlines use the narrow (wdth 75),
// extra-bold cut. (The optical-size axis was dropped: it doubled the font file.)
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  variable: "--font-text",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  variable: "--font-geist-mono",
});
