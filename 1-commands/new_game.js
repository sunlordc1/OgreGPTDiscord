const { SlashCommandBuilder } = require('discord.js');
const room = require('../room');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('new_game')
    .setDescription('[Quản trò] Bắt đầu 1 game mới 🎲'),
  async execute(interaction) {
    room.reset();
    return await interaction.reply('🆕 Đã reset phòng! Hãy cài đặt lại player để bắt đầu game mới bằng lệnh !set_player');
  },
};