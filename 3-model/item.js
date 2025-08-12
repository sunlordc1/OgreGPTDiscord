const items = [
  { id: 1, name: 'Đánh úp', desc: 'Có thể sử dụng thêm 1 Skill vào lượt này', used: false },
  { id: 2, name: 'Superchat', desc: 'Hồi 5-10 HP', used: false },
  { id: 3, name: 'Debut 2.0', desc: 'Hồi sinh với 50% HP', used: false },
  { id: 4, name: 'Cắn cáp', desc: 'Skip lượt tiếp theo của đối phương', used: false },
  { id: 5, name: 'Xóa filter', desc: 'Skill tiếp theo không bị ảnh hưởng bởi phản ứng hệ', used: false },
  { id: 6, name: 'Restream', desc: 'Dùng lại 1 Item bạn đã dùng', used: false },
  { id: 7, name: 'Subathon', desc: '(Passive) Tăng Mana tối đa của bạn lên 4. Tương ứng với 3 Item.', used: true },
  { id: 8, name: 'Trà sữa', desc: 'Hồi full Mana', used: false },
  { id: 9, name: 'Outfit mới', desc: 'Đổi hệ Skill tiếp theo của bạn', used: false },
  { id: 10, name: 'Collab', desc: 'Triệu hồi 1 Vtumon không tốn Action', used: false }
];

// Hàm lấy ngẫu nhiên 5 item không trùng nhau, mỗi item có biến used
function getrandomItems() {
  // Copy mảng và xáo trộn
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  // Lấy 5 item đầu, thêm biến used: false
  return shuffled.slice(0, 5).map(item => ({
    ...item,
    used: false
  }));
}
function getNameOfItemById(item_id) {
  const item = items.find(item => item.id === item_id);
  return item ? item.name : null;
}
function getItemsByNames(itemNames) {
  return itemNames
    .map(name => items.find(item => item.name.trim().toLowerCase() === name.trim().toLowerCase()) || null)
    .filter(item => item !== null);
}
function markItemUsed(items, itemName, state = false) {
  return items.map(item => {
    if (item.name === itemName) {
      return { ...item, used: state };
    }
    return item;
  });
}

module.exports = { items, getrandomItems, getNameOfItemById, getItemsByNames, markItemUsed };