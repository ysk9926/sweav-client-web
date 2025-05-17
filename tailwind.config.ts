import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-6px)" },
          "40%": { transform: "translateX(6px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        shake: "shake 0.4s ease-in-out",
      },
      fontSize: {
        // heading
        "heading-xl": "32px",
        "heading-l": "28px",
        "heading-m": "24px",
        "heading-s": "20px",
        "heading-xs": "16px",

        // body
        "body-l": "18px",
        "body-m": "16px",
        "body-s": "14px",

        // button
        "button-l": "18px",
        "button-m": "16px",
        "button-s": "14px",

        // label
        "label-l": "14px",
        "label-s": "12px",

        // brand
        "brand-xl": "48px",
        "brand-l": "36px",
        "brand-m": "24px",
        "brand-s": "20px",
        "brand-xs": "16px",
      },
      padding: {
        "body-s": "1.16667rem",
      },

      colors: {
        // Surface / Fill / Brand
        "fill-brand-default": "#E9F5F4",
        "fill-brand-secondary": "#2A9D8F",
        "fill-brand-tertiary": "#aad8d2",
        "fill-brand-transparent": "#2A9D8F · 60%",

        // Surface / Fill / Neutral
        "fill-neutral-white": "#ffffff",
        "fill-neutral-default": "#faf8f4",
        "fill-neutral-secondary": "#FAF8F4",
        "fill-neutral-dimmed": "#000000 · 20%",

        // Surface / Fill / Disabled
        "fill-disabled": "#969592",

        // Surface / Text / Brand
        "text-brand-default": "#2A9D8F",
        "text-brand-secondary": "#7ec4bc",

        // Surface / Text / Neutral
        "text-neutral-white": "#ffffff",
        "text-neutral-tertiary": "#bbbab7",
        "text-neutral-secondary": "#70706e",
        "text-neutral-default": "#252525",
        "text-neutral-black": "#000000",

        // Surface / Text / Disabled
        "text-disabled-default": "#f0eeea",

        // Surface / Line / Brand
        "line-brand-default": "#2a9d8f",
        "line-brand-secondary": "#7ec4bc",

        // Surface / Line / Neutral
        "line-neutral-default": "#bbbab7",
        "line-neutral-secondary": "#f0eeea",

        // Surface / Line / Disabled
        "line-disabled-default": "#dcdad7",

        // Surface / Line / Alert
        "line-alert-default": "#f27e63",

        // Icon / Fill / Brand
        "icon-fill-brand-default": "#289d90",
        "icon-fill-brand-secondary": "#7ec4bc",

        // Icon / Fill / Neutral
        "icon-fill-neutral-white": "#ffffff",
        "icon-fill-neutral-secondary": "#bbbab7",
        "icon-fill-neutral-default": "#70706e",
        "icon-fill-neutral-black": "#252525",

        // Icon / Fill / Disabled
        "icon-fill-disabled-default": "#f0eeea",

        // Button / Fill / Brand
        "button-fill-brand-default": "#289d90",
        "button-fill-brand-default-pressed": "#207e73",
        "button-fill-brand-secondary": "#D4EBE9",
        "button-fill-brand-secondary-pressed": "#aad8d2",

        // Button / Fill / Neutral
        "button-fill-neutral-white": "#ffffff",
        "button-fill-neutral-default": "#f0eeea",
        "button-fill-neutral-default-pressed": "#dcdad7",
        "button-fill-neutral-secondary": "#faf8f4",
        "button-fill-neutral-secondary-pressed": "#f0eeea",

        // Button / Fill / Disabled
        "button-fill-disabled-default": "#bbbab7",
        "button-fill-disabled-primary": "#AAD8D2",

        // Button / Text / Brand
        "button-text-brand-default": "#289d90",
        "button-text-brand-secondary": "#7ec4bc",

        // Button / Text / Neutral
        "button-text-neutral-default": "#252525",
        "button-text-neutral-secondary": "#70706E",
        "button-text-neutral-tertiary": "#bbbab7",
        "button-text-neutral-white": "#ffffff",
        "button-text-neutral-black": "#000000",

        // Button / Text / Disabled
        "button-text-disabled-default": "#f0eeea",

        // Button / Line / Brand
        "button-line-brand-default": "#2A9D8F",
        "button-line-brand-secondary": "#7ec4bc",

        // Button / Line / Neutral
        "button-line-neutral-default": "#bbbab7",
        "button-line-neutral-secondary": "#f0eeea",

        // Button / Line / Disabled
        "button-line-disabled-default": "#dcdad7",

        // Text / Etc
        "text-etc-coral": "#F17E61",
      },
    },
  },
  plugins: [heroui(), require("tailwind-scrollbar-hide")],
};
export default config;
