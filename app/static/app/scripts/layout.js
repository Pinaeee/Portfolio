// Global audio state management
if (!window.AudioState) {
  window.AudioState = {
    isPlaying: localStorage.getItem("audioPlaying") === "true",
    currentTime: parseFloat(localStorage.getItem("audioTime") || 0),
    volume: 1,
  };
}

// Simplified and optimized audio controller
const AudioController = {
  init() {
    this.audio = document.getElementById("bgMusic");
    this.audioIcon = document.getElementById("audioIcon");
    this.audio.currentTime = window.AudioState.currentTime || 0;

    // Set initial state
    if (window.AudioState.isPlaying) {
      this.playAudioImmediate();
    } else {
      this.updateIcon(false);
    }

    // Save audio state every second
    setInterval(() => {
      if (!this.audio.paused) {
        localStorage.setItem("audioTime", this.audio.currentTime);
      }
    }, 1000);

    // Handle page visibility
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && window.AudioState.isPlaying) {
        this.playAudioImmediate();
      }
    });

    // Handle page unload
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("audioPlaying", !this.audio.paused);
      localStorage.setItem("audioTime", this.audio.currentTime);
    });
  },

  playAudioImmediate() {
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          window.AudioState.isPlaying = true;
          localStorage.setItem("audioPlaying", "true");
          this.updateIcon(true);
        })
        .catch((error) => {
          console.log("Playback prevented:", error);
          window.AudioState.isPlaying = false;
          localStorage.setItem("audioPlaying", "false");
          this.updateIcon(false);
        });
    }
  },

  updateIcon(isPlaying) {
    this.audioIcon.className = isPlaying ? "fas fa-volume-up" : "fas fa-volume-mute";
  },

  toggleAudio() {
    if (this.audio.paused) {
      this.playAudioImmediate();
    } else {
      this.audio.pause();
      window.AudioState.isPlaying = false;
      localStorage.setItem("audioPlaying", "false");
      this.updateIcon(false);
    }
    localStorage.setItem("audioTime", this.audio.currentTime);
  },
  
  saveState() {
    localStorage.setItem("audioPlaying", !this.audio.paused);
    localStorage.setItem("audioTime", this.audio.currentTime);
  }
};

// Initialize navigation functionality
function initNavigation() {
  // Dropdown functionality
  const navDropdown = document.querySelector('.nav-dropdown');
  const dropdownButton = document.querySelector('.dropdown-button');
  const dropdownLinks = document.querySelectorAll('.dropdown-link');
  
  if (dropdownButton) {
    dropdownButton.addEventListener('click', function(e) {
      e.stopPropagation();
      navDropdown.classList.toggle('active');
    });
  }

  // Close dropdown when a link is clicked
  dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
      navDropdown.classList.remove('active');
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (navDropdown && !navDropdown.contains(e.target)) {
      navDropdown.classList.remove('active');
    }
  });
  
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      
      // Change icon based on state
      const icon = this.querySelector('i');
      if (mobileNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Navigation scroll effect
  window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Initialize immediately
document.addEventListener("DOMContentLoaded", () => {
  AudioController.init();
  initNavigation();
  
  // Add animation to elements with animate classes
  const animateElements = document.querySelectorAll('.animate-fade-in, .animate-scale-in');
  animateElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight * 0.8) {
        element.classList.add('animated');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Initial check
});

// Update toggle function
function toggleMusic() {
  AudioController.toggleAudio();
}

// Save state before unload
window.addEventListener("beforeunload", () => {
  AudioController.saveState();
});