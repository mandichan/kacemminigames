var randomInt;

function generateRandomNumber() {
    randomInt = myfunction(1, 100);
    console.log(randomInt);
    var randomNumberMessageElement = document.getElementById('randomNumberMessage');
    randomNumberMessageElement.textContent = 'Random number has been picked! Now, make a guess.';
}

function compareNumbers() {
    var userInput = parseInt(document.getElementById('userInput').value);
    var countElement = document.getElementById('count');
    var resultMessageElement = document.getElementById('resultMessage');
    var randomNumberMessageElement = document.getElementById('randomNumberMessage');

    if (isNaN(userInput)) {
        resultMessageElement.textContent = 'Please enter a valid number.';
    } else {
        countElement.textContent = parseInt(countElement.textContent) + 1;

        if (userInput === randomInt) {
            resultMessageElement.textContent = 'Congratulations! You guessed the correct number!';
            resultMessageElement.classList.add('celebrate'); // Add the celebrate class
            setTimeout(function () {
                // Reset the game
                generateRandomNumber();
                countElement.textContent = '1';
                resultMessageElement.textContent = 'The number is smaller';
                randomNumberMessageElement.textContent = ''; // Clear the random number message
                document.getElementById('userInput').value = ''; // Clear the input field
                resultMessageElement.classList.remove('celebrate'); // Remove the celebrate class
            }, 2500); // Adjust the delay as needed
        } else if (userInput < randomInt) {
            resultMessageElement.textContent = 'Too small! Try again.';
        } else {
            resultMessageElement.textContent = 'Too large! Try again.';
        }
    }
}

function myfunction(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}