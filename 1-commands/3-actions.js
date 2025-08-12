// commands/action.js
const { SlashCommandBuilder } = require('discord.js');
const { getActionsButton } = require('../4-components/action_list')
const { addTag } = require('../utils')
const game = require('../3-model/game')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('actions')
        .setDescription('Hiện thị danh sách hành động của player'),
    async execute(interaction) {
        if (!game.isTurnOfPlayer(interaction.user.id)) return await interaction.reply({
            content: `${addTag(interaction.user.id)} bạn đang không có quyền, hãy để quản trò !set_player để có quyền chơi nhé!`,
        });// Chỉ xử lý nếu là lượt của người chơi
        if (game.isNotHavePlayerData()) return await interaction.reply({
            content: `${addTag(interaction.user.id)} Trainer chưa có dữ liệu, không thể action`,
        });// Chỉ xử lý nếu là lượt của người chơi

        const buttons = getActionsButton();
        await interaction.reply({
            content: `Trainer ${addTag(interaction.user.id)}, cậu chọn hành động nào nè? ✨`,
            components: buttons
        });
    }
};