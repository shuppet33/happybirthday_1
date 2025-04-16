/**
 * Создает эффект разлета конфетти из боков элемента
 * @param {HTMLElement} element - HTML-элемент, из боков которого будет разлет
 */
export function confettiFromSides(element) {
    // Получаем позицию и размеры элемента
    const rect = element.getBoundingClientRect();

    // Создаем контейнер для конфетти
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);

    // Настройки конфетти
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const particleCount = 60; // Количество частиц с каждой стороны

    // Создаем частицы для левой стороны
    for (let i = 0; i < particleCount; i++) {
        createParticle(
            rect.left - 5, // X: 5px слева от элемента
            rect.top + Math.random() * rect.height, // Y: случайная позиция по высоте
            -1, // Направление: влево
            confettiContainer,
            colors
        );
    }



    // Создаем частицы для правой стороны
    for (let i = 0; i < particleCount; i++) {
        createParticle(
            rect.right + 5, // X: 5px справа от элемента
            rect.top + Math.random() * rect.height, // Y: случайная позиция по высоте
            1, // Направление: вправо
            confettiContainer,
            colors
        );
    }

    // Удаляем контейнер через 2 секунды
    setTimeout(() => {
        confettiContainer.remove();
    }, 2000);
}

/**
 * Создает одну частицу конфетти
 */
function createParticle(startX, startY, direction, container, colors) {
    const particle = document.createElement('div');
    const size = 6 + Math.random() * 6; // Размер от 6 до 12px

    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;

    container.appendChild(particle);

    // Параметры анимации
    const duration = 1000 + Math.random() * 2000; // 1-4 секунды
    const distanceX = 100 + Math.random() * 300; // Горизонтальная дистанция
    const distanceY = -50 + Math.random() * 200; // Вертикальная дистанция

    // Анимация
    particle.animate([
        {
            transform: 'translate(0, 0) rotate(0deg)',
            opacity: 1
        },
        {
            transform: `translate(
        ${direction * distanceX}px, 
        ${distanceY}px
      ) rotate(${direction * 360}deg)`,
            opacity: 0
        }
    ], {
        duration: duration,
        easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)',
        fill: 'forwards'
    });

    // Удаление после анимации
    setTimeout(() => particle.remove(), duration);
}