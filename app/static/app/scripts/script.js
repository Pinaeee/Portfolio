document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded successfully');

    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-fade-in');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize animation states
    document.querySelectorAll('.animate-fade-in').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Test skill cards hover effect
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            console.log('Card hover working');
        });
    });

    // Navigation active link
    const links = document.querySelectorAll('.nav a');
    const currentPath = window.location.pathname;
    const currentPage = currentPath === '/' ? 'home' : currentPath.split('/')[1];

    links.forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active-link');
            console.log('Active link set:', currentPage);
        }
    });
});

// Keep the toggleDetails function
function toggleDetails(projectId) {
    const details = document.getElementById(projectId);
    if (details.style.display === 'block') {
        details.style.display = 'none'; // Hide details
    } else {
        // Hide all other project details
        document.querySelectorAll('.project-details').forEach(detail => {
            detail.style.display = 'none';
        });
        details.style.display = 'block'; // Show the selected project details
    }
}