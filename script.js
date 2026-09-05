/* =====================================
   FROZEN BY ARMAN
   Main JavaScript
===================================== */


/* =====================================
   IMAGE ORDER
===================================== */

const images = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "39.jpg",
  "49.jpg",
  "41.jpg",
  "54.jpg",
  "40.jpg",
  "45.jpg",
  "48.jpg",
  "47.jpg",
  "43.jpg",
  "46.jpg",
  "52.jpg",
  "53.jpg",
  "50.jpg",
  "44.jpg",
  "42.jpg",
  "51.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "23.jpg",
  "24.jpg",
  "25.jpg",
  "26.jpg",
  "27.jpg",
  "28.jpg",
  "29.jpg",
  "30.jpg",
  "31.jpg",
  "32.jpg",
  "33.jpg",
  "34.jpg",
  "35.jpg",
  "36.jpg",
  "37.jpg"
];


/* =====================================
   HERO SLIDESHOW
===================================== */

const heroSlides =
  document.querySelectorAll(".hero-slide");

const heroCurrent =
  document.getElementById("heroCurrent");

const heroNext =
  document.querySelector(".hero-next");

const heroPrev =
  document.querySelector(".hero-prev");

let heroIndex = 0;

let heroTimer;


function showHeroSlide(index) {

  heroSlides.forEach(slide => {
    slide.classList.remove("active");
  });

  heroSlides[index].classList.add("active");

  heroCurrent.textContent =
    String(index + 1).padStart(2, "0");

  heroIndex = index;
}


function nextHeroSlide() {

  heroIndex++;

  if (heroIndex >= heroSlides.length) {
    heroIndex = 0;
  }

  showHeroSlide(heroIndex);

  restartHeroTimer();
}


function previousHeroSlide() {

  heroIndex--;

  if (heroIndex < 0) {
    heroIndex = heroSlides.length - 1;
  }

  showHeroSlide(heroIndex);

  restartHeroTimer();
}


function restartHeroTimer() {

  clearInterval(heroTimer);

  heroTimer = setInterval(
    nextHeroSlide,
    6000
  );
}


heroNext.addEventListener(
  "click",
  nextHeroSlide
);


heroPrev.addEventListener(
  "click",
  previousHeroSlide
);


restartHeroTimer();


/* =====================================
   LIGHTBOX
===================================== */

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const lightboxCurrent =
  document.getElementById("lightboxCurrent");

const lightboxClose =
  document.querySelector(".lightbox-close");

const lightboxNext =
  document.querySelector(".lightbox-next");

const lightboxPrev =
  document.querySelector(".lightbox-prev");

const galleryImages =
  document.querySelectorAll(".gallery-item img");


let currentImage = 0;


/* Open */

function openLightbox(index) {

  currentImage = index;

  updateLightbox();

  lightbox.classList.add("open");

  document.body.style.overflow = "hidden";
}


/* Update */

function updateLightbox() {

  lightboxImage.src =
    "images/" + images[currentImage];

  lightboxCurrent.textContent =
    String(currentImage + 1).padStart(2, "0");

}


/* Close */

function closeLightbox() {

  lightbox.classList.remove("open");

  document.body.style.overflow = "";
}


/* Next */

function nextImage() {

  currentImage++;

  if (currentImage >= images.length) {
    currentImage = 0;
  }

  updateLightbox();
}


/* Previous */

function previousImage() {

  currentImage--;

  if (currentImage < 0) {
    currentImage = images.length - 1;
  }

  updateLightbox();
}


/* Gallery click */

galleryImages.forEach(image => {

  image.addEventListener("click", () => {

    const index =
      Number(image.dataset.index);

    openLightbox(index);

  });

});


/* Buttons */

lightboxClose.addEventListener(
  "click",
  closeLightbox
);


lightboxNext.addEventListener(
  "click",
  nextImage
);


lightboxPrev.addEventListener(
  "click",
  previousImage
);


/* Background click */

lightbox.addEventListener(
  "click",
  event => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  }
);


/* =====================================
   KEYBOARD CONTROL
===================================== */

document.addEventListener(
  "keydown",
  event => {

    if (!lightbox.classList.contains("open")) {
      return;
    }


    if (event.key === "ArrowRight") {
      nextImage();
    }


    if (event.key === "ArrowLeft") {
      previousImage();
    }


    if (event.key === "Escape") {
      closeLightbox();
    }

  }
);


/* =====================================
   MOBILE SWIPE
===================================== */

let touchStartX = 0;

let touchEndX = 0;


lightbox.addEventListener(
  "touchstart",
  event => {

    touchStartX =
      event.changedTouches[0].screenX;

  },
  { passive: true }
);


lightbox.addEventListener(
  "touchend",
  event => {

    touchEndX =
      event.changedTouches[0].screenX;

    const distance =
      touchEndX - touchStartX;


    if (Math.abs(distance) < 50) {
      return;
    }


    if (distance < 0) {
      nextImage();
    } else {
      previousImage();
    }

  },
  { passive: true }
);


/* =====================================
   PRELOAD IMAGES
===================================== */

images.forEach(file => {

  const image = new Image();

  image.src = "images/" + file;

});


/* =====================================
   NAVIGATION
===================================== */

const navLinks =
  document.querySelectorAll(
    ".navbar nav a"
  );


navLinks.forEach(link => {

  link.addEventListener(
    "click",
    () => {

      document.body.style.overflow = "";

    }
  );

});