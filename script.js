const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const filterButtons = document.querySelectorAll(".filter-button");
const addonCards = document.querySelectorAll(".addon-card");
const consultForm = document.querySelector(".consult-form");
const treatmentTrack = document.querySelector("[data-treatment-track]");
const treatmentPrev = document.querySelector("[data-carousel-prev]");
const treatmentNext = document.querySelector("[data-carousel-next]");
const servicesMenus = document.querySelectorAll(".services-menu");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement && !target.classList.contains("services-menu-trigger")) {
      navLinks.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    addonCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

if (consultForm) {
  consultForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = consultForm.querySelector("button");

    if (button) {
      button.textContent = "Request received";
      button.setAttribute("disabled", "true");
    }
  });
}

if (treatmentTrack && treatmentPrev && treatmentNext) {
  const scrollTreatments = (direction) => {
    const amount = Math.max(treatmentTrack.clientWidth * 0.82, 320);
    treatmentTrack.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  treatmentPrev.addEventListener("click", () => scrollTreatments(-1));
  treatmentNext.addEventListener("click", () => scrollTreatments(1));
}

servicesMenus.forEach((menu) => {
  const trigger = menu.querySelector(".services-menu-trigger");
  let closeTimer;

  if (!(trigger instanceof HTMLAnchorElement)) {
    return;
  }

  trigger.setAttribute("aria-haspopup", "true");
  trigger.setAttribute("aria-expanded", "false");

  const openMenu = () => {
    clearTimeout(closeTimer);
    menu.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    closeTimer = window.setTimeout(() => {
      menu.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    }, 220);
  };

  menu.addEventListener("mouseenter", openMenu);
  menu.addEventListener("mouseleave", closeMenu);
  menu.addEventListener("focusin", openMenu);
  menu.addEventListener("focusout", (event) => {
    if (!menu.contains(event.relatedTarget)) {
      closeMenu();
    }
  });

  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    const willOpen = !menu.classList.contains("is-open");

    servicesMenus.forEach((item) => {
      item.classList.remove("is-open");
      const itemTrigger = item.querySelector(".services-menu-trigger");
      if (itemTrigger) {
        itemTrigger.setAttribute("aria-expanded", "false");
      }
    });

    if (willOpen) {
      openMenu();
    } else {
      menu.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    }
  });
});

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Node)) {
    return;
  }

  if ([...servicesMenus].some((menu) => menu.contains(target))) {
    return;
  }

  servicesMenus.forEach((menu) => {
    menu.classList.remove("is-open");
    const trigger = menu.querySelector(".services-menu-trigger");
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  servicesMenus.forEach((menu) => {
    menu.classList.remove("is-open");
    const trigger = menu.querySelector(".services-menu-trigger");
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
    }
  });
});
