import {snakeState, taskState, modalState} from './stateAll.js';
import {checkModalState, modalSnake, closeModal} from './modalManager.js'
import  {confettiFromSides} from './confetti.js'


let start = 0;
let end = 24; // Целевое количество очков
let scoreStart, scoreEnd; // Элементы для отображения счета

let blockSize = 20;
let rows = 24;
let cols = 24;
let board;
let context;

let snakeX;
let snakeY;
let foodX;
let foodY;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let gameOver = false;

const modalContent = document.getElementById('modal-content-snake');
const contentSnake = `
    <div class="snake">
        <canvas id="snake-board"></canvas>
        <div class="snake-info">
            <div class="score"><p id="score-start">0</p> : <p id="score-end">25</p></div>
            <div class="description">
                Задача: <br> Набери нужное количество очков чтобы открыть следующий уровень! <br>С каждым уровнем ты все ближе к <span>подарку</span>!
            </div>
            <div class="control">
                <h3>Управление:</h3>
                <span>  
                    <div class="arrow-control">
                        <img src="./desktop-img/snake/left.svg" alt="left">
                        <img src="./desktop-img/snake/up.svg" alt="up">
                        <img src="./desktop-img/snake/right.svg" alt="right">
                        <img src="./desktop-img/snake/down.svg" alt="down">
                    </div> — ходить
                </span>
            </div>
        </div>
    </div>
`;

// Инициализация игры при загрузке страницы
window.onload = function() {
    initGame();
    startGame();
};

function initGame() {
    // Восстанавливаем исходный HTML
    modalContent.innerHTML = contentSnake;

    // Инициализируем игровое поле
    initBoard();

    scoreStart = document.getElementById('score-start');
    scoreEnd = document.getElementById('score-end');

    start = 0
    scoreStart.textContent = `${start}`;
    scoreEnd.textContent = `${end}`;

    // Назначаем обработчики управления
    document.addEventListener('keyup', changeDirection);
}

function initBoard() {
    board = document.getElementById('snake-board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d');
}

function startGame() {
    // Сбрасываем состояние игры
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    gameOver = false;

    // Генерируем первую еду
    placeFood();

    // Останавливаем предыдущий интервал (если был)
    if (window.gameInterval) {
        clearInterval(window.gameInterval);
    }

    // Запускаем игровой цикл
    window.gameInterval = setInterval(update, 1500/10);
}

function update() {


    if (gameOver) {
        clearInterval(window.gameInterval);
        showGameOver();
        return;
    }

    if (snakeState.gameWin) {
        clearInterval(window.gameInterval);
        showGameWin()
        return
    }

    // Очищаем поле
    context.fillStyle = '#FAF4E6';
    context.fillRect(0, 0, board.width, board.height);

    // Рисуем еду
    context.fillStyle = '#E93B3D';
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Проверяем съедание еды
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);

        start += 1;
        scoreStart.textContent = start;
        placeFood();
    }

    // Обновляем позиции тела змейки
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Рисуем змейку
    context.fillStyle = '#217670';
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Проверяем столкновения
    if (snakeX < 0 || snakeX >= cols*blockSize || snakeY < 0 || snakeY >= rows*blockSize) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
        }
    }

    if (start === end) {
        snakeState.gameWin = true;
        setTimeout(() => showGameWin(), 800)
        return checkModalState()
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e) {
    if (e.code === 'ArrowUp' && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    }
    if (e.code === 'ArrowDown' && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    }
    if (e.code === 'ArrowLeft' && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    }
    if (e.code === 'ArrowRight' && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function showGameOver() {
    modalContent.innerHTML = `
        <div class="game-over">
            <h2><img src="../desktop-img/snake/cry.gif" alt="cry"></h2>
            <p>Твой счет: ${start}</p>
            <button id="restart-btn">RESTART</button>
        </div>
    `;

    // Назначаем обработчик для кнопки рестарта
    document.getElementById('restart-btn').addEventListener('click', function() {
        // Полностью переинициализируем игру
        initGame();
        startGame();
    });
}


export function showGameWin() {
    clearInterval(window.gameInterval);

    modalContent.innerHTML = `
        <div class="game-win">
            <h2>WIN!</h2>
            <p style="font-size: 40px; color: #31322D">Твой счет: <span style="color: #b965f1; background-color: #faf4e6; font-size: 40px; border-radius: 100%; padding: 8px 10px;">${start}</span></p>
            <button id="close-modal">Закрыть</button>
        </div>
    `;

    document.getElementById('close-modal').addEventListener('click', () => closeModal(modalSnake))

    return confettiFromSides(modalSnake)
}