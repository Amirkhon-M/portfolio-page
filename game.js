document.addEventListener('DOMContentLoaded', () => {
    const terminalBody = document.getElementById('terminalBody');
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const playAgainButton = document.getElementById('playAgainButton');

    let secretNumber;
    let attempts;

    function newGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        terminalBody.innerHTML = '<p class="ai-message">[A.I. ONLINE] I have selected a number between 1 and 100. Can you guess it, human?</p>';
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
            addMessage(`Correct! You guessed the number in ${attempts} attempts. You are a worthy opponent.`);
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