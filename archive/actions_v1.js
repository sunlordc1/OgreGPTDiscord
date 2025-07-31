const { SlashCommandBuilder } = require('discord.js');
const { addTag } = require('../utils'); // <-- import hàm addTag
const game = require('../3-model/game'); // <-- import game object
module.exports = {
    data: new SlashCommandBuilder()
        .setName('actions')
        .setDescription('Hiện thị danh sách hành động của player'),
    async execute(interaction) {
        if (!game.isPlayer(interaction.user.id) || !game.isTurnOfPlayer(interaction.user.id)) return; // Chỉ xử lý nếu người dùng là player
        const pollMessage = await interaction.reply({
            content: `${addTag(interaction.user.id)}, bạn chọn hành động nào?\n🍎 Skip\n🍌 Skills\n🍇 Items\n🍉 Swap\n❌Close`,
            fetchReply: true
        });
        await pollMessage.react('🍎');
        await pollMessage.react('🍌');
        await pollMessage.react('🍇');
        await pollMessage.react('🍉');
        await pollMessage.react('❌');
        // Lưu pollMessage.id vào biến toàn cục
        global.activePollId = pollMessage.id;
        global.pollClosed = false;
    },
};