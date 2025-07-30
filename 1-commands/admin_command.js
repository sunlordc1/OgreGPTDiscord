const { SlashCommandBuilder } = require('discord.js');
const game = require('../3-model/game').default; // <-- import game object
const { addTag } = require('../utils'); // <-- import hàm addTag và hasRoleByTag
const { hasRoleByTag } = require('../roles'); // <-- import hàm hasRoleByTag
module.exports = {
  data: new SlashCommandBuilder()
    .setName('admin_command')
    .setDescription('Danh sách các lệnh quản trị viên'),
  async execute(interaction) {
    if (!hasRoleByTag(interaction, addTag(interaction.user.id))) return interaction.reply(`${addTag(interaction.user.id)} Bạn không có quyền hạn!`);

    return await interaction.reply(
      '🆕 /new_game : Bắt đầu một game mới'
      + '\n🆕 !set_player : Cài đặt người chơi'
      + '\n🆕 /setvtumon1 : Set Vtumon cho player 1'
      + '\n🆕 /setvtumon2 : Set Vtumon cho player 2'
    )
  },
};