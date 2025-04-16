import {checkModalState, closeModal, modalPresent2, modalQuestion} from "./modalManager.js";
import {showTemporaryModal} from "./modalInfo.js";
import {modalState, questionState} from "./stateAll.js";
import {confettiFromSides} from "./confetti.js";

const kitchen = document.getElementById('kitchen');
const hallway = document.getElementById('hallway');
const bathroom = document.getElementById('bathroom');
const bedroom = document.getElementById('bedroom');

const present2Password = document.querySelector('.present2-password')
const present2Container = document.querySelector('.present2-container')

const password = '24237184'
const input = document.getElementById('input-present2')

const state = {
    'kitchen': false,
    'hallway': false,
    'bathroom': false,
    'bedroom': false,
};

window.addEventListener('keydown', (event) => {

    if (present2Container.style.display === 'block') {
        return
    }

    if (event.code === 'Enter') {
        const inputAnswer = input.value

        if (inputAnswer === password) {
            present2Password.style.display = 'none'
            present2Container.style.display = 'block'

            showTemporaryModal(`Последняя игра: Найди подарки.`, 4500, 'success');
        } else {
            passwordError()
        }
    }
});

function passwordError() {
    input.classList.add("bounce");

    setTimeout(function() {
        input.classList.remove("bounce");
    }, 1000);
}

function buttonClick(selector, room) {
    const buttons = Array.from(room.querySelectorAll(selector));


    buttons.forEach((button, index) => {
        button.dataset.click = "false";
        button.style.cursor = 'pointer'

        button.addEventListener('click', () => {
            button.dataset.click = "true";
            button.style.display = "none";

            const allButtonsClicked = buttons.every(btn => btn.dataset.click === "true");

            if (allButtonsClicked) {
                state[room.id] = true;
                room.style.display = 'none'
            }

            if (Object.values(state).every(item => item === true)) {
                setTimeout(() => confettiFromSides(modalPresent2), 3000)
                setTimeout(() => showTemporaryModal(`Ты все нашел! ^_^`, 5500, 'success'), 5000)
                setTimeout(() => closeModal(modalPresent2), 8000)
            }
        });
    });
}

function message() {
    const buttonsKitchen = Array.from(kitchen.querySelectorAll('.present2-button'));
    const buttonsHallway = Array.from(hallway.querySelectorAll('.present2-button'));
    const buttonsBathroom = Array.from(bathroom.querySelectorAll('.present2-button'));
    const buttonsBedroom = Array.from(bedroom.querySelectorAll('.present2-button'));



    ///////// Кнопки

    // Холодильник
    buttonsKitchen[0].addEventListener('click', () => showDialog('kitchen-button-1', [
        "Хм..", "Кажется...", "Кажется тут ничего нет."
    ]))

    // Плита
    buttonsKitchen[1].addEventListener('click', () => showDialog('kitchen-button-1', [
        "Блин...", "Кажется...", "Кажется тут что то есть!"
    ]))

    // Ящик 1 (от плиты)
    buttonsKitchen[2].addEventListener('click', () => showDialog('kitchen-button-1', [
        "Кажется...", "Тут ничего нет :с"
    ]))


    // Микроволновка (от плиты)
    buttonsKitchen[3].addEventListener('click', () => showDialog('kitchen-button-1', [
        "О!", "Что то виднеется, интересно, что это?"
    ]))

    // Ящик 2 (от плиты)
    buttonsKitchen[4].addEventListener('click', () => showDialog('kitchen-button-1', [
        "О!", "Что то лежит!"
    ]))

    // Ящик 3 (от плиты)
    buttonsKitchen[5].addEventListener('click', () => showDialog('kitchen-button-1', [
        "Снова ничего.. :С"
    ]))

    // Ящик верхний 1
    buttonsKitchen[6].addEventListener('click', () => showDialog('kitchen-button-1', [
        "Тут тоже ничего.. :С"
    ]))


    // Ящик верхний 2
    buttonsKitchen[7].addEventListener('click', () => showDialog('kitchen-button-1', [
        "О! Кажется тут что то есть..", "По моему сверху, на ящике!"
    ]))

    // Уголок
    buttonsKitchen[8].addEventListener('click', () => showDialog('kitchen-button-1', [
        "И тут ничего, как жаль."
    ]))




    // Шкаф в прихожей
    buttonsHallway[0].addEventListener('click', () => showDialog('kitchen-button-1', [
        "Нетю..", "Хотя постой...", "Тут какая то коробочка?"
    ]))

    // Обувница
    buttonsHallway[1].addEventListener('click', () => showDialog('kitchen-button-1', [
        "О! Что то лежит!"
    ]))


    // Стиральная машинка
    buttonsBathroom[0].addEventListener('click', () => showDialog('kitchen-button-1', [
        "Хм...", "Вещи стираются.. Ну, значит ничего нет"
    ]))


    // Ванная
    buttonsBathroom[1].addEventListener('click', () => showDialog('kitchen-button-1', [
        "Хм...", "Тут что то за шторкой!!!"
    ]))


    // Картина
    buttonsBedroom[0].addEventListener('click', () => showDialog('kitchen-button-1', [
        "Хм...", "Ну ка...", "Тут точно что то было!"
    ]))

    // Шкаф ф спальне
    buttonsBedroom[1].addEventListener('click', () => showDialog('kitchen-button-1', [
        "Тут я кажется тоже что то спрятала", "Да, тут 100% что то есть..", "По моему на самом верху!"
    ]))


    // Кахон
    buttonsBedroom[2].addEventListener('click', () => showDialog('kitchen-button-1', [
        "Кажется тут что то есть!",
    ]))

    // Подушки
    buttonsBedroom[3].addEventListener('click', () => showDialog('kitchen-button-1', [
        "Какие мягкие...", "Сейчас бы поспааать, да?", "О! Смотри! Я вижу краешек чего то!"
    ]))
}



// Запускаем для каждой комнаты
buttonClick('.present2-button', kitchen);
buttonClick('.present2-button', hallway);
buttonClick('.present2-button', bathroom);
buttonClick('.present2-button', bedroom);

message()


/**
 * Показывает последовательность сообщений в диалоговом окне
 * @param {string} buttonId - ID кнопки, которая вызвала диалог
 * @param {string[]} messages - Массив сообщений для показа
 * @param {number} delay - Задержка между сообщениями (мс)
 */


function showDialog(buttonId, messages) {

    const button = document.getElementById(buttonId);
    if (!button) return; // Если кнопка не найдена, выходим

    // Создаем диалоговое окно
    const dialog = document.createElement('div');
    dialog.className = 'dialog-box';



    modalPresent2.appendChild(dialog);

    let currentMessageIndex = 0;


    function showNextMessage() {
        if (currentMessageIndex < messages.length) {
            dialog.textContent = messages[currentMessageIndex];
            currentMessageIndex++;
        } else {
            dialog.remove();
        }
    }

    if (currentMessageIndex === 0 ) {
        showNextMessage();
    }

    document.addEventListener('keydown', (e) => {

        if (e.code === 'Space') {
            showNextMessage();
        }
    })

}


