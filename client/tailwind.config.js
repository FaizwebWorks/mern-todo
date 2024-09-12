/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pencilBody1: {
          "0%, 100%": {
            "stroke-dashoffset": "351.86",
            transform: "rotate(-90deg)",
          },
          "50%": { "stroke-dashoffset": "150.8", transform: "rotate(-225deg)" },
        },
        pencilBody2: {
          "0%, 100%": {
            "stroke-dashoffset": "406.84",
            transform: "rotate(-90deg)",
          },
          "50%": {
            "stroke-dashoffset": "174.36",
            transform: "rotate(-225deg)",
          },
        },
        pencilBody3: {
          "0%, 100%": {
            "stroke-dashoffset": "296.88",
            transform: "rotate(-90deg)",
          },
          "50%": {
            "stroke-dashoffset": "127.23",
            transform: "rotate(-225deg)",
          },
        },
        pencilEraser: {
          "0%, 100%": { transform: "rotate(-45deg) translate(49px,0)" },
          "50%": { transform: "rotate(0deg) translate(49px,0)" },
        },
        pencilEraserSkew: {
          "0%, 32.5%, 67.5%, 100%": { transform: "skewX(0)" },
          "35%, 65%": { transform: "skewX(-4deg)" },
          "37.5%, 62.5%": { transform: "skewX(8deg)" },
          "40%, 45%, 50%, 55%, 60%": { transform: "skewX(-15deg)" },
          "42.5%, 47.5%, 52.5%, 57.5%": { transform: "skewX(15deg)" },
        },
        pencilPoint: {
          "0%, 100%": { transform: "rotate(-90deg) translate(49px,-30px)" },
          "50%": { transform: "rotate(-225deg) translate(49px,-30px)" },
        },
        pencilRotate: {
          "0%": { transform: "translate(100px,100px) rotate(0)" },
          "100%": { transform: "translate(100px,100px) rotate(720deg)" },
        },
        pencilStroke: {
          "0%": {
            "stroke-dashoffset": "439.82",
            transform: "translate(100px,100px) rotate(-113deg)",
          },
          "50%": {
            "stroke-dashoffset": "164.93",
            transform: "translate(100px,100px) rotate(-113deg)",
          },
          "75%, 100%": {
            "stroke-dashoffset": "439.82",
            transform: "translate(100px,100px) rotate(112deg)",
          },
        },
      },
      animation: {
        pencilBody1: "pencilBody1 3s linear infinite",
        pencilBody2: "pencilBody2 3s linear infinite",
        pencilBody3: "pencilBody3 3s linear infinite",
        pencilEraser: "pencilEraser 3s linear infinite",
        pencilEraserSkew: "pencilEraserSkew 3s ease-in-out infinite",
        pencilPoint: "pencilPoint 3s linear infinite",
        pencilRotate: "pencilRotate 3s linear infinite",
        pencilStroke: "pencilStroke 3s linear infinite",
      },
    },
  },
  plugins: [],
};
