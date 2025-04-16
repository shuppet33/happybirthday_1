import {modalState, taskState, rebusState, snakeState} from "./stateAll.js";
import {checkModalState, closeModal, modalRebus} from "./modalManager.js";
import {confettiFromSides} from "./confetti.js";
import  {updateTaskStateBasedOnGame} from './taskGroup.js'

const rebusAnswer = {
    'rebus-1': 'шутка',
    'rebus-2': 'гроза',
    'rebus-3': 'икота',
    'rebus-4': 'водитель',
    'rebus-5': 'рисование',
};


const slidesRebus = document.querySelectorAll('.slide-rebus');
const rebusInputs = [
    document.getElementById('rebus-1'),
    document.getElementById('rebus-2'),
    document.getElementById('rebus-3'),
    document.getElementById('rebus-4'),
    document.getElementById('rebus-5')
];

let currentRebus = 0;


function initRebus() {
    slidesRebus.forEach((slide, index) => {
        slide.style.display = index === 0 ? 'flex' : 'none';
    });
}
initRebus();


function nextRebus() {

    slidesRebus[currentRebus].style.display = 'none';

    currentRebus = Math.min(currentRebus + 1, slidesRebus.length - 1);

    slidesRebus[currentRebus].style.display = 'flex';

    if (rebusInputs[currentRebus]) {
        rebusInputs[currentRebus].value = '';
    }
}

function checkAnswer(inputValue, correctAnswer) {
    if (!inputValue || typeof inputValue !== 'string') return false;

    const normalizedInput = inputValue[0].toLowerCase() + inputValue.slice(1);
    return normalizedInput === correctAnswer;
}

window.addEventListener('keydown', rebusCheck);


function rebusCheck(event) {

    if (rebusState.gameWin) {
        return
    }

    if (event.code === 'Enter') {
        const currentInput = rebusInputs[currentRebus];
        if (!currentInput) return;

        const userAnswer = currentInput.value
        const currentAnswerKey = `rebus-${currentRebus + 1}`;

        if (checkAnswer(userAnswer, rebusAnswer[currentAnswerKey])) {
            if (currentRebus < slidesRebus.length - 1) {
                confettiFromSides(modalRebus)
                nextRebus();
            } else {
                rebusState.gameWin = true;
                modalState.game['modal-rebus'] = null


                let contentRebus = document.getElementById('modal-content-rebus')
                contentRebus.innerHTML = `        
                            <div class="game-win">
                                <h2>WIN!</h2>
                                <button id="close-modal-rebus">Закрыть</button>
                            </div>
                `

                confettiFromSides(modalRebus)
                document.getElementById('close-modal-rebus').addEventListener('click', () => closeModal(modalRebus))

                return checkModalState()
            }

        } else {
            inputError()
        }

    }
}


function inputError() {
    const currentRebusError =  rebusInputs[currentRebus];

    currentRebusError.classList.add("bounce");

    setTimeout(function() {
        currentRebusError.classList.remove("bounce");
    }, 1000);

}


