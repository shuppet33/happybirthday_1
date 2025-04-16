import {taskState, modalState, questionState, rebusState} from "./stateAll.js";
import {updateTaskStateBasedOnGame} from "./taskGroup.js";
import {confettiFromSides} from "./confetti.js";
import {checkModalState, closeModal, modalQuestion, modalRebus} from "./modalManager.js";

const password = 'сказка о зимнем вечере'

const inputQuestion = document.getElementById('input-question')


window.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        const inputAnswer = inputQuestion.value

        if (inputAnswer === password) {
            const contentQuestion = document.getElementById('modal-content-question')
            contentQuestion.innerHTML = `
                    <div class="secret-code">
                    7
                    </div>
            `

            questionState.gameWin = true;
            modalState.game['modal-question'] = null

            confettiFromSides(modalQuestion)

            return checkModalState()
        } else {
            passwordError()
        }
    }
})

function passwordError() {
    inputQuestion.classList.add("bounce");

    setTimeout(function() {
        inputQuestion.classList.remove("bounce");
    }, 1000);
}