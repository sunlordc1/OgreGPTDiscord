const room = require('../room');
const { hasRoleByTag } = require('../roles');
const { addTag } = require('../ultil'); // <-- import hàm addTag

module.exports = {
  name: 'set_player',
  execute(message, args) {
    const text = args.join(' ');
    if (!text) return message.reply('Sai cú pháp rùi 🥺');
    const userTags = text.match(/<@!?(\d+)>/g) || [];
    if (userTags.length < 2) return message.reply('Không đủ tag 2 player, kiểm tra lại 🍓');
    if (!hasRoleByTag(message, addTag(message.author.id))) return message.reply(`${addTag(message.author.id)} Bạn không có quyền hạn!`);
    // Tách ID từ tag
    const userIds = userTags.map(tag => tag.match(/\d+/)[0]);
    room.setPlayer1(userIds[0]);
    room.setPlayer2(userIds[1]);
    message.channel.send(
      `💬 Đã cài đặt player:
- Player 1:  ${addTag(room.player1)}
- Player 2:  ${addTag(room.player2)}
- Turn hiện tại:  ${addTag(room.turn === 1 ? room.player1 : room.player2)}`
    );
    return;
  },
};