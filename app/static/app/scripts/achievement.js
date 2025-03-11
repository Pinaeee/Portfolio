
  // Initialize particles.js
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#3498db" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#3498db",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
    },
    retina_detect: true,
  });

  // Add animation order to cards
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".animate-fade-in").forEach((card, index) => {
      card.style.setProperty("--animation-order", index);
    });

    // Add typing effect to title
    const title = document.querySelector(".page-title");
    const text = title.textContent;
    title.textContent = "";
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    setTimeout(typeWriter, 500);
  });
