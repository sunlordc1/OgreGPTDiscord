const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


function getActionsButton(item_list) {
    return [
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('skip')
                .setLabel('🍎 Skip')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('skill')
                .setLabel('🍌 Skills')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('item')
                .setLabel('🍇 Items')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('swap')
                .setLabel('🍉 Swap')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('close')
                .setLabel('❌Close')
                .setStyle(ButtonStyle.Danger),
        )
    ];
}

module.exports = { getActionsButton };

