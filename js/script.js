// Função para revelar os elementos do banner após o carregamento com delay
window.addEventListener("load", () => {
    setTimeout(() => {
        const banner = document.querySelector(".section-header");
        if (banner) {
            banner.classList.add("visible");
        }
    }, 500); // Delay de 500ms
});

// Seleciona todos os elementos com a classe "hidden"
const hiddenElements = document.querySelectorAll(".hidden");

// Função para verificar se o elemento está visível na viewport
function revealOnScroll() {
    hiddenElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        // Verifica se o elemento está visível
        if (elementTop < viewportHeight - 100) {
            setTimeout(() => {
                element.classList.add("visible");
            }, 300); // Delay de 300ms para cada elemento
        }
    });
}

// Adiciona o evento de scroll
window.addEventListener("scroll", revealOnScroll);

// Executa a função uma vez para capturar elementos visíveis no carregamento
revealOnScroll();

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

// Remove o preloader após o carregamento da página
window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none";
});

let currentIndex = 0;

function changeCard(direction) {
    console.log("Botão clicado, direção:", direction); // Adicionado para depuração
    const container = document.querySelector(".slider-container");
    const cards = document.querySelectorAll(".slider-card");

    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth + 20; // Largura do card + gap
    const visibleCards = Math.floor(container.offsetWidth / cardWidth);
    const maxIndex = cards.length - visibleCards;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = maxIndex;
    } else if (currentIndex > maxIndex) {
        currentIndex = 0;
    }

    container.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

// Animação de fade-in para os cards de serviços
const cards = document.querySelectorAll(".card-links");

function fadeInOnScroll() {
    cards.forEach((card) => {
        const cardTop = card.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        if (cardTop < viewportHeight - 100) {
            card.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", fadeInOnScroll);

// Executa a função no carregamento inicial
fadeInOnScroll();
