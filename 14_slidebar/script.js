let slides = document.querySelectorAll(".slide");
let slidesContainer = document.querySelector(".slides");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let dotsContainer = document.querySelector(".dots");

let index = 0;

// Create dots
for (let i = 0; i < slides.length; i++) {
  let dot = document.createElement("span");
  dot.classList.add("dot");

  dot.addEventListener("click", function () {
    index = i;
    showSlide();
  });

  dotsContainer.appendChild(dot);
}

let dots = document.querySelectorAll(".dot");

function showSlide() {
  let width = slides[0].clientWidth; // FIX
  slidesContainer.style.transform = `translateX(${-index * width}px)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

// Next
next.addEventListener("click", function () {
  index++;
  if (index >= slides.length) index = 0;
  showSlide();
});

// Prev
prev.addEventListener("click", function () {
  index--;
  if (index < 0) index = slides.length - 1;
  showSlide();
});

// Auto slide
setInterval(function () {
  index++;
  if (index >= slides.length) index = 0;
  showSlide();
}, 3000);

// Initial
showSlide();