// Função para revelar os elementos do banner após o carregamento com delay
window.addEventListener("load", () => {
    setTimeout(() => {
        const banner = document.querySelector(".section-header");
        if (banner) {
            banner.classList.add("visible"); // Adiciona a classe "visible" para exibir o banner
        }
    }, 1000); // Delay de 1 segundo
});

// Remove o preloader após o carregamento da página
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const images = Array.from(document.images); // Obtém todas as imagens da página
    let loadedImages = 0;

    images.forEach((img) => {
        if (img.complete) {
            loadedImages++; // Incrementa se a imagem já está carregada
        } else {
            img.addEventListener("load", () => loadedImages++); // Incrementa ao carregar
            img.addEventListener("error", () => loadedImages++); // Incrementa mesmo em caso de erro
        }
    });

    const checkAllImagesLoaded = setInterval(() => {
        if (loadedImages === images.length) {
            clearInterval(checkAllImagesLoaded); // Para o intervalo quando todas as imagens forem carregadas
            preloader.style.opacity = "0"; // Esconde o preloader com transição
            setTimeout(() => {
                preloader.style.display = "none"; // Remove o preloader da tela
            }, 500); // Delay para a transição
        }
    }, 100); // Verifica a cada 100ms
});

// Controle do carrossel principal
let currentSlide = 0;

function updateCarousel() {
    const slides = document.querySelectorAll(".carousel-slide");
    slides.forEach((slide, index) => {
        const offset = index - currentSlide; // Calcula a posição relativa do slide
        const isActive = offset === 0; // Verifica se o slide é o ativo

        slide.style.transform = `translateX(${offset * 320}px)`; // Move os slides horizontalmente
        slide.style.opacity = isActive ? "1" : "0.5"; // Ajusta a opacidade do slide ativo
        slide.style.zIndex = isActive ? "2" : "1"; // Ajusta a profundidade do slide ativo
        slide.classList.toggle("active", isActive); // Adiciona ou remove a classe "active"
    });
}

function changeSlide(direction) {
    const slides = document.querySelectorAll(".carousel-slide");
    currentSlide = (currentSlide + direction + slides.length) % slides.length; // Atualiza o índice do slide atual
    updateCarousel(); // Atualiza a posição do carrossel
}

updateCarousel(); // Inicializa o carrossel

// Configuração de auto-slide (troca automática de slides)
let autoSlide = setInterval(() => {
    changeSlide(1); // Avança para o próximo slide a cada 3 segundos
}, 3000);

// Pausa o auto-slide ao passar o mouse sobre o carrossel
document.querySelector(".carousel").addEventListener("mouseenter", () => {
    clearInterval(autoSlide); // Para o auto-slide
});

// Retoma o auto-slide ao remover o mouse do carrossel
document.querySelector(".carousel").addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
        changeSlide(1); // Retoma o auto-slide
    }, 3000);
});

// Função para animações de scroll (revela elementos ao rolar a página)
function handleScrollAnimations() {
    const elements = [
        ...document.querySelectorAll(".hidden"), // Seleciona elementos com a classe "hidden"
        ...document.querySelectorAll(".card-links"), // Seleciona elementos com a classe "card-links"
    ];
    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top; // Obtém a posição do elemento em relação à viewport
        const viewportHeight = window.innerHeight; // Altura da viewport

        if (elementTop < viewportHeight - 100) {
            element.classList.add("visible"); // Adiciona a classe "visible" se o elemento estiver visível
        }
    });
}

window.addEventListener("scroll", handleScrollAnimations); // Executa a função ao rolar a página
handleScrollAnimations(); // Executa a função ao carregar a página

// Controle do carrossel secundário (slider-container)
const sliderContainer = document.querySelector(".slider-container");
const sliderCards = document.querySelectorAll(".slider-card");
const prevButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");

let currentIndex = 0; // Índice do slide atual
const totalSlides = sliderCards.length; // Total de slides
const slideWidth = sliderCards[0].offsetWidth + 18; // Largura do slide + gap

// Função para atualizar a posição do carrossel
function updateSliderPosition() {
    const offset = -currentIndex * slideWidth; // Calcula o deslocamento do carrossel
    sliderContainer.style.transform = `translateX(${offset}px)`; // Move o carrossel
}

// Função para ir para o slide anterior
function goToPrevSlide() {
    if (currentIndex > 0) {
        currentIndex--; // Volta para o slide anterior
    } else {
        currentIndex = totalSlides - 1; // Volta para o último slide
    }
    updateSliderPosition();
}

// Função para ir para o próximo slide
function goToNextSlide() {
    if (currentIndex < totalSlides - 1) {
        currentIndex++; // Avança para o próximo slide
    } else {
        currentIndex = 0; // Volta para o primeiro slide
    }
    updateSliderPosition();
}

// Adiciona eventos aos botões de navegação
prevButton.addEventListener("click", goToPrevSlide);
nextButton.addEventListener("click", goToNextSlide);

// Inicializa a posição do carrossel
updateSliderPosition();
