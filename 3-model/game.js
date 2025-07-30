const { getRandomVtumons } = require('./vtumon'); // <-- import hàm addTag
const { getrandomItems } = require('./item'); // <-- import fake data
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
let item_icons = ['🍏', '🍐', '🍊', '🍋', '🥭']
module.exports = {
    get player1() { return player1; },
    get player2() { return player2; },
    get turn() { return turn; },
    get item_icons() { return item_icons; },
    setPlayer1(id) { player1 = createPlayer(id); },
    setPlayer2(id) { player2 = createPlayer(id); },
    setTurn(value) { if (value === 1 || value === 2) turn = value; },
    getCurrentPlayer() { return turn === 1 ? player1 : player2; },
    getPlayerById(id) {
        if (player1 && player1.id === id) return player1;
        if (player2 && player2.id === id) return player2;
        return null;
    },
    getPlayerByIndex(index) {
        if (index === 1) return player1;
        if (index === 2) return player2;
        return null;
    },
    isPlayer1(user_id) { return player1 && player1.id === user_id; },
    isPlayer2(user_id) { return player2 && player2.id === user_id; },
    isPlayer(user_id) { return this.isPlayer1(user_id) || this.isPlayer2(user_id); },
    isTurnOfPlayer(user_id) {
        return (turn === 1 && this.isPlayer1(user_id)) || (turn === 2 && this.isPlayer2(user_id));
    },
    /**
     * Lấy list item của player thông qua discord user_id 🍓
     * @param {string} user_id - Tên người dùng
     * @returns {Array} - Mảng list item của người chơi
     */
    getItemOfPlayer(user_id) {
        const player = this.getPlayerById(user_id);
        if (!player) return null;
        return player.items;
    },
    /**
     * Lấy tên của item từ ID
     * @param {string} user_id - ID discord của người dùng
     * @param {number} item_id - ID của item
     * @return {string|null} - Tên của item hoặc null nếu không tìm thấy
     * */
    getItemIdToName(user_id, item_id) {
        const player = this.getPlayerById(user_id);
        if (!player) return null;
        const item = player.items.find(item => item.id === item_id);
        return item ? item.name : null;
    },
    getVtumonOfPlayer(id) {
        const player = this.getPlayerById(id);
        if (!player) return null;
        return player.vtumons;
    },
    /**
    * Lấy ID của item từ biến item_icons
    * @param {string} icon - Biểu tượng của item
    * @returns {number} - ID của item tương ứng với biểu tượng  
    */
    getIconItemToId(icon) {
        return this.item_icons.indexOf(icon);
    },
    /**
     * Lấy item của player theo index
     * @param {string} user_id - ID của người dùng          
     * @param {number} index - Chỉ số của item trong mảng items
     * @returns {Object|null} - Trả về item tại index tương ứng hoặc null
     * */
    getItemOfPlayerByIndex(user_id, index) {
        const player = this.getPlayerById(user_id); // Lấy player theo user_id
        if (!player || !player.items || index < 0 || index >= player.items.length) {
            return null; // Trả về null nếu không tìm thấy player hoặc index không hợp lệ 
        }
        return player.items[index]; // Trả về item tại index tương ứng
    },
    /**
     * Reset game state
     * @returns {void}
     */
    reset() { player1 = null; player2 = null; turn = 1; },
};