"use strict";

/* ==================================================
   WILD GUARD ABOUT JS
   Page-specific logic for about.html
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initAboutHeroMotion();
    initAboutValuesMotion();
    initAboutCardsTilt();
});

/* ==================================================
   HERO PHOTO COMPOSITION MOTION
   ================================================== */

function initAboutHeroMotion() {
    if (!window.gsap) return;

    const media = document.querySelector(".about-hero-media");
    const largeImage = document.querySelector(".about-img-large");
    const smallImage = document.querySelector(".about-img-small");
    const floatingNote = document.querySelector(".about-floating-note");

    if (media) {
        window.gsap.fromTo(
            media,
            {
                y: 26,
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

    if (largeImage) {
        window.gsap.to(largeImage, {
            y: -8,
            duration: 4.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }

    if (smallImage) {
        window.gsap.to(smallImage, {
            y: 10,
            x: -5,
            duration: 3.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }

    if (floatingNote) {
        window.gsap.to(floatingNote, {
            y: -9,
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }
}

/* ==================================================
   VALUES IMAGE MOTION
   ================================================== */

function initAboutValuesMotion() {
    if (!window.gsap || !window.ScrollTrigger) return;

    const valuesMedia = document.querySelector(".about-values-media");
    const valuesBadge = document.querySelector(".about-values-badge");

    if (valuesMedia) {
        window.gsap.fromTo(
            valuesMedia,
            {
                y: 34,
                opacity: 0,
                scale: 0.98,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: valuesMedia,
                    start: "top 82%",
                },
            }
        );
    }

    if (valuesBadge) {
        window.gsap.to(valuesBadge, {
            y: -8,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }
}

/* ==================================================
   CARD TILT EFFECT
   ================================================== */

function initAboutCardsTilt() {
    const cards = document.querySelectorAll(
        ".about-model-grid article, .about-help-steps article, .about-story-card"
    );

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

            const rotateX = ((y - centerY) / centerY) * -2.2;
            const rotateY = ((x - centerX) / centerX) * 2.2;

            card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });
}