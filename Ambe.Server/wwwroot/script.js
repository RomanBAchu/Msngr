let connection;

function connectToHub() {
    const hubUrl = window.location.origin + "/chathub";

    console.log("Пытаюсь подключиться к:", hubUrl);

    connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection.on("ReceiveMessage", (user, message) => {
        const msgDiv = document.createElement("div");
        msgDiv.innerHTML = `<b>[${new Date().toLocaleTimeString()}] ${user}:</b> ${message}`;
        document.getElementById("messages").appendChild(msgDiv);
        document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
    });

    connection.on("UserJoined", (connectionId) => {
        console.log("К нам зашел новый бро: " + connectionId);
    });

    connection.onclose(() => {
        console.log("Соединение потеряно. Будет попытка переподключения...");
    });

    connection.start()
        .then(() => {
            console.log("Успешно подключились к серверу!");
        })
        .catch(err => {
            console.error("Критическая ошибка подключения:", err);
        });
}

function sendTestMessage() {
    const userInput = document.getElementById("userInput");
    const messageInput = document.getElementById("messageInput");

    const user = userInput.value.trim();
    const message = messageInput.value.trim();

    if (!user) {
        userInput.classList.add("error-input");
        alert("Сначала введите своё имя!");
        return;
    }

    userInput.classList.remove("error-input");

    if (!message) {
        alert("Введите сообщение!");
        return;
    }

    if (connection && connection.state === signalR.HubConnectionState.Connected) {
        connection.invoke("SendMessage", user, message)
            .catch(err => console.error("Ошибка отправки:", err));
        messageInput.value = "";
    } else {
        alert("Соединение с сервером потеряно. Попробуйте перезагрузить страницу.");
    }
}

// Запуск при загрузке
window.onload = () => {
    connectToHub();
    // Привязываем функцию к кнопке
    document.getElementById("sendBtn").onclick = sendTestMessage;
};
