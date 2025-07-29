const game = require('../3-model/game');// <-- import game object
const { hasRoleByTag } = require('../roles');// <-- import hàm hasRoleByTag
const { addTag } = require('../utils'); // <-- import hàm addTag

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
- Player 1:  ${addTag(game.player1.id)}
  - Vtumon:
    - ${game.player1.vtumons.map(v => ` 🌀 ${v.name} [${v.elements[0]}, ${v.elements[1]}]`).join('')}
  - Items:
${game.player1.items.map(i => `    - ${i.name} (${i.used ? 'Đã dùng' : 'Chưa dùng'}) \n`).join('')}
- Player 2:  ${addTag(game.player2.id)}
  - Vtumon:
    - ${game.player2.vtumons.map(v => ` 🌀 ${v.name} [${v.elements[0]}, ${v.elements[1]}]`).join('')}
  - Items:
${game.player2.items.map(i => `    - ${i.name} (${i.used ? 'Đã dùng' : 'Chưa dùng'}) \n`).join('')}
- Turn hiện tại:  ${addTag(game.turn === 1 ? game.player1.id : game.player2.id)}\n
Hãy dùng lệnh /setvtumon1 hoặc /setvtumon2 để cài đặt Vtumon cho từng player 🍓`
    );
    return;
  },
};