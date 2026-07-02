export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0F",
          surface: "#12131A",
          raised: "#181A24",
          border: "#23242E",
        },
        paper: {
          DEFAULT: "#EDEEF2",
          muted: "#8B8FA3",
          dim: "#5A5D6E",
        },
        signal: {
          DEFAULT: "#7B61FF",
          soft: "#9C87FF",
        },
        cyan: {
          signal: "#39D3C3",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
}
