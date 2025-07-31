const elements = [
    { id: 0, icon: '⚪', name: 'Normal' },
    { id: 1, icon: '🔥', name: 'Fire' },
    { id: 2, icon: '💧', name: 'Water' },
    { id: 3, icon: '⚡', name: 'Electric' },
    { id: 4, icon: '🌿', name: 'Grass' },
    { id: 5, icon: '❄️', name: 'Ice' },
    { id: 6, icon: '🥊', name: 'Fighting' },
    { id: 7, icon: '☠️', name: 'Poison' },
    { id: 8, icon: '🌍', name: 'Ground' },
    { id: 9, icon: '🕊️', name: 'Flying' },
    { id: 10, icon: '🔮', name: 'Psychic' },
    { id: 11, icon: '🐛', name: 'Bug' },
    { id: 12, icon: '⛰️', name: 'Rock' },
    { id: 13, icon: '👻', name: 'Ghost' },
    { id: 14, icon: '🐉', name: 'Dragon' },
    { id: 15, icon: '🌑', name: 'Dark' },
    { id: 16, icon: '⚙️', name: 'Steel' },
    { id: 17, icon: '🧚', name: 'Fairy' }
];

/**
 * Lấy tên của hệ thống từ biểu tượng
 * @param {string} icon - Biểu tượng của hệ thống
 *  * @returns {string|null} - Tên của hệ thống hoặc null nếu không tìm thấy
 * */
function getElementNameByIcon(icon) {
    const element = elements.find(e => e.icon === icon);
    return element ? element.name : null; // Trả về tên hoặc null nếu không tìm thấy
}
/**
 * Lấy element theo ID
 * @param {number} element_id - ID của hệ thống 
 * @returns {Object|null} - Trả về đối tượng hệ thống hoặc null nếu không tìm thấy
 */
function getElementById(element_id) {
    return elements.find(e => e.element_id === element_id) || null; // Trả về đối tượng hệ thống hoặc null nếu không tìm thấy
}
/** 
 * Lấy element theo biểu tượng
 * @param {string} icon - Biểu tượng của hệ thống
 * @returns {Object|null} - Trả về đối tượng hệ thống hoặc null nếu không tìm thấy
 */
function getElementByIcon(icon) {
    return elements.find(e => e.icon === icon) || null; // Trả về đối tượng hệ thống hoặc null nếu không tìm thấy
}
/**
 * Lấy element theo tên
 * @param {string} name - Tên của hệ thống
 * @returns {Object|null} - Trả về đối tượng hệ thống hoặc null nếu không tìm thấy
 */
function getElementByName(name) {
    return elements.find(e => e.name.toLowerCase() === name.toLowerCase()) || null; // Trả về đối tượng hệ thống hoặc null nếu không tìm thấy
}
/**
 * Kiểm tra name có phải là name element không 
 * @param {string} name 
 * @returns {boolean}
 */
function isElementNameValid(name) {
    return elements.some(el => el.name.toLowerCase() === name.toLowerCase());
}
module.exports = {
    get data() { return elements; },
    getElementById,
    getElementByIcon,
    getElementByName,
    getElementNameByIcon,
    isElementNameValid
};
