const board = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// 點擊格子處理遊戲邏輯
function handleCellClick(index) {
    if (gameBoard[index] !== '' || !gameActive) return;
    gameBoard[index] = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase());
    checkGameStatus();
    switchPlayer();
}

// 切換玩家
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `玩家 ${currentPlayer} 的回合`;
}

// 檢查遊戲狀態（勝利或平局）
function checkGameStatus() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            status.textContent = `玩家 ${currentPlayer} 勝利！`;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        status.textContent = '平局！';
    }
}

// 重置遊戲
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = `玩家 ${currentPlayer} 的回合`;
    cells.forEach(cell => cell.classList.remove('x', 'o'));
}

// 綁定事件
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);
