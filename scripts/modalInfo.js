/**
 * @param {string} message - Текст сообщения
 * @param {number} [duration=2000] - Время показа в миллисекундах (по умолчанию 2 секунды)
 * @param {string} [type='info'] - Тип модалки (для стилей): 'info', 'success', 'error'
 */

export function showTemporaryModal(message, duration = 2000, type = 'info') {
    // Создаем элементы модалки
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const messageElement = document.createElement('p');


    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease';
    modal.style.zIndex = '1000';


    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '0px';
    modalContent.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    modalContent.style.maxWidth = '80%';
    modalContent.style.textAlign = 'center';


    modalContent.classList.add(`modal-${type}`);


    messageElement.textContent = message;
    messageElement.style.margin = '0';
    messageElement.style.fontSize = '30px';
    messageElement.style.color = '#31322D';


    modalContent.appendChild(messageElement);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);


    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);


    setTimeout(() => {
        modal.style.opacity = '0';


        setTimeout(() => {
            modal.remove();
        }, 300);
    }, duration);
}
