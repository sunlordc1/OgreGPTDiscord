const { SlashCommandBuilder } = require('discord.js');
const game = require('../game'); // <-- import game object
module.exports = {
  data: new SlashCommandBuilder()
    .setName('admin_command')
    .setDescription('Danh sách các lệnh quản trị viên'),
  async execute(interaction) {
    return await interaction.reply('\n🆕 /new_game: Bắt đầu một game mới' 
      + '🆕 !set_player: Cài đặt người chơi')

  },
};