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

document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations with staggered delay
  const animateCards = () => {
    const cards = document.querySelectorAll(".achievement-card");
    cards.forEach((card, index) => {
      card.style.setProperty("--animation-order", index);

      // Add intersection observer for each card
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add("animate-fade-in");
              }, 100 * index);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(card);
    });
  };

  // Initialize filter buttons
  const initFilters = () => {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const sections = document.querySelectorAll(".achievement-section");
    const cards = document.querySelectorAll(".achievement-card");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"));

        // Add active class to clicked button
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        if (filter === "all") {
          // Show all sections
          sections.forEach((section) => (section.style.display = "block"));
        } else {
          // Hide all sections first
          sections.forEach((section) => (section.style.display = "none"));

          // Show only the selected section
          document.getElementById(`${filter}s-section`).style.display = "block";
        }

        // Reset animation for visible cards
        cards.forEach((card) => card.classList.remove("animate-fade-in"));

        setTimeout(() => {
          animateCards();
        }, 100);
      });
    });
  };

  // Modal functionality for certificates
  const initModal = () => {
    const modal = document.getElementById("certificateModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const modalDescription = document.getElementById("modalDescription");
    const closeBtn = document.querySelector(".modal-close");

    // Open modal when clicking "View Certificate"
    document.querySelectorAll(".view-certificate").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        const name = this.getAttribute("data-name");
        const image = this.getAttribute("data-image");
        const description = this.getAttribute("data-description");

        modalTitle.textContent = name;
        modalImage.src = image;
        modalDescription.textContent = description;

        modal.classList.add("modal-active");
        document.body.style.overflow = "hidden"; // Prevent scrolling
      });
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("modal-active");
      document.body.style.overflow = "auto"; // Re-enable scrolling
    });

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("modal-active");
        document.body.style.overflow = "auto";
      }
    });

    // Close modal with ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("modal-active")) {
        modal.classList.remove("modal-active");
        document.body.style.overflow = "auto";
      }
    });
  };

  // Enhance particle effect for achievement page
  const enhanceParticles = () => {
    if (window.particlesJS) {
      particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: { enable: true, value_area: 800 },
          },
          color: { value: "#4299e1" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
          },
          opacity: {
            value: 0.3,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#1a365d",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 0.5 } },
            push: { particles_nb: 3 },
          },
        },
        retina_detect: true,
      });
    }
  };

  // Add hover effects to cards
  const addCardEffects = () => {
    const cards = document.querySelectorAll(".achievement-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-8px) scale(1.01)";
        this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.15)";
        this.style.borderColor = "rgba(66, 153, 225, 0.3)";

        const image = this.querySelector(".card-image-wrapper img");
        if (image) {
          image.style.transform = "scale(1.08)";
        }

        const titleLine = this.querySelector("h3::after");
        if (titleLine) {
          titleLine.style.width = "80px";
        }
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "";
        this.style.boxShadow = "";
        this.style.borderColor = "";

        const image = this.querySelector(".card-image-wrapper img");
        if (image) {
          image.style.transform = "";
        }

        const titleLine = this.querySelector("h3::after");
        if (titleLine) {
          titleLine.style.width = "";
        }
      });
    });
  };

  // Initialize everything
  initFilters();
  animateCards();
  initModal();
  enhanceParticles();
  addCardEffects();

  // Update section visibility based on URL hash
  const updateSectionFromHash = () => {
    const hash = window.location.hash.substring(1); // Remove the # character
    if (
      hash === "projects" ||
      hash === "certificates" ||
      hash === "badges"
    ) {
      document.querySelector(
        `.filter-btn[data-filter="${hash.slice(0, -1)}"]`
      ).click();
    }
  };

  // Check hash on page load
  updateSectionFromHash();

  // Listen for hash changes
  window.addEventListener("hashchange", updateSectionFromHash);
});
