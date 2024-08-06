import type { Config } from "tailwindcss";
import daisyui from "daisyui"

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {}
  },

  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },

  plugins: [
    require("@tailwindcss/typography"),
    daisyui // should be after typography plugin for some reason
  ]
} as Config;
