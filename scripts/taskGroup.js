
import { taskState, modalState } from './stateAll.js';

const taskGroup = document.querySelectorAll('.task');


export function checkTaskState() {

    for (let number in taskState) {

        if (taskState[number] === 'ready') {
            taskGroup[number].classList.remove('task-lock')
            taskGroup[number].classList.add('task-ready')

            taskGroup[number].childNodes[1].style.display = 'block'
            taskGroup[number].childNodes[3].style.display = 'none'
        }

        if (taskState[number] === 'win') {
            taskGroup[number].classList.remove('task-ready')
            taskGroup[number].classList.add('task-win')

            taskGroup[number].childNodes[1].style.display = 'none'
            taskGroup[number].childNodes[3].style.display = 'none'
            taskGroup[number].childNodes[5].style.display = 'block'
        }

    }
}

export function updateTaskStateBasedOnGame() {
    if (modalState.game['modal-snake'] === null) {
        taskState[0] = 'win';
        taskState[1] = 'ready';

        setTimeout(checkTaskState, 2500)
    }

    if (modalState.game['modal-rebus'] === null) {
        taskState[1] = 'win';
        taskState[2] = 'ready';

        setTimeout(checkTaskState, 2500)
    }

    if (modalState.game['modal-question'] === null) {
        taskState[2] = 'win';
        taskState[3] = 'ready';

        setTimeout(checkTaskState, 2500)
    }

    if (modalState.game['modal-lotPresent'] === null) {
        taskState[3] = 'win';
        taskState[4] = 'ready';

        setTimeout(checkTaskState, 2500)
    }

    if (modalState.game['modal-last'] === null) {
        taskState[4] = 'win';

        setTimeout(checkTaskState, 2500)
    }
}



checkTaskState()
updateTaskStateBasedOnGame()



