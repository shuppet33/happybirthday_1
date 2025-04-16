import {showTemporaryModal} from "./modalInfo.js";

const buttonYes = document.getElementById('button-yes')
const buttonNo = document.getElementById('button-no')

buttonYes.addEventListener('click', () => showTemporaryModal(`Ищи фиолетовые циферки!`, 4000, 'success'))