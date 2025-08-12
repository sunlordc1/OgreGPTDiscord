const { SlashCommandBuilder } = require('discord.js');
const game = require('../3-model/game').default; // <-- import game object
const { addTag } = require('../utils'); // <-- import hàm addTag và hasRoleByTag
const { hasRoleByTag } = require('../roles'); // <-- import hàm hasRoleByTag
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test 1 cái gì đó'),


    async execute(interaction) {
        // axios.get('http://127.0.0.1:8668/')
        //     .then(function (response) {
        //         console.log('📥 Dữ liệu từ /vtumon:', response.data);
        //     })
        //     .catch(function (error) {
        //         console.error('🚨 Lỗi khi gọi /vtumon:', error.message);
        //     })
        return await interaction.reply(
            'Đã thử gửi 1 API'
        )
    },
};