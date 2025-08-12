// commands/set_trainer_1.js
const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { addTag } = require('../utils'); // <-- import hàm addTag và hasRoleByTag
const { hasRoleByTag } = require('../roles'); // <-- import hàm hasRoleByTag
const TRAINER_OPTIONS = [
  { label: 'Yukimura', value: 'trainer_yukimura', description: 'Bậc thầy chiến thuật lạnh lùng và sắc bén' },
  { label: 'Tét Baka', value: 'trainer_tet_baka', description: 'Ngông cuồng nhưng đầy bất ngờ' },
  { label: 'Datas102', value: 'trainer_datas102', description: 'Nhà phân tích dữ liệu chính xác đến từng chi tiết' },
  { label: 'mốc', value: 'trainer_moc', description: 'Thầm lặng nhưng nguy hiểm' },
  { label: 'OGRE MAGI', value: 'trainer_ogre_magi', description: 'Pháp sư hai đầu với sức mạnh phép thuật hỗn loạn' },
  { label: 'Uura', value: 'trainer_uura', description: 'Người dẫn dắt nhẹ nhàng nhưng đầy uy lực' },
  { label: 'Liễu', value: 'trainer_lieu', description: 'Thanh thoát như làn gió, sắc bén như lá liễu' },
  { label: 'Khoa', value: 'trainer_khoa', description: 'Người bảo hộ vững chãi và kiên định' },
  { label: 'Phat Phat', value: 'trainer_phat_phat', description: 'Hào sảng và luôn tràn đầy năng lượng' },
  { label: 'Mirey Floras', value: 'trainer_mirey_floras', description: 'Nữ chiến binh hoa lệ với trái tim kiên cường' },
  { label: 'Durian', value: 'trainer_durian', description: 'Nguy hiểm và gai góc nhưng bên trong ngọt ngào' },
  { label: 'Saim', value: 'trainer_saim', description: 'Nhanh nhẹn và khó đoán như cơn gió' },
  { label: 'Yuu', value: 'trainer_yuu', description: 'Trầm tĩnh, thông minh và đầy tính toán' },
  { label: 'Azaren', value: 'trainer_azaren', description: 'Lãnh chúa bóng đêm, bí ẩn và quyền lực' },
  { label: 'Hồng Quân', value: 'trainer_hong_quan', description: 'Ngọn lửa rực cháy giữa chiến trường' },
  { label: 'Grey', value: 'trainer_grey', description: 'Trầm lặng và khó lường' },
  { label: 'Huy', value: 'trainer_huy', description: 'Tinh thần thép và trái tim nóng' },
  { label: 'Nhân', value: 'trainer_nhan', description: 'Điềm đạm, tử tế nhưng không kém phần mạnh mẽ' },
  { label: 'Nhất Thân', value: 'trainer_nhat_than', description: 'Chiến binh bất khả chiến bại' },
  { label: 'Du Dớt Gaming', value: 'trainer_du_dot_gaming', description: 'Hài hước, sáng tạo và đầy bất ngờ' },
  { label: 'No Name', value: 'trainer_no_name', description: 'Ẩn danh nhưng khiến ai cũng phải dè chừng' },
  { label: 'Kamiguro', value: 'trainer_kamiguro', description: 'Bậc thầy kiếm đạo lạnh lùng' },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set_trainer')
    .setDescription('Chọn trainer của bạn')
    .addIntegerOption(option =>
      option
        .setName('trainer_number')
        .setDescription('Nhập số từ 1 đến 2')
        .setMinValue(1)
        .setMaxValue(2)
        .setRequired(true)
    ),

  async execute(interaction) {
    if (!hasRoleByTag(interaction, addTag(interaction.user.id))) {
      return interaction.reply(`${addTag(interaction.user.id)} Bạn không có quyền hạn!`);
    }
    const trainerNumber = interaction.options.getInteger('trainer_number');

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId(`trainer_select::${trainerNumber}`) // <== đóng gói số vào customId
      .setPlaceholder('Chọn một trainer...')
      .addOptions(TRAINER_OPTIONS);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    await interaction.reply({
      content: `🔢 Số trainer bạn nhập: **${trainerNumber}**\nHãy chọn trainer của bạn:`,
      components: [row],
      ephemeral: true, // tuỳ bạn, có thể để công khai nếu muốn
    });
  },
};

// (tuỳ chọn) export để tái dùng ở listener
module.exports.TRAINER_OPTIONS = TRAINER_OPTIONS;
