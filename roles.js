const roleName = 'Thánh nerf';
/**
 * Kiểm tra nguời dùng có role roleName hay không
 * @param {Message} message - Tin nhắn chứa người dùng
 * @param {string} tag - Tag của người dùng, ví dụ: <@123456789>
 * @returns {boolean} - Trả về true nếu người dùng có role, false nếu
 */
function hasRoleByTag(message, tag) {
  // Tách userId từ tag dạng <@123456789>
  const userId = tag.match(/\d+/)?.[0];
  if (!userId) return false;
  // Tìm member trong guild
  const member = message.guild.members.cache.get(userId);
  if (!member) return false;
  // Kiểm tra member có role không
  return member.roles.cache.some(role => role.name === roleName);
}

module.exports = {
  roleName,
  hasRoleByTag,
};