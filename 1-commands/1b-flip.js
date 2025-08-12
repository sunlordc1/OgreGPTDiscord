const { SlashCommandBuilder } = require('discord.js');
const { addTag } = require('../utils'); // import hàm addTag
const { hasRoleByTag } = require('../roles'); // import hàm hasRoleByTag

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flipcoin')
    .setDescription('[Quản trò] Tung đồng xu ra ngửa hoặc úp'),
  async execute(interaction) {
    // Kiểm tra quyền hạn
    if (!hasRoleByTag(interaction, addTag(interaction.user.id))) {
      return interaction.reply(`${addTag(interaction.user.id)} Bạn không có quyền hạn!`);
    }

    // Xác suất 50/50
    const isHeads = Math.random() < 0.5;
    const resultText = isHeads ? ':coin: **Ngửa**' : ':coin: **Úp**';

    return await interaction.reply(`${addTag(interaction.user.id)} kết quả tung đồng xu: ${resultText}`);
  },
};
