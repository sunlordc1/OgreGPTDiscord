const { getRandomVtumons } = require('./vtumon'); // <-- import hàm addTag
const { getrandomItems, getNameOfItemById } = require('./item'); // <-- import fake data



let player1 = {
    id: 0,         // id của user
    items: [],      // mảng item của player
    vtumons: [],     // mảng vtumon của player
    currentVtumon: 0 // Vtumon hiện tại
}
let player2 = {
    id: 0,         // id của user
    items: [],      // mảng item của player
    vtumons: [],     // mảng vtumon của player
    currentVtumon: 0 // Vtumon hiện tại
};
/**
 * 
 * @param {ID User Discord} user_id 
 * @param {Item Array} items 
 * @param {Vtumon Array} vtumons 
 * @param {integer } currentVtumon 
 * @returns {Object Player} 
 */
function createPlayer(user_id, items = [], vtumons = [], currentVtumon = 0) {
    //API Lấy vtumon 1 players
    // Không có API nên tạm lấy fake data

    // const vtumons = getRandomVtumons();
    // if (!vtumons || vtumons.length === 0) {
    //     throw new Error('Không lấy được vtumon cho player');
    // }
    // const items = getrandomItems()
    // if (!items || items.length === 0) {
    //     throw new Error('Không lấy được item cho player');
    // }

    return {
        id: user_id,         // id của user
        items: [...items],
        vtumons: [...vtumons],
        currentVtumon: currentVtumon // Vtumon hiện tại
    };
}
let turn = 1;
let query_command = {
    action: 'action',
    player_id: 1,
    type: '', // loại thao tác (skill, item, swap, skip)
    type_id: '', // Id của type  skill thì là id của skill, item thì là id của item, swap thì là id của vtumon 
    target_id: '' // Id của đối tượng mục tiêu (nếu có), ví dụ: id của vtumon đối thủ khi swap
}

let item_icons = ['🍏', '🥕', '🍊', '🍋', '🥭']
let vtumon_icons = ['🐱', '🦇', '🦊']
let skill_icons = ['🌀', '🗡️', '🛡️', '💥']
module.exports = {
    get player1() { return player1; },
    get player2() { return player2; },
    get turn() { return turn; },
    get item_icons() { return item_icons; },
    get vtumon_icons() { return vtumon_icons; },
    get skill_icons() { return skill_icons; },
    get query_command() { return query_command; },
    isNotHavePlayerData() {
        if (player1.id == 0 || player2.id == 0) {
            return true
        }
        return false
    }
    ,
    /**
     * 
     * @returns Tên của type_id dựa theo type đang có
     */
    getNameTypeIdQueryCommand() {
        switch (query_command.type) {
            case 'item':
                return getNameOfItemById(query_command.type_id)
            case 'swap':
                return ''
            case 'skill':
                return ''
            default:
                return ''
        }
    },
    /**
     * Lấy ra vtumon hiện tại đang sử dụng của current player
     * @returns 
     */
    getCurrentVtumon() {
        let currentPlayer = this.getCurrentPlayer()
        console.log(currentPlayer)
        return currentPlayer.vtumons[currentPlayer.currentVtumon]
    },
    /**
     * Thiết lập target_id cho query_command
     * @param {string} target_id - ID của đối tượng mục tiêu (target_id)
     */
    setTargetIdQueryCommand(target_id) {
        query_command.target_id = target_id; // Thiết lập target_id cho query_command
    },
    /**
     * Thiết lập type_id cho query_command
     * @param {string} type_id - ID của loại thao tác (type_id)
     */
    setTypeIdQueryCommand(type_id) {
        query_command.type_id = type_id;
    },
    /**
     * Thiết lập action cho query_command
     * @param {string} action - Hành động (action)
     */
    setTypeQueryCommand(type) {
        query_command.type = type;
        query_command.type_id = -1; // Reset type_id khi thay đổi type
    },

    /**
     * Thiết lập player1 với ID
     * @param {string} id - ID của người dùng
     */
    setPlayer1(id, items = [], vtumons = [], currentVtumon = 0) { player1 = createPlayer(id, items, vtumons, currentVtumon); },
    /**
     * Thiết lập player2 với ID
     * @param {string} id - ID của người dùng
     */
    setPlayer2(id, items = [], vtumons = [], currentVtumon = 0) { player2 = createPlayer(id, items, vtumons, currentVtumon); },
    /**
     * Thiết lập lượt chơi
     * @param {number} value - Giá trị mới của lượt (1 hoặc 2)
     */
    setTurn(value) { if (value === 1 || value === 2) turn = value; },
    /**
     * Lấy player hiện tại dựa trên lượt
     * @returns {Object} - Trả về player hiện tại (player1 hoặc player2)
     */
    getCurrentPlayer() { return turn === 1 ? player1 : player2; },
    /**
     * Lấy player theo ID
     * @param {string} id - ID của người dùng
     * @returns {Object|null} - Trả về player tương ứng hoặc null nếu không tìm thấy
     */
    getPlayerById(id) {
        if (player1 && player1.id === id) return player1;
        if (player2 && player2.id === id) return player2;
        return null;
    },
    /**
     * Lấy player theo index (1 hoặc 2)
     * @param {number} index - Chỉ số của player (1 hoặc 2)
     * @returns {Object|null} - Trả về player tương ứng hoặc null nếu không tìm thấy
     */
    getPlayerByIndex(index) {
        if (index === 1) return player1;
        if (index === 2) return player2;
        return null;
    },
    /**
     * Kiểm tra xem người dùng có phải là player1 hay không
     * @param {string} user_id - ID của người dùng
     * @returns {boolean} - Trả về true nếu là player1, false nếu không
     */
    isPlayer1(user_id) { return player1 && player1.id === user_id; },
    /**
     * Kiểm tra xem người dùng có phải là player2 hay không
     * @param {string} user_id - ID của người dùng
     * @returns {boolean} - Trả về true nếu là player2, false nếu không
    */
    isPlayer2(user_id) { return player2 && player2.id === user_id; },
    /**
     * Kiểm tra xem người dùng có phải là player hay không
     * @param {string} user_id - ID của người dùng
     * @returns {boolean} - Trả về true nếu là player, false nếu không
     */
    isPlayer(user_id) { return this.isPlayer1(user_id) || this.isPlayer2(user_id); },
    /**
     * Kiểm tra xem người dùng có phải là lượt của player hay không
     * @param {string} user_id - ID của người dùng
     * @returns {boolean} - Trả về true nếu là lượt của player, false nếu không
     */
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
    /**
     * 
     * @param {number} user_id 
     * @param {number} index 
     * @returns {object} vtumon theo index được lấy từ icon trong poll
     */
    getVtumonOfPlayerByIndex(user_id, index) {
        const player = this.getPlayerById(user_id); // Lấy player theo user_id
        if (!player || !player.vtumons || index < 0 || index >= player.vtumons.length) {
            return null; // Trả về null nếu không tìm thấy player hoặc index không hợp lệ 
        }
        return player.vtumons[index]; // Trả về item tại index tương ứng
    },
    /**
     * 
     * @param {number} user_id 
     * @returns {array[object]} vtumon list
     */
    getVtumonOfPlayer(user_id) {
        const player = this.getPlayerById(user_id);
        if (!player) return null;
        return player.vtumons;
    },
    /**
    * Lấy ID của item từ biến item_icons
    * @param {emoji|string} icon - Biểu tượng của item
    * @returns {number} - ID icon , sử dụng id này để lấy ra id của item theo index tương ứng
    */
    getIconItemToId(icon) {
        return this.item_icons.indexOf(icon);
    },
    /**
    * Lấy ID của item từ biến item_icons
    * @param {emoji|string} icon - Biểu tượng của skill
    * @returns {number} - ID icon , sử dụng id này để lấy ra id của item theo index tương ứng
    */
    getIconSkillToId(icon) {
        return this.skill_icons.indexOf(icon);
    },
    /**
     * 
     * @param {emoji|string} icon 
     * @returns {number} - ID icon , sử dụng id này để lấy ra id của vtumon theo index tương ứng
     */
    getIconVtumonToId(icon) {
        return this.vtumon_icons.indexOf(icon);
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
     * Thiết lập lại giá trị ban đầu query_command với action, type và type_id
     * @param {string} action - Hành động (action)
     * @param {string} type - Loại thao tác (type)
     * @param {string} type_id - Tên của loại thao tác (type_id)
     * @param {string} target_id - Tên của loại thao tác (type_id)
     */
    resetQueryCommand() {
        query_command = {
            action: 'action',
            player_id: turn,
            type: '', // loại thao tác (skill, item, swap, skip)
            type_id: '', // Id của type  skill thì là id của skill, item thì là id của item, swap thì là id của vtumon 
            target_id: '' // Id của đối tượng mục tiêu (nếu có), ví dụ: id của vtumon đối thủ khi swap
        };
    },
    /**
     * Thiết lập lại giá trị ban đầu query_command với action, type và type_id
     * @param {string} action - Hành động (action)
     * @param {string} type - Loại thao tác (type)
     * @param {string} type_id - Tên của loại thao tác (type_id)
     * @param {string} target_id - Tên của loại thao tác (type_id)
     */
    setQueryCommand(obj) {
        query_command = obj
    },
    /**
     * Reset game state
     * @returns {void}
     */
    reset() { player1 = createPlayer(0); player2 = createPlayer(0); turn = 1; this.resetQueryCommand() },
};