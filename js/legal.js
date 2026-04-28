"use strict";

/* ==================================================
   WILD GUARD LEGAL JS
   Shared logic for privacy-policy.html, cookie-policy.html,
   terms-of-service.html
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initLegalSidebarHighlight();
    initLegalHeroMotion();
    initLegalDocumentMotion();
});

/* ==================================================
   ACTIVE SIDEBAR LINK ON SCROLL
   ================================================== */

function initLegalSidebarHighlight() {
    const sidebarLinks = document.querySelectorAll(".legal-sidebar a");
    const sections = document.querySelectorAll(".legal-document section[id]");

    if (!sidebarLinks.length || !sections.length) return;

    const clearActiveLinks = () => {
        sidebarLinks.forEach((link) => {
            link.classList.remove("is-active");
            link.removeAttribute("aria-current");
        });
    };

    const setActiveLink = (id) => {
        clearActiveLinks();

        const activeLink = document.querySelector(`.legal-sidebar a[href="#${id}"]`);

        if (activeLink) {
            activeLink.classList.add("is-active");
            activeLink.setAttribute("aria-current", "true");
        }
    };

    const observer = new IntersectionObserver(
        (entries) => {
            const visibleEntries = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visibleEntries.length) {
                setActiveLink(visibleEntries[0].target.id);
            }
        },
        {
            root: null,
            threshold: [0.2, 0.35, 0.5, 0.7],
            rootMargin: "-20% 0px -58% 0px",
        }
    );

    sections.forEach((section) => observer.observe(section));

    sidebarLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const id = link.getAttribute("href")?.replace("#", "");

            if (id) {
                setActiveLink(id);
            }
        });
    });
}

/* ==================================================
   HERO MOTION
   ================================================== */

function initLegalHeroMotion() {
    if (!window.gsap) return;

    const heroCard = document.querySelector(".legal-hero-card");
    const metaItems = document.querySelectorAll(".legal-meta span");

    if (heroCard) {
        window.gsap.fromTo(
            heroCard,
            {
                y: 24,
                opacity: 0,
                scale: 0.985,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.85,
                ease: "power3.out",
                delay: 0.12,
            }
        );
    }

    if (metaItems.length) {
        window.gsap.fromTo(
            metaItems,
            {
                y: 12,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.55,
                stagger: 0.08,
                ease: "power3.out",
                delay: 0.32,
            }
        );
    }
}

/* ==================================================
   DOCUMENT MOTION
   ================================================== */

function initLegalDocumentMotion() {
    if (!window.gsap || !window.ScrollTrigger) return;

    const documentSections = document.querySelectorAll(".legal-document section");
    const sidebar = document.querySelector(".legal-sidebar");

    if (sidebar) {
        window.gsap.fromTo(
            sidebar,
            {
                y: 18,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sidebar,
                    start: "top 86%",
                },
            }
        );
    }

    documentSections.forEach((section, index) => {
        window.gsap.fromTo(
            section,
            {
                y: 18,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                delay: index * 0.025,
                scrollTrigger: {
                    trigger: section,
                    start: "top 88%",
                },
            }
        );
    });
}