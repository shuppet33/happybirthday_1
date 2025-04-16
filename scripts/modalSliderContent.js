const slides = document.querySelectorAll('.slide');

let currentIndex = 0
let indexPrev

function slideNext() {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
        slides[currentIndex].style.display = 'flex'
    }
}

function slidePrev() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
        slides[currentIndex].style.display = 'flex'
    }
}







