document.addEventListener("DOMContentLoaded", () => {
    const pokeball = document.querySelector(".pokeball");
    const pokemons = document.querySelectorAll(".pokemon");
    const scoreElement = document.getElementById("score");
    const restartButton = document.getElementById("restartButton");
    let score = 0;
    let timeLeft = 30;
    let timerInterval;

    // Таймер
    const timerElement = document.createElement("div");
    timerElement.className = "timer";
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    document.body.appendChild(timerElement);

    // Запуск таймера
    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Time Left: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }

    // Завершення гри
    function endGame() {
        // Приховуємо всі елементи гри
        pokemons.forEach((pokemon) => (pokemon.style.display = "none"));
        pokeball.style.display = "none";
        timerElement.style.display = "none";

        // Створюємо блок результату
        const resultElement = document.createElement("div");
        resultElement.className = "result";
        resultElement.innerHTML = `<h1>Game Over!</h1><p>Your Score: ${score}</p>`;
        document.body.appendChild(resultElement);

        // Відображаємо кнопку перезапуску під результатами
        restartButton.style.display = "block";
        resultElement.appendChild(restartButton); // Додаємо кнопку до блоку результату
    }

    // Перезапуск гри
    function restartGame() {
        location.reload();
    }

    // Переміщення покебола за курсором
    document.addEventListener("mousemove", (e) => {
        pokeball.style.left = `${e.pageX}px`;
        pokeball.style.top = `${e.pageY}px`;
    });

    // Функція для випадкової позиції покемона
    function randomPosition(element) {
        const gameWidth = window.innerWidth;
        const gameHeight = window.innerHeight;

        const randomX = Math.random() * (gameWidth - element.offsetWidth);
        const randomY = Math.random() * (gameHeight - element.offsetHeight);

        element.style.left = `${randomX}px`;
        element.style.top = `${randomY}px`;
    }

    // Функція для руху покемонів
    function movePokemon(pokemon) {
        setInterval(() => {
            randomPosition(pokemon);
        }, 2000);
    }

    // Функція ловлі покемона
    function catchPokemon(pokemon) {
        pokeball.classList.add("pokeball-catching"); // Змінюємо вигляд покебола
        setTimeout(() => pokeball.classList.remove("pokeball-catching"), 500); // Повертаємо до стандартного вигляду

        pokemon.style.transition = "transform 0.5s, opacity 0.5s";
        pokemon.style.transform = "scale(0)";
        pokemon.style.opacity = "0";
        score++;
        scoreElement.textContent = score;

        setTimeout(() => {
            pokemon.style.transform = "scale(1)";
            pokemon.style.opacity = "1";
            randomPosition(pokemon);
        }, 1000); // Покемон з'являється через 1 секунду
    }

    // Ініціалізація покемонів
    pokemons.forEach((pokemon) => {
        randomPosition(pokemon);
        movePokemon(pokemon);
        pokemon.addEventListener("mouseenter", () => catchPokemon(pokemon));
    });

    // Додаємо слухач для кнопки перезапуску
    restartButton.addEventListener("click", restartGame);

    // Запускаємо таймер
    startTimer();
});
