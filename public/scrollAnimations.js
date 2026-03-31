const observedElements = new WeakSet();

const showAllAnimatedElements = () => {
  document.querySelectorAll("[data-animate]").forEach((element) => {
    element.classList.add("show");
  });
};

const observer = new IntersectionObserver((entries, obs) => {
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
  threshold: 0.12,
  rootMargin: "0px 0px -8% 0px",
});

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
    observer.observe(element);
  });
};

const initScrollAnimations = () => {
  observeAnimations(document);

  const initHeroCtaObserver = () => {
    const hero = document.querySelector(".hero-home");
    const ctas = document.querySelectorAll(".hero-scroll-cta");

    if (!hero || !ctas.length) {
      return;
    }

    const syncVisibility = (isVisible) => {
      ctas.forEach((cta) => {
        cta.classList.toggle("visible", isVisible);
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      syncVisibility(true);
      return;
    }

    const heroCtaObserver = new IntersectionObserver(
      ([entry]) => {
        syncVisibility(entry.intersectionRatio < 0.92);
      },
      {
        threshold: [0, 0.92],
      },
    );

    heroCtaObserver.observe(hero);
  };

  initHeroCtaObserver();

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) {
          return;
        }

        if (node.matches("[data-animate]") || node.querySelector("[data-animate]") || node.matches("[data-animate-group]") || node.querySelector("[data-animate-group]")) {
          observeAnimations(node);
        }

        if (node.matches(".hero-scroll-cta") || node.querySelector(".hero-scroll-cta")) {
          initHeroCtaObserver();
        }

        if (node.matches(".hero-home") || node.querySelector(".hero-home")) {
          initHeroCtaObserver();
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
