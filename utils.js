function addTag(userId) {
  return `<@${userId}>`;
}
async function deleteMessage(reaction) {
  try {
    if (reaction.message.deletable) {
      await reaction.message.delete();
      // console.log('Đã xóa poll!');
    } else {
      console.warn('Không thể xóa pollMessage: Không có quyền hoặc không hợp lệ.');
    }
  } catch (error) {
    console.error('Lỗi khi xóa poll:', error);
  }
}
module.exports = {
  addTag, deleteMessage
};