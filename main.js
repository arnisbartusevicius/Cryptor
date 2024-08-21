document.addEventListener("DOMContentLoaded", function () {
    // Scramble "Crypt" whenever you hover mouse over
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

    // Fix event listener for navigation buttons
    document.querySelectorAll("#navbutton a").forEach(function (navLink) {
        navLink.addEventListener("click", function (event) {
            // Prevent the default action (navigating to the page immediately)
            event.preventDefault();

            // Capture the href attribute
            const targetUrl = event.currentTarget.href;

            // Get all elements with the class 'center-content'
            var elements = document.getElementsByClassName("center-content");

            // Apply the fade-out class to all of them
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.add("fade-out");
            }

            // After the transition ends (1 second), navigate to the new page
            setTimeout(function () {
                window.location.href = targetUrl;
            }, 1000);  // 1000 ms matches the CSS transition duration
        });
    });
});

document.getElementById("encrypt-btn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    document.getElementById("encrypt").scrollIntoView({ behavior: 'smooth' });
});

document.getElementById("decrypt-btn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    document.getElementById("decrypt").scrollIntoView({ behavior: 'smooth' });
});