const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const game = require('../3-model/game');
const elements = require('../3-model/element')
function getElementListComponents() {
    if (!elements) return [];
    let row = new ActionRowBuilder();
    const components = [];
    let n = 0;
    const element_list = elements.data
    for (const element of element_list) {
        const button = new ButtonBuilder()
            .setCustomId(`${element.name}`) // Nên dùng ID để ổn định hơn nếu có trùng tên
            .setLabel(`${element.icon} ${element.name}`)
            .setStyle(ButtonStyle.Primary);
        row.addComponents(button);
        n++;

        if (row.components.length === 5) {
            components.push(row);
            row = new ActionRowBuilder(); // Tạo hàng mới
        }
    }
    // Đừng quên thêm hàng cuối nếu chưa đủ 5 nút
    if (row.components.length > 0) {
        components.push(row);
    }

    const row2 = new ActionRowBuilder()
    const button = new ButtonBuilder()
        .setCustomId('close')
        .setLabel('❌Close')
        .setStyle(ButtonStyle.Danger)
    row2.addComponents(button);
    components.push(row2);

    return components;
}

module.exports = { getElementListComponents };
