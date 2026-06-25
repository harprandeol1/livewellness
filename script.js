const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const filterButtons = document.querySelectorAll(".filter-button");
const addonCards = document.querySelectorAll(".addon-card");
const consultForm = document.querySelector(".consult-form");
const treatmentTrack = document.querySelector("[data-treatment-track]");
const treatmentPrev = document.querySelector("[data-carousel-prev]");
const treatmentNext = document.querySelector("[data-carousel-next]");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
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
