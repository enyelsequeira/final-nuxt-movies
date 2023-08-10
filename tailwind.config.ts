// tailwind.config.ts
import type { Config } from "tailwindcss";
import { tailwindConfig } from "@storefront-ui/vue/tailwind-config";

export default <Config>{
  presets: [tailwindConfig],
  content: ["./**/*.vue", "./node_modules/@storefront-ui/vue/**/*.{js,mjs}"],
  theme: {
    fontFamily: {
      title: "var(--title)",
      body: "var(--body)",
    },
    extend: {
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
      gridTemplateRows: {
        layout: "100px, repeat(9, minmax(200px, 1fr))",
        test: "450px 1fr",
      },
      gridTemplateColumns: {
        layout: "repeat(12, 1fr)",
        // test: "repeat(auto-fill, minmax(350px, 1fr))",
      },

      colors: {
        light: "#f9f9f9",
        "light-2": "#0e0f0e",
        "light-3": "#b8b8d8",
        "light-accent": "#9f5859",
        "light-extra-one": "#534a39",
        "light-extra-two": "#373c3e",
        "light-background-primary": "#eeeef2",
        "light-background-secondary": "#a8a6a7",

        // dark
        dark: "#080a10",
        "dark-2": "#5b6356",
        "dark-3": "#3c3f1f",
        "dark-accent": "#c63e2a",
        "dark-extra-one": "#7c8c78",
        "dark-extra-two": "#afb3a2",
        "dark-background-primary": "#2a4e5f",
        "dark-background-secondary": "#2a4e5f",
      },
    },
  },
};
