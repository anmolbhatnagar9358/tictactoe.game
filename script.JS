const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');
const startButton = document.getElementById('start');
let currentPlayer = 'X';
let gameActive = false;
let boardState = ['', '', '', '', '', '', '', '', ''];

const changeBackground = () => {
    const backgrounds = [
        'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        'linear-gradient(135deg, #ff7e5f, #feb47b)',
        'linear-gradient(135deg, #ff6a00, #ee0979)',
        'linear-gradient(135deg, #00b4db, #0083b0)',
        'linear-gradient(135deg, #00c6ff, #0072ff)'
    ];
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    document.body.style.background = backgrounds[randomIndex];
};

const checkWinner = () => {
    const winningPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            statusDisplay.textContent = `${boardState[a]} wins!`;
            resetButton.style.display = 'inline-block'; // Show restart button
            return;
        }
    }

    if (!boardState.includes('')) {
        gameActive = false;
        statusDisplay.textContent = 'It\'s a draw!';
        resetButton.style.display = 'inline-block'; // Show restart button
    }
};

const cellClick = (e) => {
    const clickedCell = e.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    if (boardState[clickedIndex] || !gameActive) return;

    boardState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    checkWinner();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const resetGame = () => {
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = '';
    resetButton.style.display = 'none'; // Hide the restart button
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    changeBackground(); // Change the background color when a new game starts
};

const startGame = () => {
    gameActive = true;
    startButton.style.display = 'none'; // Hide the Start button
    resetButton.style.display = 'none'; // Hide the restart button
    document.querySelector('.board').style.display = 'grid'; // Show the board
    statusDisplay.textContent = "Player X's turn"; // Display starting message
    changeBackground(); // Change background on start
};

cells.forEach(cell => cell.addEventListener('click', cellClick));

// Set initial background
changeBackground();
