import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        myGreen: "#0ACF83",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00c4be",
          "primary-content": "#000e0d",
          secondary: "#00f3ff",
          "secondary-content": "#001416",
          accent: "#00d45b",
          "accent-content": "#001003",
          neutral: "#0d1a02",
          "neutral-content": "#c8ccc5",
          "base-100": "#fff8f0",
          "base-200": "#ded8d1",
          "base-300": "#beb8b2",
          "base-content": "#161514",
          info: "#0061ee",
          "info-content": "#d0e2ff",
          success: "#91d300",
          "success-content": "#071000",
          warning: "#c17300",
          "warning-content": "#0e0500",
          error: "#d23859",
          "error-content": "#fcdadc",
        },
      },
    ],
  },
  plugins: [daisyui],
};
