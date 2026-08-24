const observedElements = new WeakSet();

const showAllAnimatedElements = () => {
  document.querySelectorAll("[data-animate]").forEach((element) => {
    element.classList.add("show");
  });
};

const REVEAL_RATIO = 0.12;
const ROOT_MARGIN_BOTTOM_RATIO = 0.08;

const createObserver = (threshold) => new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute("data-delay");

      if (delay) {
        entry.target.style.transitionDelay = `${Number(delay) * 100}ms`;
      }

      entry.target.classList.add("show");
      obs.unobserve(entry.target);
    }
  });
}, {
  threshold,
  rootMargin: `0px 0px -${ROOT_MARGIN_BOTTOM_RATIO * 100}% 0px`,
});

const observer = createObserver(REVEAL_RATIO);

// An element can never expose more of itself than the root can hold, so once it
// is taller than rootHeight / REVEAL_RATIO its ratio tops out below the
// threshold, the callback never fires, and it stays at opacity 0 forever (this
// is what blanked the long legal pages). Reveal those on entry instead.
const tallElementObserver = createObserver(0);

const canReachRevealRatio = (element) => {
  const height = element.getBoundingClientRect().height;
  const rootHeight = window.innerHeight * (1 - ROOT_MARGIN_BOTTOM_RATIO);

  return height * REVEAL_RATIO <= rootHeight;
};

const prepareAnimationGroups = (root) => {
  root.querySelectorAll("[data-animate-group]").forEach((group) => {
    const mode = group.getAttribute("data-animate-group") || "alternate";
    const children = Array.from(group.children).filter((child) => child instanceof HTMLElement);
    const cycle = mode === "cards"
      ? ["scale", "fade-left", "fade-right"]
      : ["fade-left", "fade-right", "scale"];

    children.forEach((child, index) => {
      if (!child.hasAttribute("data-animate")) {
        child.setAttribute("data-animate", cycle[index % cycle.length]);
      }

      if (!child.hasAttribute("data-delay")) {
        child.setAttribute("data-delay", String((index % 3) + 1));
      }
    });
  });
};

const observeAnimations = (root = document) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showAllAnimatedElements();
    return;
  }

  prepareAnimationGroups(root);

  root.querySelectorAll("[data-animate]").forEach((element) => {
    if (observedElements.has(element)) {
      return;
    }

    observedElements.add(element);
    (canReachRevealRatio(element) ? observer : tallElementObserver).observe(element);
  });
};

const initScrollAnimations = () => {
  observeAnimations(document);

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) {
          return;
        }

        if (node.matches("[data-animate]") || node.querySelector("[data-animate]") || node.matches("[data-animate-group]") || node.querySelector("[data-animate-group]")) {
          observeAnimations(node);
        }
      });
    });
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initScrollAnimations);
} else {
  initScrollAnimations();
}
