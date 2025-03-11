
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
            if (
              document.visibilityState === "visible" &&
              window.AudioState.isPlaying
            ) {
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
          this.audioIcon.className = isPlaying
            ? "fas fa-volume-up"
            : "fas fa-volume-mute";
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
      };

      // Initialize immediately
      document.addEventListener("DOMContentLoaded", () => {
        AudioController.init();
        // Add active class to current nav item
        const currentLocation = location.pathname;
        const navLinks = document.querySelectorAll(".navbar-nav a");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === currentLocation) {
            link.parentElement.classList.add("active");
          }
        });

        // Animate elements on scroll
        const animateOnScroll = () => {
          const elements = document.querySelectorAll(".animate-fade-in");
          elements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight * 0.75) {
              element.style.opacity = "1";
              element.style.transform = "translateY(0)";
            }
          });
        };

        window.addEventListener("scroll", animateOnScroll);
        animateOnScroll(); // Initial check

        // Navigation scroll effect
        window.addEventListener("scroll", function () {
          const navbar = document.querySelector(".navbar");
          if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
          } else {
            navbar.classList.remove("scrolled");
          }
        });

        // Mobile menu toggle
        const navbarToggle = document.querySelector(".navbar-toggle");
        const navbarNav = document.querySelector(".navbar-nav");

        navbarToggle.addEventListener("click", function () {
          navbarNav.classList.toggle("in");
          this.classList.toggle("active");
        });

        // Close mobile menu when clicking outside
        document.addEventListener("click", function (event) {
          const isNavbarToggle = event.target.closest(".navbar-toggle");
          const isNavbarNav = event.target.closest(".navbar-nav");

          if (
            !isNavbarToggle &&
            !isNavbarNav &&
            navbarNav.classList.contains("in")
          ) {
            navbarNav.classList.remove("in");
            navbarToggle.classList.remove("active");
          }
        });

        // Add audio control functionality
        const audio = document.getElementById("bgMusic");
        const audioIcon = document.getElementById("audioIcon");

        // Get stored music state and current time
        const musicState = sessionStorage.getItem("musicState");
        const musicTime = sessionStorage.getItem("musicTime");

        if (musicState === "playing") {
          // Resume music from last position
          audio.currentTime = parseFloat(musicTime || 0);
          audio
            .play()
            .then(() => {
              audioIcon.className = "fas fa-volume-up";
            })
            .catch((error) => {
              console.log("Audio play error:", error);
              audioIcon.className = "fas fa-volume-mute";
            });
        } else {
          audioIcon.className = "fas fa-volume-mute";
        }

        // Store current time periodically
        setInterval(() => {
          if (!audio.paused) {
            sessionStorage.setItem("musicTime", audio.currentTime);
          }
        }, 1000);

        // Rest of the DOMContentLoaded event handlers
        // ...existing code...
      });

      // Update toggle function
      function toggleMusic() {
        AudioController.toggleAudio();
      }

      // Save state before unload
      window.addEventListener("beforeunload", () => {
        AudioController.saveState();
      });