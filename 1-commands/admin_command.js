const { SlashCommandBuilder } = require('discord.js');
const game = require('../3-model/game').default; // <-- import game object
module.exports = {
  data: new SlashCommandBuilder()
    .setName('admin_command')
    .setDescription('Danh sách các lệnh quản trị viên'),
  async execute(interaction) {
    return await interaction.reply(
      '🆕 /new_game : Bắt đầu một game mới'
      + '\n🆕 !set_player : Cài đặt người chơi'
      + '\n🆕 /setvtumon1 : Set Vtumon cho player 1'
      + '\n🆕 /setvtumon2 : Set Vtumon cho player 2'
    )
  },
};