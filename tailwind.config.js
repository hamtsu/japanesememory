/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx",
    "./src/*.tsx",
  ],
  theme: {
    extend: {
      "colors": {
        "main": {
          "50": "#f9f7ff",
          "100": "#f2effe",
          "200": "#e5defd",
          "300": "#d8cefc",
          "400": "#cbbdfb",
          "500": "#beadfa",
          "600": "#988ac8",
          "700": "#726896",
          "800": "#4c4564",
          "900": "#262332"
        },
        "neutral": {
          "850": "rgb(29, 29, 29)"
        },
        "slate": {
          "150": "rgb(232, 239, 244)"
        }
      },
      "backgroundImage": {
        "lines-dark": 'repeating-linear-gradient(45deg, rgb(229, 231, 235, var(--tw-bg-opacity)) 0px 8px, transparent 0px 16px)',
        "lines-light": 'repeating-linear-gradient(45deg, rgb(60, 60, 60, var(--tw-bg-opacity)) 0px 8px, transparent 0px 16px)',
      },
      "animation": {
        "fade-in": "fade-in 0.5s ease-in-out",
        "fade-in-late": "fade-in 1s ease-in-out",
        "error": "error 0.5s ease-in-out"
      },
      // Keyframes for animation
      "keyframes":{
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "error": {
          "0%": { transform: "translateX(5px)", backgroundColor: "rgb(255, 71, 77)", color: "white" },
          "100%": { transform: "translateX(0)" }
        }
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

