module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            boxShadow: {
                soft: '0 20px 60px rgba(15, 23, 42, 0.18)',
            },
            backgroundImage: {
                'hero-radial': 'radial-gradient(circle at top left, rgba(34, 211, 238, 0.2), transparent 32%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.18), transparent 28%)',
            },
        },
    },
    plugins: [],
}