const { SlashCommandBuilder } = require('discord.js');
const room = require('../room');
const { addTag } = require('../ultil'); // <-- import hàm addTag

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip lượt của tôi 🍓'),
  async execute(interaction) {
    if (!room.player1 || !room.player2)
      return await interaction.reply(`Chưa setting player, dùng lệnh /swap_player để cài đặt player trước nhé 🍓`);
    switch (room.turn) {
      case 1:
        if (room.player1 !== interaction.user.id) {
          return await interaction.reply(`Bạn không phải là người chơi hiện tại, không thể skip lượt!`);
        }
        room.setTurn(2);
        return await interaction.reply(`Lượt của bạn đã được skip, bây giờ là lượt của ${addTag(room.player2)}`);
      case 2:
        if (room.player2 !== interaction.user.id) {
          return await interaction.reply(`Bạn không phải là người chơi hiện tại, không thể skip lượt!`);
        }
        room.setTurn(1);
        return await interaction.reply(`Lượt của bạn đã được skip, bây giờ là lượt của ${addTag(room.player1)}`);
      default:
        return await interaction.reply(`Có lỗi xảy ra trong quá trình skip lượt!`);
    }
  },
};