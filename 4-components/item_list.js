const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const game = require('../3-model/game');

function getItemListComponents(item_list) {
    if (!item_list) return [];
    const components = [];
    let n = 0;
    //Chỉ tối đa 5 button 1 hàng
    const row = new ActionRowBuilder()
    for (const item of item_list) {
        const button = new ButtonBuilder()
            .setCustomId(`${item.name}`) // nên để index hoặc ID cho ổn định
            .setLabel(`${game.item_icons[n]}`)
            .setStyle(ButtonStyle.Primary)
        row.addComponents(button);
        n++;
    }
    components.push(row);

    const row2 = new ActionRowBuilder()
    const button = new ButtonBuilder()
        .setCustomId('close')
        .setLabel('❌Close')
        .setStyle(ButtonStyle.Danger)
    row2.addComponents(button);
    components.push(row2);

    return components;
}

module.exports = { getItemListComponents };


// const text = new TextDisplayBuilder()
//     .setContent(item.desc || 'Không có mô tả');