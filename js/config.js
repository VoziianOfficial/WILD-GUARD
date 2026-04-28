"use strict";

/**
 * WILD GUARD GLOBAL CONFIG
 * --------------------------------------------------
 * Один файл для общих данных сайта.
 * Меняешь здесь:
 * - название компании
 * - телефон
 * - email
 * - адрес
 * - company ID
 * - disclaimer
 * - тексты футера
 * - ссылки навигации
 *
 * Эти данные потом автоматически подтягиваются
 * через main.js во все страницы.
 */

window.WILD_GUARD_CONFIG = {
    company: {
        name: "WILD GUARD",
        tagline: "Wildlife Provider Matching",
        shortDescription:
            "A free matching platform helping homeowners compare independent local wildlife service providers for humane removal, exclusion, and prevention needs.",
        phone: "(866) 555-0148",
        phoneHref: "+18665550148",
        phoneButtonText: "Get Help Now",
        email: "support@wildguardhome.com",
        address: "USA Service Network",
        companyId: "WG-AGG-2048",
        serviceArea: "United States",
    },

    legal: {
        disclaimer:
            "Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.",

        privacyShort:
            "We use submitted information to help connect homeowners with relevant independent providers and to improve the matching experience.",

        cookieShort:
            "This website may use cookies and similar technologies to improve usability, measure performance, and support advertising or lead-matching functionality.",

        termsShort:
            "By using this website, visitors understand that WILD GUARD is an independent matching platform and does not perform wildlife services directly.",
    },

    navigation: [
        {
            label: "Home",
            href: "index.html",
        },
        {
            label: "Services",
            href: "services.html",
        },
        {
            label: "About",
            href: "about.html",
        },
        {
            label: "Contact",
            href: "contact.html",
        },
    ],

    serviceNavigation: [
        {
            label: "Wildlife Removal",
            href: "wildlife-removal.html",
            icon: "leaf",
            shortText: "Compare humane wildlife removal providers near you.",
        },
        {
            label: "Raccoon Removal",
            href: "raccoon-removal.html",
            icon: "shield-check",
            shortText: "Find local providers for raccoon activity around homes.",
        },
        {
            label: "Squirrel Removal",
            href: "squirrel-removal.html",
            icon: "home",
            shortText: "Explore options for squirrels in attics, walls, and rooflines.",
        },
        {
            label: "Bat Removal",
            href: "bat-removal.html",
            icon: "moon",
            shortText: "Connect with providers familiar with bat exclusion needs.",
        },
        {
            label: "Bird Control",
            href: "bird-control.html",
            icon: "feather",
            shortText: "Compare providers for nesting, roosting, and bird activity.",
        },
        {
            label: "Exclusion & Prevention",
            href: "exclusion-prevention.html",
            icon: "lock-keyhole",
            shortText: "Find providers for sealing entry points and prevention plans.",
        },
    ],

    footer: {
        intro:
            "WILD GUARD helps homeowners compare local independent wildlife service providers. We are not a direct wildlife removal company and do not perform services ourselves.",
        bottomText:
            "Independent wildlife provider matching platform for homeowners across the USA.",
        columns: [
            {
                title: "Platform",
                links: [
                    {
                        label: "How It Works",
                        href: "index.html#how-it-works",
                    },
                    {
                        label: "Services",
                        href: "services.html",
                    },
                    {
                        label: "About WILD GUARD",
                        href: "about.html",
                    },
                    {
                        label: "Contact",
                        href: "contact.html",
                    },
                ],
            },
            {
                title: "Services",
                links: [
                    {
                        label: "Wildlife Removal",
                        href: "wildlife-removal.html",
                    },
                    {
                        label: "Raccoon Removal",
                        href: "raccoon-removal.html",
                    },
                    {
                        label: "Squirrel Removal",
                        href: "squirrel-removal.html",
                    },
                    {
                        label: "Bat Removal",
                        href: "bat-removal.html",
                    },
                    {
                        label: "Bird Control",
                        href: "bird-control.html",
                    },
                    {
                        label: "Exclusion & Prevention",
                        href: "exclusion-prevention.html",
                    },
                ],
            },
            {
                title: "Legal",
                links: [
                    {
                        label: "Privacy Policy",
                        href: "privacy-policy.html",
                    },
                    {
                        label: "Cookie Policy",
                        href: "cookie-policy.html",
                    },
                    {
                        label: "Terms of Service",
                        href: "terms-of-service.html",
                    },
                ],
            },
        ],
    },

    forms: {
        mainCtaTitle: "Compare Local Wildlife Providers",
        mainCtaText:
            "Tell us what you noticed around your home. WILD GUARD can help connect you with independent local providers suited to your wildlife concern.",
        submitButtonText: "Request Provider Matches",
        successMessage:
            "Thank you. Your request has been prepared. A matching experience would continue from here.",
        fields: {
            name: "Full Name",
            phone: "Phone Number",
            email: "Email Address",
            zip: "ZIP Code",
            service: "Wildlife Concern",
            message: "Briefly describe what you noticed",
        },
        serviceOptions: [
            "Wildlife activity",
            "Raccoons",
            "Squirrels",
            "Bats",
            "Birds",
            "Entry point sealing",
            "Not sure yet",
        ],
    },

    cookieConsent: {
        storageKey: "wildGuardCookieConsent",
        title: "Privacy & Cookie Notice",
        text:
            "WILD GUARD uses cookies and similar technologies to improve the website experience and support provider-matching functionality. Please review our policies before continuing.",
        acceptText: "Accept",
        declineText: "Decline",
        links: [
            {
                label: "Privacy Policy",
                href: "privacy-policy.html",
            },
            {
                label: "Cookie Policy",
                href: "cookie-policy.html",
            },
            {
                label: "Terms of Service",
                href: "terms-of-service.html",
            },
        ],
    },

    social: [
        {
            label: "Facebook",
            href: "#",
            icon: "facebook",
        },
        {
            label: "Instagram",
            href: "#",
            icon: "instagram",
        },
        {
            label: "LinkedIn",
            href: "#",
            icon: "linkedin",
        },
    ],

    homePage: {
        hero: {
            eyebrow: "Humane. Careful. Provider Matching.",
            title: "Compare Local Wildlife Providers for a Safer, Quieter Home.",
            text:
                "WILD GUARD helps homeowners connect with independent local wildlife service providers for humane removal, exclusion, and prevention options.",
            primaryButton: "Get Matched",
            secondaryButton: "View Services",
            image: "assets/images/home/wildlife-hero-raccoon.jpg",
            imageAlt:
                "Raccoon on a residential roof near trees, representing wildlife activity around a home",
        },

        trustPoints: [
            {
                icon: "leaf",
                title: "Humane Focus",
                text: "Compare providers that discuss safe and responsible wildlife options.",
            },
            {
                icon: "map-pin",
                title: "Local Matching",
                text: "Connect with independent providers who may serve your area.",
            },
            {
                icon: "clipboard-check",
                title: "Clear Questions",
                text: "Review provider details, service scope, and next steps before choosing.",
            },
        ],

        wildlifeTypes: [
            {
                title: "Raccoons",
                image: "assets/images/wildlife/raccoon.jpg",
            },
            {
                title: "Squirrels",
                image: "assets/images/wildlife/squirrel.jpg",
            },
            {
                title: "Bats",
                image: "assets/images/wildlife/bat.jpg",
            },
            {
                title: "Birds",
                image: "assets/images/wildlife/bird.jpg",
            },
            {
                title: "Opossums",
                image: "assets/images/wildlife/opossum.jpg",
            },
            {
                title: "Skunks",
                image: "assets/images/wildlife/skunk.jpg",
            },
        ],

        process: [
            {
                number: "01",
                icon: "message-circle",
                title: "Tell Us What You Noticed",
                text:
                    "Share the animal type, signs of activity, and where the issue appears around your home.",
            },
            {
                number: "02",
                icon: "search",
                title: "Compare Provider Options",
                text:
                    "Review independent local providers who may be suited to the wildlife concern.",
            },
            {
                number: "03",
                icon: "phone-call",
                title: "Discuss Details Directly",
                text:
                    "Ask providers about inspection, removal approach, exclusion, pricing, and availability.",
            },
            {
                number: "04",
                icon: "shield",
                title: "Choose With Confidence",
                text:
                    "Homeowners choose which provider to contact or hire after reviewing details independently.",
            },
        ],
    },

    faqs: {
        general: [
            {
                question: "Is WILD GUARD a wildlife removal company?",
                answer:
                    "No. WILD GUARD is an independent matching platform that helps homeowners connect with local wildlife service providers. We do not perform wildlife removal, exclusion, inspection, or repair services directly.",
            },
            {
                question: "How do I compare local wildlife providers?",
                answer:
                    "You can compare providers by asking about licensing where required, insurance, humane methods, inspection process, exclusion recommendations, pricing, timing, and warranty or follow-up policies.",
            },
            {
                question: "Are provider quotes usually free?",
                answer:
                    "Some providers may offer free estimates, while others may charge for inspections or site visits. Homeowners should confirm fees directly with each independent provider before scheduling.",
            },
            {
                question: "What affects wildlife service pricing?",
                answer:
                    "Pricing may depend on animal type, entry points, attic or crawlspace access, removal complexity, exclusion work, cleanup needs, location, and provider availability.",
            },
            {
                question: "How do I know if a provider serves my area?",
                answer:
                    "WILD GUARD can help route your request based on location, but homeowners should confirm service area, availability, and project fit directly with the provider.",
            },
        ],
    },

    legalPages: {
        privacy: {
            title: "Privacy Policy",
            eyebrow: "Legal Information",
            intro:
                "This Privacy Policy explains how WILD GUARD may collect, use, and share information submitted through this website in connection with provider-matching services.",
        },
        cookies: {
            title: "Cookie Policy",
            eyebrow: "Website Technologies",
            intro:
                "This Cookie Policy explains how cookies and similar technologies may be used to operate, measure, and improve the WILD GUARD website experience.",
        },
        terms: {
            title: "Terms of Service",
            eyebrow: "Platform Terms",
            intro:
                "These Terms of Service explain the conditions for using WILD GUARD as an independent platform that helps homeowners connect with local wildlife service providers.",
        },
    },
};