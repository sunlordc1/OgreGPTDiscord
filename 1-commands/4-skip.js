// commands/action.js
const { SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');
const { addTag } = require('../utils')
const game = require('../3-model/game')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Hiện thị danh sách hành động của player'),
    async execute(interaction) {
        if (!game.isTurnOfPlayer(interaction.user.id)) return await interaction.reply({
            content: `${addTag(interaction.user.id)} không phải lượt của bạn hoặc bạn đang không có quyền hãy để quản trò !set_player để có quyền chơi nhé!`,
        });// Chỉ xử lý nếu là lượt của người chơi
        game.setTypeQueryCommand('skip'); // <-- Set type query command to skip

        const containerComponent = new ContainerBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`${addTag(interaction.user.id)} đã chọn skip lượt`)
            );
        await interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [containerComponent]
        });
        // await interaction.channel.send({ , components:  });
    }
};