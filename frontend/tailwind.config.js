/** @type {import('tailwindcss').Config} */
import daisyUI from "daisyui";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#9463f4",
          "secondary": "#dddcdc",
          "accent": "#ffff00",
          "neutral": "#7c7c7c",
          "success": "#00ffd2",
          "error": "#ff004f",
            "info": "#00e8ff",
            "warning": "#ffab00",
          "base-100": "#292929",
        },
      },
    ],
  },

  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "cursive"],
      },
    },
  },
  plugins: [daisyUI],
};
