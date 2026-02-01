// Slider: Fade effect with dots (simpler and matches CSS opacity animation)
(function () {
  const slides = document.querySelectorAll(".aspect-ratio-169 img");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  const slideInterval = 3000;
  let slideTimer;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
    currentIndex = index;
  }

  function nextSlide() {
    let next = currentIndex + 1;
    if (next >= slides.length) next = 0;
    showSlide(next);
  }

  function startTimer() {
    slideTimer = setInterval(nextSlide, slideInterval);
  }

  function resetTimer() {
    clearInterval(slideTimer);
    startTimer();
  }

  if (slides.length > 0) {
    // setup dots click
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        resetTimer();
      });
    });

    // show first
    showSlide(0);
    startTimer();
  }

  // Hamburger menu (accessible)
  const hamburger = document.querySelector(".hamburger");
  const menuContainer = document.querySelector(".menu-container");
  if (hamburger && menuContainer) {
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
      menuContainer.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!menuContainer.contains(e.target) && !hamburger.contains(e.target)) {
        menuContainer.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }
})();
