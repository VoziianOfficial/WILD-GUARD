"use strict";

/* ==================================================
   WILD GUARD SERVICES JS
   Page-specific logic for services.html
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initServicesHeroMotion();
    initDirectoryCardTilt();
    initProviderFitMotion();
});

/* ==================================================
   HERO ORBIT MOTION
   ================================================== */

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

/* ==================================================
   DIRECTORY CARDS 3D TILT
   ================================================== */

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

/* ==================================================
   PROVIDER FIT MOTION
   ================================================== */

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