"use strict";

/* ==================================================
   WILD GUARD CONTACT JS
   Page-specific logic for contact.html
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initContactHeroMotion();
    initContactMapMotion();
    initContactCardsTilt();
    initFormSoftMotion();
});

/* ==================================================
   HERO MOTION
   ================================================== */

function initContactHeroMotion() {
    if (!window.gsap) return;

    const heroCard = document.querySelector(".contact-hero-card");
    const heroPoints = document.querySelectorAll(".contact-hero-points article");

    if (heroCard) {
        window.gsap.fromTo(
            heroCard,
            {
                y: 28,
                opacity: 0,
                scale: 0.98,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.9,
                ease: "power3.out",
                delay: 0.12,
            }
        );

        window.gsap.to(heroCard, {
            y: -8,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1,
        });
    }

    if (heroPoints.length) {
        window.gsap.fromTo(
            heroPoints,
            {
                y: 16,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.65,
                stagger: 0.08,
                ease: "power3.out",
                delay: 0.35,
            }
        );
    }
}

/* ==================================================
   ABSTRACT MAP MOTION
   ================================================== */

function initContactMapMotion() {
    if (!window.gsap) return;

    const map = document.querySelector(".abstract-map");
    const pins = document.querySelectorAll(".map-pin");
    const routes = document.querySelectorAll(".map-route");

    if (!map) return;

    if (window.ScrollTrigger) {
        window.gsap.fromTo(
            map,
            {
                y: 30,
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
                    trigger: map,
                    start: "top 84%",
                },
            }
        );
    }

    pins.forEach((pin, index) => {
        window.gsap.to(pin, {
            y: index % 2 === 0 ? -8 : 8,
            x: index % 2 === 0 ? 4 : -4,
            duration: 2.8 + index * 0.25,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.16,
        });
    });

    routes.forEach((route, index) => {
        window.gsap.fromTo(
            route,
            {
                scaleX: 0,
                opacity: 0,
            },
            {
                scaleX: 1,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.25 + index * 0.18,
                scrollTrigger: window.ScrollTrigger
                    ? {
                        trigger: map,
                        start: "top 82%",
                    }
                    : undefined,
            }
        );
    });
}

/* ==================================================
   CONTACT CARDS TILT
   ================================================== */

function initContactCardsTilt() {
    const cards = document.querySelectorAll(
        ".contact-methods > a, .contact-methods > div, .contact-verify-box, .contact-steps-grid article, .contact-map-card"
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

            card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });
}

/* ==================================================
   FORM SOFT MOTION
   ================================================== */

function initFormSoftMotion() {
    if (!window.gsap || !window.ScrollTrigger) return;

    const form = document.querySelector(".contact-form");
    const fields = document.querySelectorAll(".contact-form .form-field, .contact-form .custom-check");

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