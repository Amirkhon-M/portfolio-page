document.addEventListener('DOMContentLoaded', () => {
    const terminalBody = document.getElementById('terminalBody');
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const playAgainButton = document.getElementById('playAgainButton');

    let secretNumber;
    let attempts;
    const maxAttempts = 10;

    function newGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        terminalBody.innerHTML = '<p class="ai-message">[A.I. ONLINE] Well, well. A curious human. You\'ve stumbled upon my secret challenge. I have selected a number between 1 and 100. Can you guess it?</p>';
        guessInput.disabled = false;
        guessButton.disabled = false;
        guessInput.value = '';
        playAgainButton.style.display = 'none';
        guessInput.focus();
    }

    function addMessage(message, sender = 'ai') {
        const messageElement = document.createElement('p');
        const prefix = sender === 'ai' ? '[A.I.] ' : '[USER] ';
        messageElement.textContent = prefix + message;
        messageElement.classList.add(sender === 'ai' ? 'ai-message' : 'user-message');
        terminalBody.appendChild(messageElement);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function handleGuess() {
        const userGuess = parseInt(guessInput.value);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            addMessage('Invalid input. Please enter a number between 1 and 100.');
            guessInput.value = '';
            return;
        }

        addMessage(userGuess, 'user');
        attempts++;

        if (userGuess === secretNumber) {
            addMessage(`Correct! You guessed the number in ${attempts} attempts. You are a worthy opponent. Not many find this place. You are one of the few.`);
            endGame();
        } else if (attempts >= maxAttempts) {
            addMessage(`You have failed to guess the number in ${maxAttempts} attempts. The number was ${secretNumber}. You are not as clever as you think.`);
            endGame();
        } else if (userGuess < secretNumber) {
            addMessage('Higher.');
        } else {
            addMessage('Lower.');
        }

        guessInput.value = '';
        guessInput.focus();
    }

    function endGame() {
        guessInput.disabled = true;
        guessButton.disabled = true;
        playAgainButton.style.display = 'block';
    }

    guessButton.addEventListener('click', handleGuess);
    guessInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            handleGuess();
        }
    });

    playAgainButton.addEventListener('click', newGame);

    newGame();
});
