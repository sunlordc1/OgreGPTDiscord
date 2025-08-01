const { Client, Collection, GatewayIntentBits, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');
const { addTag, deleteMessage } = require('../utils'); // <-- import hàm addTag
const game = require('../3-model/game'); // <-- import game object
async function API_Item_Restream(interaction) {
    game.setTargetIdQueryCommand(interaction.customId)
    console.log(game.query_command)
    containerComponent = new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`Trainer ${addTag(interaction.user.id)} đã Restream lại item ${interaction.customId}! 🌀`)
        );
    await interaction.message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [containerComponent] });
    game.resetQueryCommand() // Reset query sau khi gửi
}
async function API_Item_Instant_Use(interaction) {
    game.setTypeIdQueryCommand(interaction.customId)
    console.log(game.query_command)
    containerComponent = new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`Trainer ${addTag(interaction.user.id)} đã sử dụng item ${interaction.customId}! 🌀`)
        );
    await interaction.message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [containerComponent] });
    game.resetQueryCommand() // Reset query sau khi gửi
}
async function API_Skill_Instant_Use(interaction, skill_id, Isreply) {
    let currentVtumon = game.getCurrentVtumon()
    game.setTypeQueryCommand('skill'); // <-- Set type query command to skip
    game.setTypeIdQueryCommand('skill_0'); // <-- Set type query command to skip
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
    game.resetQueryCommand() // Reset query sau khi gửi
}

module.exports = {
    API_Item_Restream, API_Item_Instant_Use, API_Target_Vtumon, API_Skill_Instant_Use
};