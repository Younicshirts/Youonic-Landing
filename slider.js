const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const container = document.querySelector(".slides");

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const progressBar = document.querySelector(".progress");

let current = 0;
let startX = 0;
let endX = 0;

let autoSlide = setInterval(slideForward, 8000);
let position = 0;

function slideWidth() {
  let totalWidth = 0;

  slides.forEach(slide => {
    slide.style.width = slider.offsetWidth + "px";
    totalWidth += slider.offsetWidth;
  });

  container.style.width = totalWidth + 'px';
}

function animate() {
  container.style.transition = 'transform 0.5s ease-in-out';
  container.style.transform = `translateX(-${slider.offsetWidth * current}px)`;

  slides.forEach((slide, index) => {
    const childElement = slide.querySelector('.card');
    if (index === current) {
      childElement.classList.add('active');
    } else {
      childElement.classList.remove('active');
    }
  });
}

function updateProgressBar() {
  progressBar.style.transition = 'none';
  progressBar.style.width = '0';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      progressBar.style.transition = 'width 7.5s linear';
      progressBar.style.width = '100%';
    });
  });
}


function resetProgressBar() {
  progressBar.style.width = '0';
  progressBar.style.transition = 'none';
}


function slideForward() {
  if (current < slides.length - 1) {
    current++;
  } else {
    current = 0; // Reset to the first slide
  }
  animate();
  updateProgressBar();

}

function slideBack() {
  if (current > 0) {
    current--;
  } else {
    current = slides.length - 1; // Go to the last slide
  }
  animate();
  updateProgressBar();
}

// LOAD EVENT
window.addEventListener("load", () => {
  slideWidth();
  updateProgressBar(); // Initialize the progress bar animation on load
});

// RESIZE EVENT
window.addEventListener("resize", slideWidth);

// BUTTON EVENTS
nextButton.addEventListener("click", event => {
  clearInterval(autoSlide);
  slideForward();
  resetAutoSlide();
});

prevButton.addEventListener("click", event => {
  clearInterval(autoSlide);
  slideBack();
  resetAutoSlide();
});

// TOUCH EVENTS
container.addEventListener("pointerdown", event => {
  event.preventDefault();
  clearInterval(autoSlide);
  startX = event.pageX;
});

container.addEventListener("pointerup", event => {
  event.preventDefault();
  endX = event.pageX;
  if (startX - endX > 40) {
    slideForward();
  }
  if (startX - endX < -40) {
    slideBack();
  }
  resetAutoSlide();
});

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(slideForward, 8000);
  resetProgressBar(); // Reset progress bar animation
}
