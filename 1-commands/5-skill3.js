const { SlashCommandBuilder } = require('discord.js');
const game = require('../3-model/game'); // <-- import game object
const { addTag } = require('../utils'); // <-- import hàm addTag và hasRoleByTag
const { API_Skill_Instant_Use } = require('../5-apis/actions')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('2a')
        .setDescription('Tấn công với kĩ năng thứ ba'),

    async execute(interaction) {
        const number = interaction.options.getInteger('number');
        if (!game.isTurnOfPlayer(interaction.user.id)) return await interaction.reply({
            content: `${addTag(interaction.user.id)} không phải lượt của bạn hoặc bạn đang không có quyền hãy để quản trò !set_player để có quyền chơi nhé!`,
        });// Chỉ xử lý nếu là lượt của người chơi
        API_Skill_Instant_Use(interaction, 2, true)
        // await interaction.reply();
    },
};