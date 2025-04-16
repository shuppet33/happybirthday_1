
// Состояние окон
export const modalState = {
    'modal-present': false,
    'modal-computer': false,
    'modal-directory': false,
    'modal-basket': false,
    game: {
        'modal-snake': false,
        'modal-rebus': false,
        'modal-question': false,
        'modal-lotPresent': false,
        'modal-last': false,
    }
};

// Состояния задач
export const taskState = {
    0: 'ready',
    1: 'lock',
    2: 'lock',
    3: 'lock',
    4: 'lock',
};

// Состояние игры Snake
export const snakeState = {
    gameWin: false,
};

// Состояние игры Rebus
export const rebusState = {
    gameWin: false,
};

// Состояние игры Question
export const questionState = {
    gameWin: false,
};

// Состояние игры lotPresent
export const lotPresentState = {
    gameWin: false,
};

// Состояние игры last
export const lastState = {
    gameWin: false,
};