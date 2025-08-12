// commands/action.js
const { SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');
const { addTag } = require('../utils')
const game = require('../3-model/game')
const { serverBroadcast } = require('../websocket')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Hiện thị danh sách hành động của player'),
    async execute(interaction) {
        if (!game.isTurnOfPlayer(interaction.user.id)) return await interaction.reply({
            content: `${addTag(interaction.user.id)} không phải lượt của bạn hoặc bạn đang không có quyền hãy để quản trò !set_player để có quyền chơi nhé!`,
        });// Chỉ xử lý nếu là lượt của người chơi
        if (game.isNotHavePlayerData()) return await interaction.reply({
            content: `${addTag(interaction.user.id)} Trainer chưa có dữ liệu, không thể action`,
        });// Chỉ xử lý nếu là lượt của người chơi

        game.setQueryCommand({
            action: 'action',
            player_id: game.turn,
            type: 'skip', // Tên user
            type_id: '', // Id của type  skill thì là id của skill, item thì là id của item, swap thì là id của vtumon 
            target_id: '' // Id của đối tượng mục tiêu (nếu có), ví dụ: id của vtumon đối thủ khi swap
        })
        serverBroadcast(JSON.stringify(game.query_command))
        game.resetQueryCommand() // Reset query sau khi gửi
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