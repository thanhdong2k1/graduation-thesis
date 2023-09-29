/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            sora: ["Sora", "sans-serif"],
        },
        extend: {
            screens: {
                "media-max-2xl": { max: "1535px" },
                "media-min-2xl": { min: "1536px" },
                // => @media (max-width: 1535px) { ... }

                "media-max-xl": { max: "1279px" },
                "media-min-xl": { min: "1280px" },
                // => @media-max (max-width: 1279px) { ... }

                "media-max-lg": { max: "1023px" },
                "media-min-lg": { min: "1024px" },
                // => @media-max (max-width: 1023px) { ... }

                "media-max-md": { max: "767px" },
                "media-min-md": { min: "768px" },
                // => @media-max (max-width: 767px) { ... }

                "media-max-sm": { max: "639px" },
                "media-min-sm": { min: "640px" },
                // => @media (max-width: 639px) { ... }
            },
            colors: {
                "purple-200": "#DAC7FC",
                "purple-300": "#CAACFF",
                "purple-500": "#6B49CD",
                "purple-700": "#5D0096",
                "purple-900": "#210035",
                "pink-500": "#AD26FF",
                // PrimaryColor: "hsl(207, 90%, 54%)",
                // HoverColor: "hsl(207, 90%, 74%)",
                // paleBlue: "hsl(207, 90%, 84%)",
                // whiteColor: "hsl(185, 100%, 100%)",
                // blackColor: "hsl(0, 0%, 18%)",
                // textColor: "hsl(240, 1%, 48%)",
                // bgColor: "hsl(220, 10%, 94%)",
                // greyText: "rgb(190, 190, 190)",
                // inputColor: "hsl(330, 12%, 97%)",

                PrimaryColor: "#2563eb",
                HoverColor: "#60a5fa",
                paleBlue: "#b1dafb",
                whiteColor: "#ffffff",
                blackColor: "#2e2e2e",
                textColor: "#686868",
                bgColor: "#eeeff1",
                greyText: "#6b7280",
                inputColor: "#f8f6f7",
            },
            fontSize: {
                13: "13px",
                14: "14px",
                16: "16px",
                20: "20px",
                26: "26px",
                24: "24px",
                32: "32px",
                36: "36px",
                48: "48px",
                /* Font ang Typography */
                biggestFontSize: "2.5rem",
                h1FontSize: "1.5em",
                h2FontSize: "1.25rem",
                h3FontSize: "1em",
                normalFontSize: "0.938rem",
                smallFontSize: "0.813rem",
                smallestFontSize: "0.75rem",
            },
        },
    },
    plugins: [],
};
