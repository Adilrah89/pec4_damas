// pec4.test.js

const { initializeBoard, validateMove, makeMove } = require('./path/to/checkers.js');

describe("Checkers Game Tests", () => {

    test("should initialize board correctly", () => {
        const board = initializeBoard();
        expect(board).toBeInstanceOf(Array);
        expect(board.length).toBe(8);
        expect(board[0][1]).toMatch(/player1|empty/); // Example test
    });

    test("should validate a legal move for a player", () => {
        const board = initializeBoard();
        const move = { from: [2, 3], to: [3, 4] };
        const isValid = validateMove(board, move, "player1");
        expect(isValid).toBe(true);
    });

    test("should reject an illegal move", () => {
        const board = initializeBoard();
        const move = { from: [2, 3], to: [5, 5] };
        const isValid = validateMove(board, move, "player1");
        expect(isValid).toBe(false);
    });

    test("should make a legal move and update board", () => {
        let board = initializeBoard();
        const move = { from: [2, 3], to: [3, 4] };
        board = makeMove(board, move, "player1");
        expect(board[3][4]).toBe("player1"); // Example assertion
    });

    test("should not update board on illegal move", () => {
        let board = initializeBoard();
        const move = { from: [2, 3], to: [5, 5] };
        const updatedBoard = makeMove(board, move, "player1");
        expect(updatedBoard).toEqual(board);
    });

});