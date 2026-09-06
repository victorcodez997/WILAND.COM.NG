// Header shadow on scroll
const header = document.getElementById("header");
if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 60);
  });
}

// Scroll to top on load
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

// Mobile nav toggle
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
if (hamburger && nav) {
  const openNav = () => {
    nav.scrollTop = 0;
    nav.classList.add("open");
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
  };

  const closeNav = () => {
    nav.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  hamburger.setAttribute("aria-expanded", "false");
  hamburger.addEventListener("click", () => {
    nav.classList.contains("open") ? closeNav() : openNav();
  });

  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1020) closeNav();
  });
}

// Nav active states
const navLinks = document.querySelectorAll(".nav__link");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

let hasPageLinks = false;
navLinks.forEach((link) => {
  if ((link.getAttribute("href") || "").startsWith("#") === false) {
    hasPageLinks = true;
  }
});

if (hasPageLinks) {
  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("#")) {
      link.classList.toggle(
        "active",
        href === currentPage || (currentPage === "" && href === "index.html"),
      );
    }
  });
} else {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
}

// ── Subtle load-in animation on scroll ──
(function () {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  if (!("IntersectionObserver" in window)) return;

  const selectors = [
    ".hero-copy",
    ".section-head",
    ".catalog-header",
    ".catalog-card",
    ".value-card",
    ".worth-card",
    ".team-card",
    ".mon-feature",
    ".about-copy",
    ".about-visual",
    ".contact-info",
    ".contact-form",
  ].join(",");

  const els = document.querySelectorAll(selectors);
  if (!els.length) return;

  els.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );

  els.forEach((el) => observer.observe(el));
})();
