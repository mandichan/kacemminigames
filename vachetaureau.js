let secretCode;
let attempts = [];

function startGame() {
  // Hide the first page
  document.getElementById('game-container').style.display = 'none';

  // Display the second page
  document.getElementById('game-content').style.display = 'block';
}

function generateRandomNumber() {
  secretCode = generateSecretCode();
  document.getElementById('randomNumberMessage').textContent = 'Random number has been picked. Ready to guess!';
  enableInputAndButton();
}

function generateSecretCode() {
  const uniqueDigits = Array.from({ length: 9 }, (_, i) => i + 1).sort(() => Math.random() - 0.5).slice(0, 3);
  return uniqueDigits.join('');
}

function checkGuess() {
  const guessInput = document.getElementById('guessInput');
  const guess = guessInput.value;

  if (isValidInput(guess)) {
    const result = evaluateGuess(guess);
    displayFeedback(result, guess);

    if (result.includes('3 taureaux')) {
      disableInputAndButton();
    }

    guessInput.value = '';
  } else {
    alert('Please enter a valid 3-digit number.');
  }
}

function enableInputAndButton() {
  const guessInput = document.getElementById('guessInput');
  const guessButton = document.getElementById('submitGuess');

  guessInput.disabled = false;
  guessButton.disabled = false;
}

function disableInputAndButton() {
  const guessInput = document.getElementById('guessInput');
  const guessButton = document.getElementById('submitGuess');

  guessInput.disabled = true;
  guessButton.disabled = true;
}

function isValidInput(input) {
  return /^\d{3}$/.test(input);
}

function evaluateGuess(guess) {
  let vacheCount = 0;
  let taureauCount = 0;

  for (let i = 0; i < 3; i++) {
    const guessDigit = parseInt(guess[i]);
    const secretDigit = parseInt(secretCode.toString()[i]);

    if (guessDigit === secretDigit) {
      taureauCount++;
    } else if (secretCode.toString().includes(guessDigit.toString())) {
      vacheCount++;
    }
  }

  return `${vacheCount} vaches, ${taureauCount} taureaux`;
}

function displayFeedback(result, guess) {
  const feedbackElement = document.getElementById('feedback');

  // Save the current attempt
  attempts.push({ guess, result });

  // Display all attempts
  feedbackElement.innerHTML = 'Attempts:<br>';
  for (const attempt of attempts) {
    feedbackElement.innerHTML += `Attempt ${attempts.indexOf(attempt) + 1}: ${attempt.guess} - ${attempt.result}<br>`;
  }

  if (result.includes('3 taureaux')) {
    feedbackElement.style.color = 'green';
    feedbackElement.innerHTML += `<br>Congratulations! You guessed the number.`;
  } else {
    feedbackElement.style.color = 'black'; // Reset color for other attempts
  }
}