import {modalState, snakeState, rebusState, questionState, lotPresentState, lastState} from "./stateAll.js";
import {updateTaskStateBasedOnGame} from './taskGroup.js'

const modalPresent = document.getElementById('modal-present')
const iconPresent = document.getElementById('icon-present')
const presentCross = document.getElementById('cross-present')
const presentHeader = document.getElementById('present-header')

const modalComputer = document.getElementById('modal-computer')
const iconComputer = document.getElementById('icon-computer')
const computerCross = document.getElementById('cross-computer')
const computerHeader = document.getElementById('computer-header')

const modalDirectory = document.getElementById('modal-directory')
const iconDirectory = document.getElementById('icon-directory')
const directoryCross = document.getElementById('cross-directory')
const directoryHeader = document.getElementById('directory-header')

const modalBasket = document.getElementById('modal-basket')
const iconBasket = document.getElementById('icon-basket')
const basketCross = document.getElementById('cross-basket')
const basketHeader = document.getElementById('basket-header')

export const modalSnake = document.getElementById('modal-snake')
const snakeButton = document.getElementById('snake-button')
const snakeCross = document.getElementById('cross-snake')
const snakeHeader = document.getElementById('snake-header')

export const modalRebus = document.getElementById('modal-rebus')
const rebusButton = document.getElementById('rebus-button')
const rebusCross = document.getElementById('cross-rebus')
const rebusHeader = document.getElementById('rebus-header')


export const modalQuestion = document.getElementById('modal-question')
const questionButton = document.getElementById('question-button')
const questionCross = document.getElementById('cross-question')
const questionHeader = document.getElementById('question-header')

export const modalLotPresent = document.getElementById('modal-lotPresent')
const lotPresentButton = document.getElementById('lotPresent-button')
const lotPresentCross = document.getElementById('cross-lotPresent')
const lotPresentHeader = document.getElementById('lotPresent-header')

export const modalLast = document.getElementById('modal-last')
const lastButton = document.getElementById('last-button')
const lastCross = document.getElementById('cross-last')
const lastHeader = document.getElementById('last-header')

export const modalPresent2 = document.getElementById('modal-present2')
const present2Button = document.getElementById('present2-button')
const present2Cross = document.getElementById('cross-present2')
const present2Header = document.getElementById('present2-header')



const modals = document.querySelectorAll('.modal')



export function checkModalState() {
    if (snakeState.gameWin === true) {
        modalState.game['modal-snake'] = null;
        return updateTaskStateBasedOnGame()
    }

    if (rebusState.gameWin === true) {
        modalState.game['modal-rebus'] = null;
        return updateTaskStateBasedOnGame()
    }

    if (questionState.gameWin === true) {
        modalState.game['modal-question'] = null;
        return updateTaskStateBasedOnGame()
    }

    if (lotPresentState.gameWin === true) {
        modalState.game['modal-lotPresent'] = null;
        return updateTaskStateBasedOnGame()
    }

    if (lastState.gameWin === true) {
        modalState.game['modal-last'] = null;
        return updateTaskStateBasedOnGame()
    }
}



function modalManager(icon, modal, cross) {

    icon.addEventListener('click', (event) => {

        if (modalState.game[modal.id] === null) {
            console.log(`Открытие модального окна ${modal.id} запрещено.`);
            return;
        }

        if (modal.style.display === 'none') {

            modal.style.display = 'block'
            modalState[modal.id] = true
            bringToFront(modal);

        } else {

            modal.style.display = 'none'
            modalState[modal.id] = false
        }
    })


    cross.addEventListener('click', (event) => {

        if (modalState[modal.id] === true) {
            modal.style.display = 'none'
            modalState[modal.id] = false
        }
    })
}

modalManager(iconPresent, modalPresent, presentCross)
modalManager(iconComputer, modalComputer, computerCross)
modalManager(iconDirectory, modalDirectory, directoryCross)
modalManager(iconBasket, modalBasket, basketCross)

modalManager(snakeButton, modalSnake, snakeCross)
modalManager(rebusButton, modalRebus, rebusCross)
modalManager(questionButton, modalQuestion, questionCross)
modalManager(lotPresentButton, modalLotPresent, lotPresentCross)
modalManager(lastButton, modalLast, lastCross)
modalManager(present2Button, modalPresent2, present2Cross)





function makeDraggable(modal, header) {

    let offsetX, offsetY;


    header.addEventListener('mousedown', (event) => {

        event.preventDefault();

        bringToFront(modal);
        offsetX = event.clientX - modal.offsetLeft;
        offsetY = event.clientY - modal.offsetTop;

        function mouseMoveHandler(event) {
            modal.style.left = `${event.clientX - offsetX}px`;
            modal.style.top = `${event.clientY - offsetY}px`;
        }

        function mouseUpHandler() {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });

    modal.addEventListener('mousedown', (event) => {
        // Пропускаем событие, если клик был на инпуте или других интерактивных элементах
        if (event.target.tagName === 'INPUT' ||
            event.target.tagName === 'BUTTON' ||
            event.target.tagName === 'SELECT' ||
            event.target.tagName === 'TEXTAREA') {
            return;
        }

        event.preventDefault();
        bringToFront(modal);
    });
}

makeDraggable(modalPresent, presentHeader)
makeDraggable(modalComputer, computerHeader)
makeDraggable(modalDirectory, directoryHeader)
makeDraggable(modalBasket, basketHeader)

makeDraggable(modalSnake, snakeHeader)
makeDraggable(modalRebus, rebusHeader)
makeDraggable(modalQuestion, questionHeader)
makeDraggable(modalLotPresent, lotPresentHeader)
makeDraggable(modalLast, lastHeader)
makeDraggable(modalPresent2, present2Header)



function bringToFront(modal) {
    let highestZIndex = 0;

    modals.forEach(m => {
        const zIndex = parseInt(window.getComputedStyle(m).zIndex);
        if (!isNaN(zIndex) && zIndex > highestZIndex) {
            highestZIndex = zIndex;
        }
    });
    modal.style.zIndex = `${highestZIndex + 1}`;
}


export function closeModal(modal) {
    modalState.game[modal.id] = null
    return modal.style.display = 'none'
}


checkModalState()