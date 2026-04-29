"use strict";

/* ==================================================
   WILD GUARD SERVICE PAGE JS
   Shared page-specific logic for all service detail pages
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initServiceHeroMotion();
    initServiceMediaMotion();
    initServiceCardsTilt();
    initRelatedServicesTilt();
    initServiceFormMotion();
});

/* ==================================================
   SERVICE HERO MOTION
   ================================================== */

function initServiceHeroMotion() {
    if (!window.gsap) return;

    const heroMedia = document.querySelector(".service-hero-media");
    const heroImage = document.querySelector(".service-hero-image");
    const badgeOne = document.querySelector(".badge-one");
    const badgeTwo = document.querySelector(".badge-two");

    if (heroMedia) {
        window.gsap.fromTo(
            heroMedia,
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

    if (heroImage) {
        window.gsap.to(heroImage, {
            y: -8,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.9,
        });
    }

    if (badgeOne) {
        window.gsap.to(badgeOne, {
            y: 9,
            x: -4,
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }

    if (badgeTwo) {
        window.gsap.to(badgeTwo, {
            y: -9,
            x: 5,
            duration: 3.7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }
}

/* ==================================================
   SERVICE MEDIA MOTION
   ================================================== */

function initServiceMediaMotion() {
    if (!window.gsap || !window.ScrollTrigger) return;

    const factorsMedia = document.querySelector(".service-factors-media");
    const factorsBadge = document.querySelector(".factors-media-badge");
    const overviewCard = document.querySelector(".service-overview-card");

    if (overviewCard) {
        window.gsap.fromTo(
            overviewCard,
            {
                y: 26,
                opacity: 0,
                scale: 0.985,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: overviewCard,
                    start: "top 84%",
                },
            }
        );
    }

    if (factorsMedia) {
        window.gsap.fromTo(
            factorsMedia,
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
                    trigger: factorsMedia,
                    start: "top 84%",
                },
            }
        );
    }

    if (factorsBadge) {
        window.gsap.to(factorsBadge, {
            y: -8,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }
}

/* ==================================================
   SERVICE CARDS TILT
   ================================================== */

function initServiceCardsTilt() {
    const cards = document.querySelectorAll(
        ".service-question-grid article, .overview-note-list article, .factor-list article, .service-match-points article"
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

            const rotateX = ((y - centerY) / centerY) * -1.8;
            const rotateY = ((x - centerX) / centerX) * 1.8;

            card.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });
}


/* ==================================================
   RELATED SERVICES — SAFE ANIMATED HOVER
   ================================================== */

function initRelatedServicesTilt() {
    const cards = document.querySelectorAll(".related-services [data-related-card]");

    if (!cards.length) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    cards.forEach((card) => {
        if (!canHover) return;

        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            card.style.setProperty("--mx", `${x}px`);
            card.style.setProperty("--my", `${y}px`);
        });

        card.addEventListener("pointerleave", () => {
            card.style.setProperty("--mx", "50%");
            card.style.setProperty("--my", "50%");
        });
    });
}

/* ==================================================
   SERVICE FORM MOTION
   ================================================== */

function initServiceFormMotion() {
    if (!window.gsap || !window.ScrollTrigger) return;

    const form = document.querySelector(".service-form");
    const fields = document.querySelectorAll(
        ".service-form .form-field, .service-form .custom-check"
    );

    if (form) {
        window.gsap.fromTo(
            form,
            {
                y: 28,
                opacity: 0,
                scale: 0.985,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: form,
                    start: "top 84%",
                },
            }
        );
    }

    if (fields.length) {
        window.gsap.fromTo(
            fields,
            {
                y: 12,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.045,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: form || fields[0],
                    start: "top 84%",
                },
            }
        );
    }
}