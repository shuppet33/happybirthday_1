function setupDivsToOpenImagesWithDescriptions(divSelector, descriptionSelector = '.image-description') {
    const divs = document.querySelectorAll(divSelector);

    divs.forEach(div => {
        div.style.cursor = 'pointer';

        div.addEventListener('click', () => {

            const img = div.querySelector('img');
            const video = div.querySelector('video');
            const description = div.querySelector(descriptionSelector);

            if (img) {
                // Создаем модальное окно
                const modal = document.createElement('div');
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
                modal.style.display = 'flex';
                modal.style.flexDirection = 'column';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';
                modal.style.zIndex = '1000';
                modal.style.padding = '20px';
                modal.style.boxSizing = 'border-box';

                // Контейнер для изображения и описания
                const contentContainer = document.createElement('div');
                contentContainer.style.maxWidth = '90%';
                contentContainer.style.maxHeight = '90%';
                contentContainer.style.display = 'flex';
                contentContainer.style.flexDirection = 'column';
                contentContainer.style.alignItems = 'center';

                // Элемент изображения
                const modalImg = document.createElement('img');
                modalImg.src = img.src;
                modalImg.style.border = '5px solid #f0f0f0'
                modalImg.style.maxWidth = '100%';
                modalImg.style.maxHeight = '75vh';
                modalImg.style.objectFit = 'contain';

                // Элемент описания
                const modalDescription = document.createElement('div');
                modalDescription.style.color = '#31322d';
                modalDescription.style.marginTop = '20px';
                modalDescription.style.fontSize = '20px'
                modalDescription.style.textAlign = 'center';
                modalDescription.style.maxWidth = '600px';
                modalDescription.style.position = 'absolute';
                modalDescription.style.padding = '15px'
                modalDescription.style.bottom = '50px'
                modalDescription.style.backgroundColor = '#fff'

                if (video) {
                    modalImg.style.display = 'none'
                    //Элемент видео
                    const modalVideo = document.createElement('video');
                    modalVideo.src = video.currentSrc;
                    modalVideo.style.border = '5px solid #f0f0f0'
                    modalVideo.style.maxWidth = '100%';
                    modalVideo.style.height= '520px';
                    modalVideo.controls = true

                    contentContainer.appendChild(modalVideo);
                }

                if (description) {
                    modalDescription.textContent = description.textContent || description.innerText;
                } else {
                    modalDescription.textContent = ''; // Если описание не найдено
                }

                // Кнопка закрытия
                const closeBtn = document.createElement('img');
                closeBtn.src = './desktop-img/cross-photo.png'
                closeBtn.style.position = 'absolute';
                closeBtn.style.width = '40px'
                closeBtn.style.height = '40px'
                closeBtn.style.top = '20px';
                closeBtn.style.right = '20px';
                closeBtn.style.fontSize = '30px';
                closeBtn.style.color = 'white';
                closeBtn.style.background = 'none';
                closeBtn.style.border = 'none';
                closeBtn.style.cursor = 'pointer';

                // Собираем модальное окно
                contentContainer.appendChild(modalImg);
                contentContainer.appendChild(modalDescription);
                modal.appendChild(contentContainer);
                modal.appendChild(closeBtn);
                document.body.appendChild(modal);

                // Функция закрытия
                const closeModal = () => document.body.removeChild(modal);

                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeModal();
                });

                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        closeModal();
                    }
                });

                // Закрытие по ESC
                document.addEventListener('keydown', function escClose(e) {
                    if (e.key === 'Escape') {
                        closeModal();
                        document.removeEventListener('keydown', escClose);
                    }
                });
            }
        });
    });
}

setupDivsToOpenImagesWithDescriptions('.photo-box')


function initFileSystemNavigation() {
    // Собираем все страницы
    const pages = {};

    document.querySelectorAll('.page').forEach(page => {
        pages[page.id] = page;

        page.querySelectorAll('.icon').forEach(icon => {
            icon.addEventListener('click', function() {

                const targetPage = this.getAttribute('data-target');

                if (targetPage && pages[targetPage]) {
                    navigateTo(targetPage);
                }
            });
        });
    });

    // Элементы навигации
    const backBtn = document.getElementById('back-btn');
    const forwardBtn = document.getElementById('forward-btn');

    // История навигации
    let history = ['page-1'];
    let currentIndex = 0;

    // Функция перехода
    function navigateTo(pageId, isInitial = false) {

        if (history[currentIndex]) {
            pages[history[currentIndex]].style.display = 'none';
        }



        pages[pageId].style.display = 'flex';


        if (!isInitial) {
            if (currentIndex < history.length - 1) {
                history = history.slice(0, currentIndex + 1);
            }

            history.push(pageId);
            currentIndex++;
        }

        updateNavButtons();
    }


    function goBack() {
        if (currentIndex > 0) {
            pages[history[currentIndex]].style.display = 'none';
            currentIndex--;
            pages[history[currentIndex]].style.display = 'flex';
            updateNavButtons();
        }
    }


    function goForward() {
        if (currentIndex < history.length - 1) {
            pages[history[currentIndex]].style.display = 'none';
            currentIndex++;
            pages[history[currentIndex]].style.display = 'flex';
            updateNavButtons();
        }
    }

    // Обновление состояния кнопок
    function updateNavButtons() {
        backBtn.disabled = currentIndex <= 0;
        forwardBtn.disabled = currentIndex >= history.length - 1;
    }

    // Назначаем обработчики на кнопки
    backBtn.addEventListener('click', goBack);
    forwardBtn.addEventListener('click', goForward);

    // Инициализация - находим первую видимую страницу
    const initialPage = document.querySelector('.page:not([style*="display: none"])').id;
    navigateTo(initialPage, true);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initFileSystemNavigation);