import type { Config } from "tailwindcss";

const config: Config = {
  // ВАЖНО: Указываем пути ко всем файлам, где используем классы
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}", // На всякий случай добавим lib
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  // Плагин для красивого отображения Markdown
  plugins: [require("@tailwindcss/typography")],
};
export default config;
