document.addEventListener("DOMContentLoaded", () => {
    // Loader functionality
    const moreLink = document.getElementById("learn-more-link");
    const loader = document.getElementById("loader");

    if (moreLink) {
        console.log("✅ Button found! Adding click event...");
        moreLink.addEventListener("click", (event) => {
            event.preventDefault(); // Stop full-page reload

            // Show the loader
            loader.classList.remove("hidden");
            console.log("🔄 Showing loader...");

            // Wait for 3 seconds before loading portfolio.html
            setTimeout(() => {
                console.log("🔄 Loading portfolio.html...");

                fetch("portfolio.html")
                    .then(response => response.text())
                    .then(html => {
                        console.log("✅ Portfolio page loaded successfully.");

                        // Replace entire document to load full HTML
                        document.open();
                        document.write(html);
                        document.close();

                        // Update URL without reloading
                        history.pushState(null, "", "portfolio.html");
                    })
                    .catch(error => {
                        console.error("❌ Error loading portfolio:", error);

                        // Hide the loader if there's an error
                        loader.classList.add("hidden");
                    });
            }, 2000); // 2-second delay
        });
    } else {
        console.warn("❌ Button NOT found!");
    }

    // Mobile menu functionality
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuClose = document.getElementById("menu-close");

    if (menuToggle && mobileMenu && menuClose) {
        // Toggle the mobile menu when the button is clicked
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.remove("-translate-x-full");
            mobileMenu.classList.add("translate-x-0");
        });

        // Close the mobile menu when the close button is clicked
        menuClose.addEventListener("click", () => {
            mobileMenu.classList.remove("translate-x-0");
            mobileMenu.classList.add("-translate-x-full");
        });
    }

    // Parallax effect
    const freelanceSection = document.getElementById("freelance-section");
    if (freelanceSection) {
        window.addEventListener("scroll", function () {
            const scrollY = window.scrollY;
            freelanceSection.style.backgroundPositionY = `${scrollY * 0.3}px`; // Moves slower than scroll
        });
    }

    // Staggered text animation
    const textElements = document.querySelectorAll(".staggered-text");
    if (textElements.length > 0) {
        const textObserver = new IntersectionObserver(
            entries => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add("animate-fadeIn");
                        }, index * 600); // Increased delay from 300ms to 600ms
                    } else {
                        // Reset when out of view
                        entry.target.classList.remove("animate-fadeIn");
                    }
                });
            },
            {
                threshold: 0.5, // Trigger when 50% of the element is visible
                rootMargin: "0px 0px -100px 0px", // Adjust this to control when the animation triggers
            }
        );

        textElements.forEach(el => textObserver.observe(el));
    }

    // Card animations
    const cards = document.querySelectorAll(".card");
    if (cards.length > 0) {
        const cardObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("opacity-100", "translate-y-0", "rotate-0");
                    } else {
                        entry.target.classList.remove("opacity-100", "translate-y-0", "rotate-0");
                    }
                });
            },
            { threshold: 0.5 }
        );

        cards.forEach((card) => {
            card.classList.add("opacity-0", "translate-y-8", "rotate-2", "transition-all", "duration-500");
            cardObserver.observe(card);
        });
    }

    // New slide-in animations with custom delays
    const slideElements = document.querySelectorAll(".slide-into-view");
    if (slideElements.length > 0) {
        // Function to animate elements with custom delays
        function animateElements(elements) {
            elements.forEach((element) => {
                // Get the delay from the data-delay attribute (default to 0 if not specified)
                const delay = parseInt(element.getAttribute("data-delay")) || 0;

                setTimeout(() => {
                    element.classList.add("slide-into-view-active");

                    // Add specific active classes for final positions
                    if (element.classList.contains("slide-from-left")) {
                        element.classList.add("slide-from-left-active");
                    } else if (element.classList.contains("slide-from-right")) {
                        element.classList.add("slide-from-right-active");
                    } else if (element.classList.contains("slide-from-top")) {
                        element.classList.add("slide-from-top-active");
                    } else if (element.classList.contains("slide-from-bottom")) {
                        element.classList.add("slide-from-bottom-active");
                    }
                }, delay); // Use the custom delay
            });
        }

        // Animate elements on page load
        animateElements(slideElements);

        // Animate elements when they enter the viewport
        const slideObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const delay = parseInt(element.getAttribute("data-delay")) || 0;

                        setTimeout(() => {
                            element.classList.add("slide-into-view-active");

                            // Add specific active classes for final positions
                            if (element.classList.contains("slide-from-left")) {
                                element.classList.add("slide-from-left-active");
                            } else if (element.classList.contains("slide-from-right")) {
                                element.classList.add("slide-from-right-active");
                            } else if (element.classList.contains("slide-from-top")) {
                                element.classList.add("slide-from-top-active");
                            } else if (element.classList.contains("slide-from-bottom")) {
                                element.classList.add("slide-from-bottom-active");
                            }

                            // Stop observing the element after it animates
                            slideObserver.unobserve(element);
                        }, delay); // Use the custom delay
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% of the element is visible
        );

        // Observe all elements with the class .slide-into-view
        slideElements.forEach((item) => slideObserver.observe(item));
    }
});