"use strict";

/* ==================================================
   WILD GUARD MAIN JS
   Shared behavior for all pages
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const config = window.WILD_GUARD_CONFIG;

    if (!config) {
        console.warn("WILD_GUARD_CONFIG is missing. Check js/config.js path.");
        return;
    }

    applyGlobalConfig(config);
    initCurrentYear();
    initHeaderScroll();
    initMobileMenu();
    initCookieBanner(config);
    initForms(config);
    initFaqIcons();
    initGlowCards();
    initSmoothAnchorScroll();

    /* важно: готовим анимации ДО запуска AOS */
    prepareAnimationElements();
    initLibraries();
});

/* ==================================================
   GLOBAL CONFIG INJECTION
   ================================================== */

function applyGlobalConfig(config) {
    const company = config.company;
    const legal = config.legal;
    const footer = config.footer;
    const cookie = config.cookieConsent;

    setText("[data-company-name]", company.name);
    setText("[data-company-tagline]", company.tagline);
    setText("[data-company-address]", company.address);
    setText("[data-company-id]", company.companyId);
    setText("[data-footer-intro]", footer.intro);
    setText("[data-footer-disclaimer]", legal.disclaimer);

    document.querySelectorAll("[data-phone-link]").forEach((link) => {
        link.setAttribute("href", `tel:${company.phoneHref}`);
        link.setAttribute("aria-label", `Call ${company.name} at ${company.phone}`);
    });

    document.querySelectorAll("[data-phone-text]").forEach((item) => {
        const isFloatingMobileCta = item.closest(".mobile-phone-cta");
        item.textContent = isFloatingMobileCta ? company.phoneButtonText : company.phone;
    });

    document.querySelectorAll("[data-email-link]").forEach((link) => {
        link.setAttribute("href", `mailto:${company.email}`);
        link.setAttribute("aria-label", `Email ${company.name}`);
    });

    setText("[data-email-text]", company.email);

    const cookieBanner = document.querySelector("[data-cookie-banner]");

    if (cookieBanner && cookie) {
        const title = cookieBanner.querySelector(".cookie-content h2");
        const text = cookieBanner.querySelector(".cookie-content p");
        const accept = cookieBanner.querySelector("[data-cookie-accept]");
        const decline = cookieBanner.querySelector("[data-cookie-decline]");

        if (title) title.textContent = cookie.title;
        if (text) text.textContent = cookie.text;
        if (accept) accept.textContent = cookie.acceptText;
        if (decline) decline.textContent = cookie.declineText;
    }

    document.querySelectorAll(".form-submit, .wild-form-submit").forEach((button) => {
        button.innerHTML = `
            ${config.forms.submitButtonText}
            <i data-lucide="arrow-up-right"></i>
        `;
    });
}

function setText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
        element.textContent = value;
    });
}

/* ==================================================
   CURRENT YEAR
   ================================================== */

function initCurrentYear() {
    const year = new Date().getFullYear();

    document.querySelectorAll("[data-current-year]").forEach((element) => {
        element.textContent = year;
    });
}

/* ==================================================
   STICKY HEADER
   ================================================== */

function initHeaderScroll() {
    const header = document.querySelector("[data-header]");

    if (!header) return;

    const updateHeader = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true,
    });
}

/* ==================================================
   MOBILE MENU
   ================================================== */

function initMobileMenu() {
    const body = document.body;
    const menu = document.querySelector("[data-mobile-menu]");
    const toggle = document.querySelector("[data-menu-toggle]");
    const close = document.querySelector("[data-menu-close]");
    const links = document.querySelectorAll("[data-mobile-menu] a");

    if (!menu || !toggle) return;

    const openMenu = () => {
        body.classList.add("menu-open");
        menu.classList.add("is-open");
        menu.setAttribute("aria-hidden", "false");
        toggle.setAttribute("aria-expanded", "true");

        const firstLink = menu.querySelector("a, button");

        if (firstLink) {
            setTimeout(() => firstLink.focus(), 80);
        }
    };

    const closeMenu = () => {
        body.classList.remove("menu-open");
        menu.classList.remove("is-open");
        menu.setAttribute("aria-hidden", "true");
        toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.contains("is-open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (close) {
        close.addEventListener("click", closeMenu);
    }

    links.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    menu.addEventListener("click", (event) => {
        const panel = event.target.closest(".mobile-menu-panel");

        if (!panel) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menu.classList.contains("is-open")) {
            closeMenu();
            toggle.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1120 && menu.classList.contains("is-open")) {
            closeMenu();
        }
    });
}

/* ==================================================
   COOKIE BANNER
   ================================================== */

function initCookieBanner(config) {
    const banner = document.querySelector("[data-cookie-banner]");
    const acceptButton = document.querySelector("[data-cookie-accept]");
    const declineButton = document.querySelector("[data-cookie-decline]");

    if (!banner || !acceptButton || !declineButton) return;

    const storageKey = config.cookieConsent.storageKey;
    const savedChoice = localStorage.getItem(storageKey);

    if (!savedChoice) {
        setTimeout(() => {
            banner.classList.add("is-visible");
        }, 450);
    }

    const saveChoice = (choice) => {
        localStorage.setItem(storageKey, choice);
        banner.classList.remove("is-visible");
    };

    acceptButton.addEventListener("click", () => {
        saveChoice("accepted");
    });

    declineButton.addEventListener("click", () => {
        saveChoice("declined");
    });
}

/* ==================================================
   FORMS
   ================================================== */

function initForms(config) {
    const forms = document.querySelectorAll("[data-contact-form]");

    if (!forms.length) return;

    forms.forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const requiredFields = form.querySelectorAll("[required]");
            let isValid = true;

            requiredFields.forEach((field) => {
                if (!field.checkValidity()) {
                    isValid = false;
                    field.classList.add("is-invalid");
                } else {
                    field.classList.remove("is-invalid");
                }
            });

            if (!isValid) {
                showFormMessage(
                    form,
                    "Please complete the required fields before submitting.",
                    "error"
                );

                const firstInvalid = form.querySelector(".is-invalid");

                if (firstInvalid) {
                    firstInvalid.focus();
                }

                return;
            }

            showFormMessage(form, config.forms.successMessage, "success");
            form.reset();
        });

        form.querySelectorAll("input, select, textarea").forEach((field) => {
            field.addEventListener("input", () => {
                field.classList.remove("is-invalid");
            });

            field.addEventListener("change", () => {
                field.classList.remove("is-invalid");
            });
        });
    });
}

function showFormMessage(form, message, type) {
    let messageElement = form.querySelector("[data-form-message]");

    if (!messageElement) {
        messageElement = document.createElement("div");
        messageElement.setAttribute("data-form-message", "");
        messageElement.className = "form-message";
        form.appendChild(messageElement);
    }

    messageElement.textContent = message;
    messageElement.classList.remove("is-success", "is-error");
    messageElement.classList.add(type === "success" ? "is-success" : "is-error");
}

/* ==================================================
   FAQ ICON STATE
   ================================================== */

function initFaqIcons() {
    const detailsItems = document.querySelectorAll(".faq-list details");

    detailsItems.forEach((details) => {
        details.addEventListener("toggle", () => {
            const icon = details.querySelector("summary i");

            if (!icon) return;

            icon.setAttribute("data-lucide", details.open ? "minus" : "plus");

            if (window.lucide) {
                window.lucide.createIcons();
            }
        });
    });
}

/* ==================================================
   GLOW CARD EFFECT
   ================================================== */

function initGlowCards() {
    const cards = document.querySelectorAll(
        ".glow-card, .service-photo-card, .wildlife-type-card, .hero-trust-mini article, .signal-cards article, .match-proof-row article"
    );

    cards.forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);
        });
    });
}

/* ==================================================
   SMOOTH ANCHOR SCROLL
   ================================================== */

function initSmoothAnchorScroll() {
    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const id = link.getAttribute("href");
            const target = document.querySelector(id);

            if (!target) return;

            event.preventDefault();

            const header = document.querySelector("[data-header]");
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition =
                target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });
        });
    });
}

/* ==================================================
   ANIMATION PREPARE
   Убираем двойные анимации, из-за которых контент дергается
   ================================================== */

function prepareAnimationElements() {
    const heroItems = document.querySelectorAll(
        ".home-hero-copy, .home-hero-photo"
    );

    heroItems.forEach((item) => {
        item.removeAttribute("data-aos");
        item.removeAttribute("data-aos-delay");
        item.removeAttribute("data-aos-duration");
        item.removeAttribute("data-aos-offset");
    });

    if (window.innerWidth <= 820) {
        document.querySelectorAll("[data-aos-delay]").forEach((item) => {
            item.removeAttribute("data-aos-delay");
        });
    }

    if (window.innerWidth <= 560) {
        document.querySelectorAll(".wildlife-type-card").forEach((item) => {
            item.style.animationDelay = "0s";
        });
    }
}

/* ==================================================
   LIBRARIES
   ================================================== */

function initLibraries() {
    if (window.lucide) {
        window.lucide.createIcons();
    }

    if (window.AOS) {
        window.AOS.init({
            duration: 600,
            easing: "ease-out-cubic",
            once: true,
            mirror: false,
            offset: 60,
            delay: 0,
            disable: () => window.innerWidth < 560,
        });

        window.addEventListener("load", () => {
            window.AOS.refreshHard();
        });
    }

    if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);

        const parallaxItems = document.querySelectorAll("[data-parallax]");

        parallaxItems.forEach((item) => {
            window.gsap.to(item, {
                yPercent: -8,
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });
    }
}