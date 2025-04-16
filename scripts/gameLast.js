import {checkModalState, closeModal, modalLast, modalQuestion} from "./modalManager.js";
import {lastState, modalState, questionState} from "./stateAll.js";
import {confettiFromSides} from "./confetti.js";
import {showTemporaryModal} from "./modalInfo.js"

const buttonLast = document.getElementById('close-modal-rebus')

buttonLast.addEventListener('click', checkLast)

function checkLast() {
    if (lastState.gameWin) {
        return
    }

    closeModal(modalLast)

    lastState.gameWin = true;
    modalState.game['modal-last'] = null

    confettiFromSides(modalQuestion)

    showTemporaryModal(`Циферки нашли! Но... Куда их вводить?`, 3500, 'success');

    return checkModalState()
}


