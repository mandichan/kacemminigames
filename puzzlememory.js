document.addEventListener('DOMContentLoaded', function () {
    const cardValues = ['./ala.jpg', './aziz.jpg', './bouza.jpg', './chatti.jpg', './chikh.jpg', './hama.jpg', './louay.jpg', './yahya.jpg', './ala.jpg', './aziz.jpg', './bouza.jpg', './chatti.jpg', './chikh.jpg', './hama.jpg', './louay.jpg', './yahya.jpg'];
    let cards = [];

    // Shuffle the cards
    cardValues.sort(() => Math.random() - 0.5);

    const memoryGame = document.querySelector('.memory-game');
    const firstPage = document.getElementById('first-page');
    const memoryGameContainer = document.getElementById('memory-game-container');
    const playButton = document.getElementById('play-button');

    // Create and append cards to the grid
    cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.innerHTML = `<span class="hidden"><img src="${value}" alt="Card Image"></span>`;
        card.addEventListener('click', flipCard);
        memoryGame.appendChild(card);
        cards.push(card);
    });

    let flippedCards = [];
    let lockBoard = false;

    playButton.addEventListener('click', startGame);

    function startGame() {
        // Hide the first page
        firstPage.style.display = 'none';

        // Display the memory game container
        memoryGameContainer.style.display = 'grid';
    }

    function flipCard() {
        if (lockBoard) return;
        if (this.classList.contains('flipped')) return;

        this.classList.add('flipped');
        this.children[0].style.visibility = 'visible'; // Show the hidden span

        if (flippedCards.length === 0) {
            flippedCards.push(this);
        } else {
            flippedCards.push(this);
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.children[0].innerHTML === card2.children[0].innerHTML) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        setTimeout(() => {
            flippedCards.forEach(card => {
                card.removeEventListener('click', flipCard);
                card.classList.add('matched');
                card.style.visibility = 'hidden';
            });

            flippedCards = [];

            if (isGameComplete()) {
                alert('Congratulations! You found all the matches!');
            }
        }, 1000);
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.children[0].style.visibility = 'hidden'; // Hide the span
            });

            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }

    function isGameComplete() {
        return cards.every(card => card.style.visibility === 'hidden');
    }
});