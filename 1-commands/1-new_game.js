const { SlashCommandBuilder } = require('discord.js');
const game = require('../3-model/game'); // <-- import game object
module.exports = {
  data: new SlashCommandBuilder()
    .setName('new_game')
    .setDescription('[Quản trò] Bắt đầu 1 game mới 🎲'),
  async execute(interaction) {
    game.reset();



    return await interaction.reply('🆕 Đã reset phòng! Hãy cài đặt lại player để bắt đầu game mới bằng lệnh !set_player');
  },
};