import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["selector"],
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                maven: ["maven pro", ...defaultTheme.fontFamily.sans],
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                nl: {
                    prime: "hsl(200, 76%, 37%)",
                    "prime-light": "hsl(200, 86%, 57%)",
                    50: "hsl(200, 20%, 97%)",
                    100: "hsl(200, 14%, 93%)",
                    150: "hsl(200, 32%, 87%)",
                    200: "hsl(200, 20%, 82%)",
                    250: "hsl(200, 17%, 63%)",
                    300: "hsl(200, 17%, 54%)",
                    350: "hsl(200, 12%, 33%)",
                    400: "hsl(200, 14%, 27%)",
                    450: "hsl(200, 11%, 24%)",
                    500: "hsl(200, 41%, 14%)",
                    550: "hsl(200, 45%, 9%)",
                    600: "hsl(200, 64%, 4%)",
                },
            },
        },
    },
    plugins: [],
};
