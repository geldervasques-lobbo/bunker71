const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
  if (!reduceMotion) {
    document.documentElement.style.setProperty("--scroll-y", String(Math.min(window.scrollY, 900)));
  }
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menu?.classList.toggle("is-open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

menu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menu.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealTargets = [
  ".section-label",
  ".section h2",
  ".copy",
  ".stat",
  ".service",
  ".project",
  ".tag-list span",
  ".impact-panel",
  ".contact > *",
  ".site-footer > *",
];

const revealElements = document.querySelectorAll(revealTargets.join(","));

if (reduceMotion) {
  revealElements.forEach((element) => element.classList.add("in-view"));
} else {
  revealElements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--delay", `${Math.min(index % 5, 4) * 70}ms`);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}
