let currentSlide = 0;

function updateCarousel() {
    const slides = document.querySelectorAll(".carousel-slide");
    slides.forEach((slide, index) => {
        const offset = index - currentSlide;

        // Define a posição e o estilo de cada slide
        slide.style.transform = `translateX(${offset * 320}px)`; // Ajusta o espaçamento entre as imagens
        slide.style.opacity = offset === 0 ? "1" : "0.5"; // Destaque para a imagem central
        slide.style.zIndex = offset === 0 ? "2" : "1"; // Garante que a imagem central fique acima
        slide.classList.toggle("active", offset === 0); // Aplica a classe 'active' à imagem central
    });
}

function changeSlide(direction) {
    const slides = document.querySelectorAll(".carousel-slide");
    const totalSlides = slides.length;

    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateCarousel();
}

// Inicializa o carrossel
updateCarousel();

// Slideshow automático (opcional)
setInterval(() => {
    changeSlide(1);
}, 3000);

// Funções para o pop-up
let currentPopupIndex = 0;
const images = [
    "images/ex01.jpg",
    "images/ex02.jpg",
    "images/ex03.jpg",
    "images/ex04.jpeg",
    "images/ex05.webp",
];

function openPopup(imageSrc) {
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    currentPopupIndex = images.indexOf(imageSrc); // Define o índice da imagem atual
    popupImg.src = imageSrc;
    popup.style.display = "flex";
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

function navigatePopup(direction) {
    currentPopupIndex =
        (currentPopupIndex + direction + images.length) % images.length; // Navega entre as imagens
    const popupImg = document.getElementById("popup-img");
    popupImg.src = images[currentPopupIndex];
}
