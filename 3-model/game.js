const { getRandomVtumons } = require('./vtumon-fake'); // <-- import hàm addTag
const { getrandomItems } = require('./items-fake'); // <-- import fake data
function createPlayer(id) {
    //API Lấy vtumon 1 player
    // Không có API nên tạm lấy fake data
    const vtumons = getRandomVtumons();
    if (!vtumons || vtumons.length === 0) {
        throw new Error('Không lấy được vtumon cho player');
    }
    const items = getrandomItems()
    if (!items || items.length === 0) {
        throw new Error('Không lấy được item cho player');
    }
    return {
        id: id,         // id của user
        items: items,      // mảng item của player
        vtumons: vtumons     // mảng vtumon của player
    };
}

let player1 = null;
let player2 = null;
let turn = 1;

module.exports = {
    get player1() { return player1; },
    get player2() { return player2; },
    get turn() { return turn; },
    setPlayer1(id) { player1 = createPlayer(id); },
    setPlayer2(id) { player2 = createPlayer(id); },
    setTurn(value) { if (value === 1 || value === 2) turn = value; },
    getTurnToTagUser(value) { return value === 1 ? player1 : player2; },
    reset() { player1 = null; player2 = null; turn = 1; },
};