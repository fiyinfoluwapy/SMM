document.addEventListener("DOMContentLoaded", () => {
    // Loader functionality
    const moreLink = document.getElementById("learn-more-link");
    const loader = document.getElementById("loader");

    if (moreLink && loader) {
        moreLink.addEventListener("click", (event) => {
            event.preventDefault();
            loader.classList.remove("hidden");

            setTimeout(() => {
                fetch("portfolio.html")
                    .then(response => response.text())
                    .then(html => {
                        document.open();
                        document.write(html);
                        document.close();
                        history.pushState(null, "", "portfolio.html");
                    })
                    .catch(() => loader.classList.add("hidden"));
            }, 2000);
        });
    }

    // Mobile menu functionality
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuClose = document.getElementById("menu-close");

    if (menuToggle && mobileMenu && menuClose) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.remove("-translate-x-full");
            mobileMenu.classList.add("translate-x-0");
        });

        menuClose.addEventListener("click", () => {
            mobileMenu.classList.remove("translate-x-0");
            mobileMenu.classList.add("-translate-x-full");
        });
    }

    // Parallax effect
    const freelanceSection = document.getElementById("freelance-section");
    if (freelanceSection) {
        window.addEventListener("scroll", () => {
            freelanceSection.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
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
                        }, index * 600);
                    }
                });
            },
            { threshold: 0.5, rootMargin: "0px 0px -100px 0px" }
        );

        textElements.forEach(el => textObserver.observe(el));
    }

    // Slide-in animations
    const slideElements = document.querySelectorAll(".slide-into-view");
    if (slideElements.length > 0) {
        const slideObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("slide-into-view-active");

                        if (entry.target.classList.contains("slide-from-left")) {
                            entry.target.classList.add("slide-from-left-active");
                        } else if (entry.target.classList.contains("slide-from-right")) {
                            entry.target.classList.add("slide-from-right-active");
                        } else if (entry.target.classList.contains("slide-from-top")) {
                            entry.target.classList.add("slide-from-top-active");
                        } else if (entry.target.classList.contains("slide-from-bottom")) {
                            entry.target.classList.add("slide-from-bottom-active");
                        }
                        slideObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        slideElements.forEach(item => slideObserver.observe(item));
    }

    // Toggle Switch Functionality
    const toggleOptions = document.querySelectorAll(".toggle-option");
    const categories = document.querySelectorAll(".category");

    if (toggleOptions.length > 0 && categories.length > 0) {
        toggleOptions.forEach((option, index) => {
            option.addEventListener("click", () => {
                toggleOptions.forEach(opt => {
                    opt.classList.remove("active", "bg-primaryOrange", "text-white");
                    opt.classList.add("bg-transparent", "text-primaryBlack");
                });

                categories.forEach(cat => cat.classList.add("hidden"));

                option.classList.add("active", "bg-primaryOrange", "text-white");
                option.classList.remove("bg-transparent", "text-primaryBlack");

                if (categories[index]) {
                    categories[index].classList.remove("hidden");
                }
            });
        });
    }
});