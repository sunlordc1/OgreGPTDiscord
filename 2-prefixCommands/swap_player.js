const game = require('../game');// <-- import game object
const { hasRoleByTag } = require('../roles');// <-- import hàm hasRoleByTag
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
    game.setPlayer1(userIds[0]);
    game.setPlayer2(userIds[1]);
    message.channel.send(
      `💬 Đã cài đặt player:
- Player 1:  ${addTag(game.player1)}
- Player 2:  ${addTag(game.player2)}
- Turn hiện tại:  ${addTag(game.turn === 1 ? game.player1 : game.player2)}`
    );
    return;
  },
};