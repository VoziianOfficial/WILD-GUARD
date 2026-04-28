"use strict";

/* ==================================================
   WILD GUARD HOME JS
   Page-specific logic for index.html
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initHeroMotion();
    initServiceCardsTilt();
    initEntryPointMotion();
    initHomeServicesSwiper();
});

/* ==================================================
   WILDLIFE SLIDER
   ================================================== */

function initWildlifeSlider() {
    const slider = document.querySelector("[data-wildlife-slider]");

    if (!slider || !window.Swiper) return;

    new Swiper(slider, {
        slidesPerView: 1.25,
        spaceBetween: 14,
        speed: 700,
        grabCursor: true,
        loop: true,

        autoplay: {
            delay: 2600,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },

        breakpoints: {
            520: {
                slidesPerView: 2.15,
                spaceBetween: 14,
            },
            760: {
                slidesPerView: 3.2,
                spaceBetween: 16,
            },
            1024: {
                slidesPerView: 4.2,
                spaceBetween: 16,
            },
            1240: {
                slidesPerView: 5.2,
                spaceBetween: 16,
            },
        },
    });
}

/* ==================================================
   HERO MOTION
   ================================================== */

function initHeroMotion() {
    if (!window.gsap) return;

    const heroImage = document.querySelector(".hero-image-card");
    const floatingMain = document.querySelector(".hero-floating-card-main");
    const floatingSmall = document.querySelector(".hero-floating-card-small");
    const heroTrustItems = document.querySelectorAll(".hero-trust-row article");

    if (heroImage) {
        window.gsap.fromTo(
            heroImage,
            {
                y: 24,
                scale: 0.98,
                opacity: 0,
            },
            {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                delay: 0.15,
            }
        );
    }

    if (floatingMain) {
        window.gsap.to(floatingMain, {
            y: -10,
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }

    if (floatingSmall) {
        window.gsap.to(floatingSmall, {
            y: 8,
            duration: 3.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }

    if (heroTrustItems.length) {
        window.gsap.fromTo(
            heroTrustItems,
            {
                y: 18,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.08,
                ease: "power3.out",
                delay: 0.45,
            }
        );
    }
}

/* ==================================================
   SERVICE CARDS 3D TILT
   ================================================== */

function initServiceCardsTilt() {
    const cards = document.querySelectorAll(".service-photo-card, .wildlife-card");

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

/* ==================================================
   ENTRY POINTS MOTION
   ================================================== */

function initEntryPointMotion() {
    if (!window.gsap) return;

    const points = document.querySelectorAll(".entry-point");

    if (!points.length) return;

    points.forEach((point, index) => {
        window.gsap.to(point, {
            scale: 1.08,
            duration: 1.6 + index * 0.18,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.12,
        });
    });
}

/* ==================================================
   HOME SERVICES SWIPER ON TABLET / MOBILE
   ================================================== */


let homeServicesSwiper = null;

function initHomeServicesSwiper() {
    const slider = document.querySelector("[data-home-services-slider]");

    if (!slider || typeof Swiper === "undefined") return;

    const breakpoint = window.matchMedia("(max-width: 1120px)");

    const enableSwiper = () => {
        if (homeServicesSwiper) return;

        homeServicesSwiper = new Swiper(slider, {
            loop: true,
            speed: 700,
            grabCursor: true,
            watchOverflow: false,

            autoplay: {
                delay: 2600,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },

            pagination: {
                el: ".home-services-pagination",
                clickable: true,
            },

            navigation: {
                nextEl: ".home-services-next",
                prevEl: ".home-services-prev",
            },

            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 12,
                },
                560: {
                    slidesPerView: 1,
                    spaceBetween: 14,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 14,
                },
                980: {
                    slidesPerView: 2.15,
                    spaceBetween: 16,
                },
            },
        });
    };

    const disableSwiper = () => {
        if (!homeServicesSwiper) return;

        homeServicesSwiper.destroy(true, true);
        homeServicesSwiper = null;
    };

    const checkMode = () => {
        if (breakpoint.matches) {
            enableSwiper();
        } else {
            disableSwiper();
        }
    };

    checkMode();
    breakpoint.addEventListener("change", checkMode);
}