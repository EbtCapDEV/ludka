let userBalance = 100;  // Баланс пользователя
let totalBalance = 0;   // Общий баланс
let timerInterval = null;  // Интервал для таймера
let remainingTime = 60;     // Время оставшееся на таймере
let lastUser = null;       // Хранение информации о последнем пользователе, который нажал кнопку

// Функция для обновления балансов на экране
function updateBalances() {
    document.getElementById("user-balance").textContent = `Ваш баланс: ${userBalance}`;
    document.getElementById("total-balance").textContent = `Общий баланс: ${totalBalance}`;
}

// Функция для обработки нажатия на кнопку
function handleButtonClick() {
    if (userBalance > 0) {
        userBalance -= 1;      // Списываем 1 очко с баланса пользователя
        totalBalance += 1;     // Добавляем 1 очко в общий баланс
        updateBalances();      // Обновляем отображаемые балансы

        lastUser = userBalance;  // Запоминаем, кто нажал кнопку (пользователь)

        resetTimer();          // Сброс и перезапуск таймера
    } else {
        alert("У вас недостаточно очков!");
    }
}

// Функция для сброса и перезапуска таймера
function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);  // Останавливаем предыдущий таймер
    }
    remainingTime = 60;  // Устанавливаем время таймера на 60 секунд
    updateTimerDisplay();  // Обновляем отображение времени на кнопке

    // Устанавливаем новый интервал для отсчета
    timerInterval = setInterval(function() {
        remainingTime--;
        updateTimerDisplay();  // Обновляем отображение времени

        if (remainingTime <= 0) {
            clearInterval(timerInterval);  // Останавливаем таймер
            updateTimerDisplay();  // Обновляем отображение времени по завершению

            // После окончания таймера назначаем банк последнему пользователю, который нажал кнопку
            if (lastUser !== null) {
                alert(`Банк раунда забирает последний пользователь! Баланс пользователя ${lastUser}`);
                // Добавляем весь банк раунда пользователю
                userBalance += totalBalance;
                totalBalance = 0;  // Обнуляем общий баланс
                updateBalances();  // Обновляем балансы
            }
        }
    }, 1000);  // Обновляем каждую секунду
}

// Функция для обновления отображения времени на кнопке
function updateTimerDisplay() {
    const timerElement = document.getElementById("timer");
    if (remainingTime > 0) {
        timerElement.textContent = `${remainingTime} с`;
    } else {
        timerElement.textContent = "Раунд завершён!";
    }
}

// Инициализация балансов
updateBalances();
