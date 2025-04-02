// Função para revelar os elementos do banner após o carregamento com delay
window.addEventListener("load", () => {
    setTimeout(() => {
        const banner = document.querySelector(".section-header");
        if (banner) {
            banner.classList.add("visible");
        }
    }, 1000); // Delay de 500ms
});

// Remove o preloader após o carregamento da página
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const images = Array.from(document.images);
    let loadedImages = 0;

    images.forEach((img) => {
        if (img.complete) {
            loadedImages++;
        } else {
            img.addEventListener("load", () => loadedImages++);
            img.addEventListener("error", () => loadedImages++);
        }
    });

    const checkAllImagesLoaded = setInterval(() => {
        if (loadedImages === images.length) {
            clearInterval(checkAllImagesLoaded);
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }
    }, 100);
});

let currentSlide = 0;

function updateCarousel() {
    const slides = document.querySelectorAll(".carousel-slide");
    slides.forEach((slide, index) => {
        const offset = index - currentSlide;
        const isActive = offset === 0;

        slide.style.transform = `translateX(${offset * 320}px)`;
        slide.style.opacity = isActive ? "1" : "0.5";
        slide.style.zIndex = isActive ? "2" : "1";
        slide.classList.toggle("active", isActive);
    });
}

function changeSlide(direction) {
    const slides = document.querySelectorAll(".carousel-slide");
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateCarousel();
}

updateCarousel();

let autoSlide = setInterval(() => {
    changeSlide(1);
}, 3000);

document.querySelector(".carousel").addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
});

document.querySelector(".carousel").addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
        changeSlide(1);
    }, 3000);
});

function handleScrollAnimations() {
    const elements = [
        ...document.querySelectorAll(".hidden"),
        ...document.querySelectorAll(".card-links"),
    ];
    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        if (elementTop < viewportHeight - 100) {
            element.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", handleScrollAnimations);
handleScrollAnimations();
