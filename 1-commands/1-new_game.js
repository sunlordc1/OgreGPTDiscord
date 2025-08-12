const { SlashCommandBuilder } = require('discord.js');
const game = require('../3-model/game'); // <-- import game object
const { addTag } = require('../utils'); // <-- import hàm addTag và hasRoleByTag
const { hasRoleByTag } = require('../roles'); // <-- import hàm hasRoleByTag
const { serverBroadcast } = require('../websocket')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('new_game')
    .setDescription('[Quản trò] Bắt đầu 1 game mới 🎲'),
  async execute(interaction) {
    if (!hasRoleByTag(interaction, addTag(interaction.user.id))) return interaction.reply(`${addTag(interaction.user.id)} Bạn không có quyền hạn!`);
    game.reset();
    game.query_command.action = 'new_game'
    global.game_channel = interaction
    serverBroadcast(JSON.stringify(game.query_command))
    return await interaction.reply('🆕 Đã reset phòng! Hãy cài đặt lại player để bắt đầu game mới bằng lệnh !set_player');
  },
};