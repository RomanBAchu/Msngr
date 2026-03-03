document.addEventListener('DOMContentLoaded', function () {
    const userInput = document.getElementById('userInput');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const messagesDiv = document.getElementById('messages');

    // Обработчик кнопки отправки
    sendBtn.addEventListener('click', function () {
        sendMessage();
    });

    // Отправка по нажатию Enter (без Shift)
    messageInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const userName = userInput.value.trim() || 'Гость';
        const message = messageInput.value.trim();

        if (message) {
            // Получаем текущее время
            const now = new Date();
            const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

            // Создаём элемент сообщения
            const messageElement = document.createElement('div');
            messageElement.className = 'message user-message';
            messageElement.innerHTML = `
                <div class="message-content">${message}</div>
                <div class="message-time">${userName}, ${timeString}</div>
            `;

            // Добавляем в окно сообщений
            messagesDiv.appendChild(messageElement);

            // Очищаем поле ввода
            messageInput.value = '';

            // Сбрасываем высоту textarea до минимальной
            resetTextareaHeight();

            // Прокручиваем вниз к последнему сообщению
            messagesDiv.scrollTop = messagesDiv.scrollHeight;

            // Автофокус на поле ввода сообщения
            messageInput.focus();
        }
    }

    // Функция сброса высоты textarea
    function resetTextareaHeight() {
        messageInput.style.height = 'auto';
        messageInput.style.height = (messageInput.scrollHeight) + 'px';
    }

    // Автоподстройка высоты textarea при вводе
    messageInput.addEventListener('input', function () {
        resetTextareaHeight();
    });

    // Автофокус на поле имени при загрузке
    userInput.focus();

    // Инициализируем высоту textarea при загрузке
    resetTextareaHeight();
});
