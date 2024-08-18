document.addEventListener("DOMContentLoaded", function () {
    const title = document.querySelector('.center-content h1');
    const originalText = title.textContent;
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let isScrambling = false;

    function randomChar() {
        return chars[Math.floor(Math.random() * chars.length)];
    }

    function scrambleText(duration, step) {
        let iterations = duration / step;
        let iteration = 0;

        function scramble() {
            const factor = (iterations - iteration) / iterations; // Decrease scrambling over time
            const newContent = originalText.split('').map((char, i) => {
                return Math.random() < 0.5 * factor ? randomChar() : char;
            }).join('');
            title.textContent = newContent;
            iteration++;

            if (iteration < iterations) {
                setTimeout(scramble, step);
            } else {
                title.textContent = originalText; // Reset to original text
                isScrambling = false;
            }
        }
        scramble();
    }

    // Scramble on hover
    title.addEventListener('mouseenter', () => {
        if (!isScrambling) {
            isScrambling = true;
            scrambleText(4000, 50); // Longer and smoother transition
        }
    });

    // Reset on mouse leave
    title.addEventListener('mouseleave', () => {
        title.textContent = originalText;
    });
});