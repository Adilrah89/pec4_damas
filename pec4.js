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