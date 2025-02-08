import type { Config } from "tailwindcss";
import tailwindscrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    spacing: {
      0: "0px",
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
      5: "25px",
      6: "30px",
      7: "35px",
      8: "40px",
      9: "45px",
    },
    fontFamily: {
      notosans: ["Noto_Sans", "sans-serif"],
    },

    fontSize: {
      sm: "0.9rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.3rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    fontWeight: {
      thin: "100",
      hairline: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      "extra-bold": "800",
      black: "900",
    },

    screens: {
      sm: "375px",
      md: "600px",
      lg: "768px",
      xl: "1024px",
      "2xl": "1280px",
      "3xl": "1400px",
    },
    container: {
      center: true,
    },

    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      1: "1px",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },

    extend: {
      colors: {
        primary: {
          100: "#434657", // Lighter (10% of the original)
          500: "#2b2d42", // Base color
          900: "#1a1b28", // Darker (90% of the original)
        },
        secondary: {
          100: "#a3a9b7",
          500: "#8d99ae",
          900: "#6a7384",
        },
        danger: {
          100: "#f78a94",
          200: "#E46370FF",
          500: "#ef233c",
          900: "#a11829",
        },
        winter: {
          100: "#f5f7f9",
          500: "#edf2f4",
          900: "#c2c8cb",
        },
        warrning: {
          100: "#f6dfa5",
          500: "#E8BD00",
          900: "#a78400",
        },
        success: {
          100: "#5cd484",
          200: "#56A36AFF",
          500: "#12A336",
          900: "#0a7025",
        },

        turquoise: {
          100: "#79abb0",
          500: "#398289",
          900: "#285e62",
        },
        skyblue: {
          100: "#A0D9EF",
          200: "#61AFCEFF",
          500: "#20A7DB",
          900: "#1C96C5",
        },
      },
    },
  },
  plugins: [tailwindscrollbar],
} satisfies Config;
