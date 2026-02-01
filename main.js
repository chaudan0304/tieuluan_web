// Slider: robusted with guards and safer selectors
(function () {
  const imgPosition = document.querySelectorAll(".aspect-ratio-169 img");
  const imgContainer = document.querySelector(".aspect-ratio-169");
  const dotItem = document.querySelectorAll(".dot");
  let imgNuber = imgPosition.length;
  let index = 0;

  if (imgNuber > 0 && imgContainer && dotItem.length > 0) {
    imgPosition.forEach(function (image, i) {
      image.style.left = i * 100 + "%";
      if (dotItem[i]) {
        dotItem[i].addEventListener("click", function () {
          slider(i);
        });
      }
    });

    function imgSlide() {
      index++;
      if (index >= imgNuber) {
        index = 0;
      }
      slider(index);
    }

    function slider(idx) {
      imgContainer.style.left = "-" + idx * 100 + "%";
      const dotActive = document.querySelector(".dot.active");
      if (dotActive) dotActive.classList.remove("active");
      if (dotItem[idx]) dotItem[idx].classList.add("active");
    }

    setInterval(imgSlide, 3000);
  }

  // Hamburger menu
  const hamburger = document.querySelector(".hamburger");
  const menuContainer = document.querySelector(".menu-container");
  if (hamburger && menuContainer) {
    hamburger.addEventListener("click", () => {
      menuContainer.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!menuContainer.contains(e.target) && !hamburger.contains(e.target)) {
        menuContainer.classList.remove("active");
      }
    });
  }
})();
