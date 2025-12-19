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

// Export functional API for testing
function initializeBoard() {
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

function validateMove(board, move, player) {
  const { from, to } = move;
  const [startRow, startCol] = from;
  const [endRow, endCol] = to;

  // Check if end position is valid
  if (
    endRow < 0 ||
    endRow >= 8 ||
    endCol < 0 ||
    endCol >= 8 ||
    board[endRow][endCol] !== null
  ) {
    return false;
  }

  // Check if there's a piece at start position
  const piece = board[startRow][startCol];
  if (!piece) {
    return false;
  }

  // Map player to piece color
  const playerPiece = player === "player1" ? "b" : "w";
  if (piece.toLowerCase()[0] !== playerPiece) {
    return false;
  }

  // Determine movement direction
  const direction = playerPiece === "w" ? -1 : 1;

  // Check for regular move (1 square diagonally)
  if (
    endRow === startRow + direction &&
    Math.abs(endCol - startCol) === 1
  ) {
    return true;
  }

  // Check for jump move (2 squares diagonally, jumping over opponent)
  if (
    endRow === startRow + 2 * direction &&
    Math.abs(endCol - startCol) === 2
  ) {
    const jumpedRow = startRow + direction;
    const jumpedCol = startCol + (endCol - startCol) / 2;
    const jumpedPiece = board[jumpedRow][jumpedCol];
    
    if (jumpedPiece && jumpedPiece.toLowerCase()[0] !== playerPiece) {
      return true;
    }
  }

  return false;
}

function makeMove(board, move, player) {
  if (!validateMove(board, move, player)) {
    return board; // Return unchanged board for invalid moves
  }

  // Create a deep copy of the board
  const newBoard = board.map(row => [...row]);
  
  const { from, to } = move;
  const [startRow, startCol] = from;
  const [endRow, endCol] = to;

  // Move the piece
  newBoard[endRow][endCol] = newBoard[startRow][startCol];
  newBoard[startRow][startCol] = null;

  // Remove jumped piece if it was a jump move
  if (Math.abs(endRow - startRow) === 2) {
    const jumpedRow = startRow + (endRow - startRow) / 2;
    const jumpedCol = startCol + (endCol - startCol) / 2;
    newBoard[jumpedRow][jumpedCol] = null;
  }

  // Check for promotion (convert to king)
  const playerPiece = player === "player1" ? "b" : "w";
  if (endRow === 0 && playerPiece === "w") {
    newBoard[endRow][endCol] = "W";
  } else if (endRow === 7 && playerPiece === "b") {
    newBoard[endRow][endCol] = "B";
  }

  return newBoard;
}

// Export for CommonJS (Jest)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CheckersGame,
    initializeBoard,
    validateMove,
    makeMove
  };
}

// Run the game if executed directly
if (require.main === module) {
  const game = new CheckersGame();
  game.printBoard();
}