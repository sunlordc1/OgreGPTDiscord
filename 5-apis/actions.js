const { Client, Collection, GatewayIntentBits, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');
const { addTag, deleteMessage } = require('../utils'); // <-- import hàm addTag
const game = require('../3-model/game'); // <-- import game object
const { serverBroadcast } = require('../websocket')
async function API_Item_Restream(interaction) {
    if (game.isNotHavePlayerData()) return true

    game.setTargetIdQueryCommand(interaction.customId)
    console.log(game.query_command)
    game.query_command.player_id = game.turn
    serverBroadcast(JSON.stringify(game.query_command))
    containerComponent = new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`Trainer ${addTag(interaction.user.id)} đã Restream lại item ${interaction.customId}! 🌀`)
        );
    await interaction.message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [containerComponent] });
    game.resetQueryCommand() // Reset query sau khi gửi
}
async function API_Item_Instant_Use(interaction) {
    if (game.isNotHavePlayerData()) return true

    game.setTypeIdQueryCommand(interaction.customId)
    console.log(game.query_command)
    game.query_command.player_id = game.turn
    serverBroadcast(JSON.stringify(game.query_command))
    containerComponent = new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`Trainer ${addTag(interaction.user.id)} đã sử dụng item ${interaction.customId}! 🌀`)
        );
    await interaction.message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [containerComponent] });
    game.resetQueryCommand() // Reset query sau khi gửi
}
async function API_Skill_Instant_Use(interaction, skill_id, Isreply) {
    if (game.isNotHavePlayerData()) return true

    let currentVtumon = game.getCurrentVtumon()
    game.setQueryCommand({
        action: 'action',
        player_id: game.turn,
        type: 'skill', // Tên user
        type_id: 'skill_' + skill_id, // Id của type  skill thì là id của skill, item thì là id của item, swap thì là id của vtumon 
        target_id: '' // Id của đối tượng mục tiêu (nếu có), ví dụ: id của vtumon đối thủ khi swap
    })
    console.log(game.query_command)

    const containerComponent = new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`Trainer ${addTag(interaction.user.id)}: ${currentVtumon.name} ${skill_id}A! ${currentVtumon.skills[skill_id].name} ✨`)
        );
    if (Isreply) {
        await interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [containerComponent]
        });
    } else {
        await interaction.message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [containerComponent] });
    }
    console.log(game.query_command)
    game.query_command.player_id = game.turn
    serverBroadcast(JSON.stringify(game.query_command))
    game.resetQueryCommand() // Reset query sau khi gửi
}
async function API_Target_Vtumon(interaction, vtumon) {
    game.setTargetIdQueryCommand(vtumon.name)
    let containerComponent
    switch (game.query_command.type) {
        case 'item':
            containerComponent = new ContainerBuilder()
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`Trainer ${addTag(interaction.user.id)} đã sử dụng ${game.query_command.type} ${game.query_command.type_id} với vtumon ${vtumon.name} - [${vtumon.elements[0]}, ${vtumon.elements[1]}]`)
                );
            await interaction.message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [containerComponent] });
            break;
        case 'swap':
            containerComponent = new ContainerBuilder()
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`Trainer ${addTag(interaction.user.id)} đã ${game.query_command.type} vtumon ${vtumon.name} - [${vtumon.elements[0]}, ${vtumon.elements[1]}]`)
                );
            await interaction.message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [containerComponent] });
            break;
        default:
            break;
    }
    console.log(game.query_command)
    game.query_command.player_id = game.turn
    serverBroadcast(JSON.stringify(game.query_command))
    game.resetQueryCommand() // Reset query sau khi gửi
}

module.exports = {
    API_Item_Restream, API_Item_Instant_Use, API_Target_Vtumon, API_Skill_Instant_Use
};