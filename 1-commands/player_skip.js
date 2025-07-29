const { SlashCommandBuilder } = require('discord.js');
const game = require('../game');
const { addTag } = require('../ultil'); // <-- import hàm addTag

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('[Player] Skip lượt của tôi 🍓'),
  async execute(interaction) {
    if (!game.player1 || !game.player2)
      return await interaction.reply(`Chưa setting player, dùng lệnh /swap_player để cài đặt player trước nhé 🍓`);
    switch (game.turn) {
      case 1:
        if (game.player1 !== interaction.user.id) {
          return await interaction.reply(`Bạn không phải là người chơi hiện tại, không thể skip lượt!`);
        }
        game.setTurn(2);
        return await interaction.reply(`Lượt của bạn đã được skip, bây giờ là lượt của ${addTag(game.player2)}`);
      case 2:
        if (game.player2 !== interaction.user.id) {
          return await interaction.reply(`Bạn không phải là người chơi hiện tại, không thể skip lượt!`);
        }
        game.setTurn(1);
        return await interaction.reply(`Lượt của bạn đã được skip, bây giờ là lượt của ${addTag(game.player1)}`);
      default:
        return await interaction.reply(`Có lỗi xảy ra trong quá trình skip lượt!`);
    }
  },
};