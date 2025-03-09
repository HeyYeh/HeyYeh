document.getElementById('hamburgerMenu').addEventListener('click', function() {
    this.classList.toggle('open');
    document.getElementById('menu').classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', function() {
    // Create a map of h3 tags with their content as keys
    const h3Map = {};
    document.querySelectorAll('h3').forEach(h3 => {
        if (h3.textContent.trim().match(/^\d+$/)) {
            h3Map[h3.textContent.trim()] = h3;
            h3.id = h3.textContent.trim(); // Add an id to the h3 tag
        }
    });

    // Find all strong tags and link them to the corresponding h3 tags
    document.querySelectorAll('strong').forEach(strong => {
        const number = strong.textContent.trim();
        if (h3Map[number]) {
            const link = document.createElement('a');
            link.href = `#${number}`;
            link.textContent = number;
            strong.textContent = ''; // Clear the strong tag content
            strong.appendChild(link); // Append the link to the strong tag
        }
    });

    // Adjust scroll position when following links and enable back navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 100;
                history.pushState({ scrollTop: window.scrollY }, '', `#${targetId}`);
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.scrollTop !== undefined) {
            window.scrollTo({
                top: event.state.scrollTop,
                behavior: 'smooth'
            });
        }
    });
});