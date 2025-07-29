const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('actions')
        .setDescription('Hiện thị danh sách hành động của player'),
    async execute(interaction) {
        const pollMessage = await interaction.reply({
            content: 'Bạn chọn hành động nào?\n🍎 Skip\n🍌 Skills\n🍇 Items\n🍉 Swap',
            fetchReply: true
        });
        await pollMessage.react('🍎');
        await pollMessage.react('🍌');
        await pollMessage.react('🍇');
        await pollMessage.react('🍉');
        // Lưu pollMessage.id vào biến toàn cục
        global.activePollId = pollMessage.id;
        global.pollClosed = false;
    },
};