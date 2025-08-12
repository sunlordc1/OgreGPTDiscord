// listeners/interactionCreate.js (hoặc nhét thẳng vào index.js của bạn)
const { Events, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
// Nếu file command export TRAINER_OPTIONS, bạn có thể require để dùng chung:
const { TRAINER_OPTIONS } = require('../1-commands/1c-settrainer'); // đường dẫn tuỳ dự án
const { serverBroadcast } = require('../websocket')
const game = require('../3-model/game'); // <-- import game object
const { addTag, deleteMessage } = require('../utils'); // <-- import hàm addTag
module.exports = (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    try {
      // Xử lý select menu
      if (interaction.isStringSelectMenu() && interaction.customId.startsWith('trainer_select')) {
        const [, trainerNumberRaw] = interaction.customId.split('::');
        const trainerNumber = Number(trainerNumberRaw) || null;

        const selectedValue = interaction.values[0];
        const picked = TRAINER_OPTIONS.find(o => o.value === selectedValue);

        if (!picked) {
          return interaction.reply({ content: '❌ Lựa chọn không hợp lệ.', ephemeral: true });
        }

        // (Tuỳ chọn) disable menu sau khi chọn:
        const disabledMenu = StringSelectMenuBuilder.from(interaction.component).setDisabled(true);
        const disabledRow = new ActionRowBuilder().addComponents(disabledMenu);

        // update message chứa menu (nếu có quyền)
        if (interaction.message?.editable) {
          await interaction.update({ components: [disabledRow] });
        } else {
          await interaction.deferUpdate().catch(() => { });
        }
        //Send websocket
        game.setQueryCommand({
          action: 'set_trainer',
          player_id: trainerNumber,
          type: picked.label, // Tên user
          type_id: '', // Id của type  skill thì là id của skill, item thì là id của item, swap thì là id của vtumon 
          target_id: '' // Id của đối tượng mục tiêu (nếu có), ví dụ: id của vtumon đối thủ khi swap
        })
        serverBroadcast(JSON.stringify(game.query_command))
        game.resetQueryCommand() // Reset query sau khi gửi
        //end send websocket
        // Gửi xác nhận
        global.set_trainer_interaction = interaction
        // // Xoá message menu ngay sau khi xong
        // if (interaction.message?.deletable) {
        //   await interaction.message.delete().catch(() => { });
        // } else if (interaction.message?.editable) {
        //   // Fallback nếu không xoá được (thiếu quyền Manage Messages)
        //   await interaction.message.edit({ content: '✅ (Đã xử lý)', components: [] }).catch(() => { });
        // }
        // deleteMessage(interaction)
        await interaction.message.channel.send({
          content: `🏆 Quản trò đã chọn Trainer **${picked.label}** (số: ${trainerNumber ?? 'N/A'}) cho ${trainerNumber == 1 ? addTag(game.player1.id) : addTag(game.player2.id)}\n> ${picked.description}`,
        });

        // (Tuỳ chọn) Lưu lại lựa chọn vào DB/bộ nhớ tạm:
        // saveUserTrainer(interaction.user.id, { number: trainerNumber, trainer: picked.value });

        return;
      }
    } catch (err) {
      console.error('interactionCreate error:', err);
      if (!interaction.replied) {
        interaction.reply({ content: '⚠️ Có lỗi xảy ra khi xử lý lựa chọn.', ephemeral: true }).catch(() => { });
      }
    }
  });
};
