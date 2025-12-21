class CheckersGame {
  constructor() {
    this.board = this.initializeBoard();
    this.currentPlayer = "white";
  }

  initializeBoard() {
    const board = [];
    for (let i = 0; i < 8; i++) {
      board[i] = new Array(8).fill(null);
    }

    // Place black pieces
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 1) {
          board[row][col] = "b";
        }
      }
    }

    // Place white pieces
    for (let row = 5; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 1) {
          board[row][col] = "w";
        }
      }
    }

    return board;
  }

  printBoard() {
    console.log(this.board.map(row => row.join(" ")).join("\n"));
  }

  isMoveValid(start, end) {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;

    if (
      endRow < 0 ||
      endRow >= 8 ||
      endCol < 0 ||
      endCol >= 8 ||
      this.board[endRow][endCol] !== null
    ) {
      return false;
    }

    const direction = this.currentPlayer === "white" ? -1 : 1;

    if (
      (endRow === startRow + direction &&
        Math.abs(endCol - startCol) === 1) ||
      (endRow === startRow + 2 * direction &&
        Math.abs(endCol - startCol) === 2 &&
        this.board[startRow + direction][startCol + (endCol - startCol) / 2] !==
          null &&
        this.board[startRow + direction][startCol + (endCol - startCol) / 2][0] !==
          this.currentPlayer[0])
    ) {
      return true;
    }

    return false;
  }

  makeMove(start, end) {
    if (!this.isMoveValid(start, end)) {
      console.log("Invalid move");
      return;
    }

    const [startRow, startCol] = start;
    const [endRow, endCol] = end;

    this.board[endRow][endCol] = this.board[startRow][startCol];
    this.board[startRow][startCol] = null;

    if (Math.abs(endRow - startRow) === 2) {
      this.board[startRow + (endRow - startRow) / 2][
        startCol + (endCol - startCol) / 2
      ] = null;
    }

    // Check for promotion
    if (endRow === 0 && this.currentPlayer === "white") {
      this.board[endRow][endCol] = "W";
    } else if (endRow === 7 && this.currentPlayer === "black") {
      this.board[endRow][endCol] = "B";
    }

    this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
  }
}

const game = new CheckersGame();
game.printBoard();

// Export standalone functions for testing
function initializeBoard() {
  const board = [];
  for (let i = 0; i < 8; i++) {
    board[i] = new Array(8).fill("empty");
  }

  // Place player1 pieces (in top rows 0-2)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = "player1";
      }
    }
  }

  // Place player2 pieces (in bottom rows 5-7)
  for (let row = 5; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = "player2";
      }
    }
  }

  return board;
}

function validateMove(board, move, player) {
  const { from, to } = move;
  const [startRow, startCol] = from;
  const [endRow, endCol] = to;

  // Check if positions are within bounds
  if (
    startRow < 0 || startRow >= 8 || startCol < 0 || startCol >= 8 ||
    endRow < 0 || endRow >= 8 || endCol < 0 || endCol >= 8
  ) {
    return false;
  }

  // Check if starting position has player's piece
  if (board[startRow][startCol] !== player) {
    return false;
  }

  // Check if ending position is empty
  if (board[endRow][endCol] !== "empty") {
    return false;
  }

  // Determine direction based on player
  const direction = player === "player1" ? 1 : -1;

  // Check for simple move (one diagonal step)
  if (
    endRow === startRow + direction &&
    Math.abs(endCol - startCol) === 1
  ) {
    return true;
  }

  // Check for capture move (two diagonal steps)
  if (
    endRow === startRow + 2 * direction &&
    Math.abs(endCol - startCol) === 2
  ) {
    const midRow = startRow + direction;
    const midCol = startCol + (endCol - startCol) / 2;
    const opponent = player === "player1" ? "player2" : "player1";
    
    // Check if there's an opponent piece to capture
    if (board[midRow][midCol] === opponent) {
      return true;
    }
  }

  return false;
}

function makeMove(board, move, player) {
  if (!validateMove(board, move, player)) {
    return board; // Return unchanged board if move is invalid
  }

  const { from, to } = move;
  const [startRow, startCol] = from;
  const [endRow, endCol] = to;

  // Create a copy of the board
  const newBoard = board.map(row => [...row]);

  // Move the piece
  newBoard[endRow][endCol] = newBoard[startRow][startCol];
  newBoard[startRow][startCol] = "empty";

  // Handle capture (remove captured piece)
  if (Math.abs(endRow - startRow) === 2) {
    const midRow = startRow + (endRow - startRow) / 2;
    const midCol = startCol + (endCol - startCol) / 2;
    newBoard[midRow][midCol] = "empty";
  }

  return newBoard;
}

module.exports = {
  initializeBoard,
  validateMove,
  makeMove
};