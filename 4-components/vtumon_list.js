const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const game = require('../3-model/game');

function getVtumonListComponents(vtumon_list) {
    if (!vtumon_list) return [];
    const components = [];
    let n = 0;
    const row = new ActionRowBuilder()
    for (const item of vtumon_list) {
        const button = new ButtonBuilder()
            .setCustomId(`${game.vtumon_icons[n]}`) // nên để index hoặc ID cho ổn định
            .setLabel(`${game.vtumon_icons[n]}`)
            .setStyle(ButtonStyle.Primary)
        row.addComponents(button);
        n++;
    }
    const button = new ButtonBuilder()
        .setCustomId('close')
        .setLabel('❌Close')
        .setStyle(ButtonStyle.Danger)
    row.addComponents(button);
    components.push(row);
    return components;
}

module.exports = { getVtumonListComponents };


// const text = new TextDisplayBuilder()
//     .setContent(item.desc || 'Không có mô tả');