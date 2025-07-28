let player1 = null;
let player2 = null;
let turn = 1;
module.exports = {
    get player1() { return player1; },
    get player2() { return player2; },
    get turn() { return turn; },
    setPlayer1(id) { player1 = id; },
    setPlayer2(id) { player2 = id; },
    setTurn(value) { if (value === 1 || value === 2) turn = value; },
    getTurnToTagUser(value) { return value === 1 ? player1 : player2; },
    reset() { player1 = null; player2 = null; turn = 1; },
    addTag(value) { return `<@${value}>`; }
};