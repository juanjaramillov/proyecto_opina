/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Assuming dark mode might be used based on 'dark:' classes seen
    theme: {
        extend: {
            colors: {
                // Base colors - LIGHT MODE (Premium White Theme)
                bg: '#FFFFFF',
                bg2: '#F8FAFC', // Slate 50
                ink: '#0F172A', // Slate 900
                muted: '#64748B', // Slate 500
                muted2: '#94A3B8', // Slate 400
                stroke: '#E2E8F0', // Slate 200

                // Brand & Functional (Deep Indigo Premium)
                primary: '#4F46E5', // Indigo 600
                accent: '#4338CA', // Indigo 700
                warn: '#D97706', // Amber 600
                danger: '#DC2626', // Red 600
                ok: '#059669', // Emerald 600

                // Surfaces
                surface: '#FFFFFF',
                surface2: '#F1F5F9', // Slate 100
                'surface-dark': '#E2E8F0', // Slate 200
            },
            boxShadow: {
                'home': '0 20px 40px -12px rgba(79, 70, 229, 0.15)', // Indigo shadow
                'home-2': '0 12px 24px -8px rgba(0, 0, 0, 0.08)',
                'premium': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            },
            borderRadius: {
                'r': '16px',
                'r2': '24px',
                'pill': '9999px',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            maxWidth: {
                'ws': '1200px', // Slightly wider for modern feel
            }
        },
    },
    plugins: [],
}
