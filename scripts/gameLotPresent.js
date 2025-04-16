import {lotPresentState, modalState, questionState} from "./stateAll.js";
import {confettiFromSides} from "./confetti.js";
import {checkModalState, modalLotPresent, modalQuestion} from "./modalManager.js";

const targetGift = document.getElementById('target-gift');

// Состояние для перетаскивания
let draggedGift = null;
let offsetX = 0;
let offsetY = 0;

targetGift.addEventListener('click', () => {
    const contentLotPresent = document.getElementById('modal-content-lotPresent');
    contentLotPresent.innerHTML = `
        <div class="secret-code">
            1
        </div>
    `;

    lotPresentState.gameWin = true;
    modalState.game['modal-lotPresent'] = null;

    confettiFromSides(modalLotPresent);
    return checkModalState();
});

// Инициализация при загрузке
createRandomGifts();

function createRandomGifts() {
    const container = document.getElementById('modal-content-lotPresent');
    const containerRect = container.getBoundingClientRect();
    const giftSize = 100; // Размер подарка


    container.querySelectorAll('.draggable-gift').forEach(g => g.remove());


    const giftCount = getRandom(300, 350);

    for (let i = 0; i < giftCount; i++) {
        const giftWhite = document.createElement('div');
        giftWhite.className = 'gift-icon draggable-gift';

        // Случайное позиционирование
        const posX = Math.random() * (containerRect.width + giftSize + 640);
        const posY = Math.random() * (containerRect.height + giftSize + 330);

        // Стили для абсолютного позиционирования
        giftWhite.style.position = 'absolute';
        giftWhite.style.left = posX + 'px';
        giftWhite.style.top = posY + 'px';
        giftWhite.style.width = giftSize + 'px';
        giftWhite.style.height = giftSize + 'px';

        // Случайный z-index от 11 до 20
        giftWhite.style.zIndex = getRandom(5, 6).toString();

        // Добавляем изображение
        giftWhite.innerHTML = `<img src="./desktop-img/lot-present/white-gift.png" alt="white gift" style="width:100%;height:100%;">`;


        giftWhite.addEventListener('mousedown', startDrag);

        container.appendChild(giftWhite);
    }
}


function startDrag(e) {
    if (!e.target.closest('.draggable-gift')) return;

    draggedGift = e.target.closest('.draggable-gift');
    const rect = draggedGift.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    draggedGift.style.cursor = 'grabbing';
    draggedGift.style.opacity = '0.8';
    draggedGift.style.zIndex = '100';

    document.addEventListener('mousemove', dragGift);
    document.addEventListener('mouseup', endDrag);
}

function dragGift(e) {
    if (!draggedGift) return;

    e.preventDefault();

    const container = document.getElementById('modal-content-lotPresent');
    const containerRect = container.getBoundingClientRect();
    const giftRect = draggedGift.getBoundingClientRect();



    let newX = e.clientX - containerRect.left - offsetX;
    let newY = e.clientY - containerRect.top - offsetY;

    // Ограничение перемещения
    newX = Math.max(0, Math.min(newX, containerRect.width - giftRect.width));
    newY = Math.max(0, Math.min(newY, containerRect.height - giftRect.height));

    draggedGift.style.left = newX + 'px';
    draggedGift.style.top = newY + 'px';
}

function endDrag() {
    if (!draggedGift) return;

    draggedGift.style.cursor = 'grab';
    draggedGift.style.opacity = '1';
    draggedGift.style.zIndex = getRandom(11, 20).toString();

    document.removeEventListener('mousemove', dragGift);
    document.removeEventListener('mouseup', endDrag);
    draggedGift = null;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}