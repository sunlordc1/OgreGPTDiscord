const roleName = 'Thánh nerf';

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