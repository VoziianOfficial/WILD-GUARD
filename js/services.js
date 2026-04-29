"use strict";



document.addEventListener("DOMContentLoaded", () => {
    initServicesHeroMotion();
    initDirectoryCardTilt();
    initProviderFitMotion();
});



function initServicesHeroMotion() {
    if (!window.gsap) return;

    const heroArt = document.querySelector(".services-hero-art");
    const mainCard = document.querySelector(".services-orbit-main");
    const badgeTop = document.querySelector(".badge-top");
    const badgeBottom = document.querySelector(".badge-bottom");

    if (heroArt) {
        window.gsap.fromTo(
            heroArt,
            {
                y: 28,
                opacity: 0,
                scale: 0.98,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.95,
                ease: "power3.out",
                delay: 0.12,
            }
        );
    }

    if (mainCard) {
        window.gsap.to(mainCard, {
            y: -8,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }

    if (badgeTop) {
        window.gsap.to(badgeTop, {
            y: 9,
            x: -4,
            duration: 3.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }

    if (badgeBottom) {
        window.gsap.to(badgeBottom, {
            y: -10,
            x: 5,
            duration: 3.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }
}



function initDirectoryCardTilt() {
    const cards = document.querySelectorAll(".directory-card");

    if (!cards.length) return;

    const canHover = window.matchMedia("(hover: hover)").matches;

    if (!canHover) return;

    cards.forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `translateY(-7px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });
}



function initProviderFitMotion() {
    if (!window.gsap || !window.ScrollTrigger) return;

    const cards = document.querySelectorAll(".provider-fit-grid article");

    if (!cards.length) return;

    cards.forEach((card, index) => {
        window.gsap.fromTo(
            card,
            {
                y: 24,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.65,
                ease: "power3.out",
                delay: index * 0.05,
                scrollTrigger: {
                    trigger: card,
                    start: "top 86%",
                },
            }
        );
    });
}

document.addEventListener("DOMContentLoaded", () => {
    let servicesDirectorySwiper = null;

    const initServicesDirectorySwiper = () => {
        const slider = document.querySelector(".services-directory-grid");

        if (!slider || typeof Swiper === "undefined") return;

        const cards = slider.querySelectorAll(".directory-card");

        if (window.innerWidth <= 1120) {
            if (servicesDirectorySwiper) return;

            slider.classList.add("swiper");

            let wrapper = slider.querySelector(".swiper-wrapper");

            if (!wrapper) {
                wrapper = document.createElement("div");
                wrapper.className = "swiper-wrapper";

                cards.forEach((card) => {
                    card.classList.add("swiper-slide");
                    wrapper.appendChild(card);
                });

                slider.appendChild(wrapper);
            }

            servicesDirectorySwiper = new Swiper(slider, {
                loop: true,
                speed: 700,
                spaceBetween: 12,
                grabCursor: true,
                autoplay: {
                    delay: 2600,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                slidesPerView: 1,
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 12,
                    },
                },
            });
        } else {
            if (!servicesDirectorySwiper) return;

            servicesDirectorySwiper.destroy(true, true);
            servicesDirectorySwiper = null;

            slider.classList.remove("swiper");

            const wrapper = slider.querySelector(".swiper-wrapper");
            const slides = slider.querySelectorAll(".directory-card");

            if (wrapper) {
                slides.forEach((slide) => {
                    slide.classList.remove("swiper-slide");
                    slider.appendChild(slide);
                });

                wrapper.remove();
            }
        }
    };

    initServicesDirectorySwiper();

    window.addEventListener("resize", initServicesDirectorySwiper);
});