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
module.exports = {
    API_Item_Restream, API_Item_Instant_Use
};