require('dotenv').config();
const fs = require('fs');
// FOR DISCORD BOT
const { Client, Collection, GatewayIntentBits, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');
const game = require('./3-model/game'); // <-- import game object
const elements = require('./3-model/element'); // <-- import game object
const { addTag, deleteMessage } = require('./utils'); // <-- import hàm addTag
const { getItemListComponents } = require('./4-components/item_list')
const { getVtumonListComponents } = require('./4-components/vtumon_list')
const { getElementListComponents } = require('./4-components/element_list')
const { getSkillListComponents } = require('./4-components/skill_list')
const { API_Item_Restream, API_Item_Instant_Use, API_Target_Vtumon, API_Skill_Instant_Use } = require('./5-apis/actions')
require('./websocket');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions // <-- Thêm dòng này
  ]
});

client.commands = new Collection();
client.prefixCommands = new Collection();

const prefix = '!'; // cậu có thể thay prefix nè 🍓

// Load Slash Commands
const commandFiles = fs.readdirSync('./1-commands');
for (const file of commandFiles) {
  const command = require(`./1-commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Load Prefix Commands
const prefixFiles = fs.readdirSync('./2-prefixCommands');
for (const file of prefixFiles) {
  const command = require(`./2-prefixCommands/${file}`);
  client.prefixCommands.set(command.name, command);
}

// Slash command interaction
client.on('interactionCreate', async interaction => {

  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Oops! Có lỗi rồi 😵‍💫', ephemeral: true });
    }
  }
  if (interaction.isButton()) {
    let is_delete = true
    let item = null
    let item_list = game.getItemOfPlayer(interaction.user.id); // <-- Lấy item của người chơi
    let vtumon = null
    let vtumon_list = game.getVtumonOfPlayer(interaction.user.id); // <-- Lấy vtumon của người chơi
    let currentVtumon = game.getCurrentVtumon()
    // let currentPlayer = game.getCurrentPlayer()
    let buttons
    let n = 0;
    let ct = ''
    if (game.isTurnOfPlayer(interaction.user.id)) {
      switch (interaction.customId) {
        //List Actions
        case 'skip':
          game.setTypeQueryCommand('skip'); // <-- Set type query command to skip
          const containerComponent = new ContainerBuilder()
            .addTextDisplayComponents(
              new TextDisplayBuilder().setContent(`${addTag(interaction.user.id)} đã chọn skip lượt`)
            );
          await interaction.message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [containerComponent] });
          break;
        case 'skill':
          game.setTypeQueryCommand('skill'); // <-- Set type query command to skip
          deleteMessage(interaction)
          if (!currentVtumon.skills || currentVtumon.skills.length === 0) {
            await interaction.message.channel.send(`${addTag(interaction.user.id)}, bạn không có item nào! 🍇`);
            return; // Không có item nào để chọn
          }
          buttons = getSkillListComponents(currentVtumon.skills);
          n = 0
          ct = ''
          for (const skill of currentVtumon.skills) {
            ct += `\n${game.skill_icons[n]} [Mana:${skill.mana_cost}] - {${skill.element_name}} ${skill.name} (ID:${n}) `
            n++;
          }
          ct += `\n - Gõ /{ID}a để thực hiện dùng kĩ năng nhanh`
          await interaction.message.channel.send({
            content: `Trainer ${addTag(interaction.user.id)}, cậu chọn skill nào nè? ✨` + ct + "\n",
            components: buttons
          });
          is_delete = false
          break;
        case 'item':
          game.setTypeQueryCommand('item'); // <-- Set type query command to skip
          deleteMessage(interaction)
          if (!item_list || item_list.length === 0) {
            await interaction.message.channel.send(`${addTag(interaction.user.id)}, bạn không có item nào! 🍇`);
            return; // Không có item nào để chọn
          }
          buttons = getItemListComponents(item_list);
          n = 0
          ct = ''
          for (const item of item_list) {
            ct += `\n${game.item_icons[n]} ${item.name}: ${item.desc}`
            n++;
          }
          await interaction.message.channel.send({
            content: `Trainer ${addTag(interaction.user.id)}, cậu chọn item nào nè? ✨` + ct + "\n",
            components: buttons
          });

          is_delete = false
          break;
        case 'swap':
          game.setTypeQueryCommand('swap'); // <-- Set type query command to skip
          game.setTypeIdQueryCommand(interaction.customId)
          deleteMessage(interaction)
          if (!vtumon_list || vtumon_list.length === 0) {
            await interaction.message.channel.send(`${addTag(interaction.user.id)}, bạn không có vtumon nào! 🍇`);
            return; // Không có item nào để chọn
          }
          buttons = getVtumonListComponents(vtumon_list);
          n = 0;
          ct = ''
          for (const i of vtumon_list) {
            ct += `\n${game.vtumon_icons[n]} ${i.name} [${i.elements[0]}, ${i.elements[1]}]`
            n++;
          }
          await interaction.message.channel.send({
            content: `Trainer ${addTag(interaction.user.id)}, cậu chọn đổi vtumon nào? ✨` + ct + "\n",
            components: buttons
          });
          is_delete = false
          break;

        //List Item 
        case 'Đánh úp':
          // CALL API USE ITEM LẤY PHẢN HỒI ĐỂ SETTING LẠI VÀ TRẢ LỜI
          if (game.query_command.type == 'item') {
            let containerComponent
            switch (game.query_command.type_id) {
              case 'Restream':
                API_Item_Restream(interaction)
                break;

              default:
                API_Item_Instant_Use(interaction)
                break;
            }
          }
          break;
        case 'Superchat':
          // TẠO API gửi superchat 
          if (game.query_command.type == 'item') {
            let containerComponent
            switch (game.query_command.type_id) {
              case 'Restream':
                API_Item_Restream(interaction)
                break;
              default:
                API_Item_Instant_Use(interaction)
                break;
            }
          }
          break;
        case 'Debut 2.0':
          // TẠO POLL ĐỂ TARGET 1 VTUMON VÀ TẠO API HỎI THÊM INFO CHO API
          if (game.query_command.type == 'item') {
            let containerComponent
            switch (game.query_command.type_id) {
              case 'Restream':
                API_Item_Restream(interaction)
                break;
              default:
                game.setTypeIdQueryCommand(interaction.customId)
                deleteMessage(interaction)
                if (!vtumon_list || vtumon_list.length === 0) {
                  await interaction.message.channel.send(`${addTag(interaction.user.id)}, bạn không có vtumon nào! 🍇`);
                  return; // Không có item nào để chọn
                }
                buttons = getVtumonListComponents(vtumon_list);
                n = 0;
                ct = ''
                for (const i of vtumon_list) {
                  ct += `\n${game.vtumon_icons[n]} ${i.name} [${i.elements[0]}, ${i.elements[1]}]`
                  n++;
                }
                await interaction.message.channel.send({
                  content: `Trainer ${addTag(interaction.user.id)}, cậu chọn vtumon nào cho item Debut 2.0? ✨` + ct + "\n",
                  components: buttons
                });
                is_delete = false
                break;
            }

          }

          // Thực hiện hành động tương ứng với item
          break;
        case 'Cắn cáp':
          // CALL API USE ITEM LẤY PHẢN HỒI ĐỂ SETTING LẠI VÀ TRẢ LỜI
          if (game.query_command.type == 'item') {
            let containerComponent
            switch (game.query_command.type_id) {
              case 'Restream':
                API_Item_Restream(interaction)
                break;
              default:
                API_Item_Instant_Use(interaction)
                break;
            }
          }
          break;
        case 'Xóa filter':
          // CALL API USE ITEM LẤY PHẢN HỒI ĐỂ SETTING LẠI VÀ TRẢ LỜI
          if (game.query_command.type == 'item') {
            let containerComponent
            switch (game.query_command.type_id) {
              case 'Restream':
                API_Item_Restream(interaction)
                break;
              default:
                API_Item_Instant_Use(interaction)
                break;
            }
          }
          break;
        case 'Restream':
          // TẠO POLL ĐỂ TARGET 1 ITEM VÀ TẠO API HỎI THÊM INFO CHO API
          if (game.query_command.type == 'item') {
            let containerComponent
            switch (game.query_command.type_id) {
              case 'Restream':
                // Không thể restream chính nó
                break;
              default:
                game.setTypeIdQueryCommand(interaction.customId)
                deleteMessage(interaction)
                if (!item_list || item_list.length === 0) {
                  await interaction.message.channel.send(`${addTag(interaction.user.id)}, bạn không có item nào! 🍇`);
                  return; // Không có item nào để chọn
                }
                buttons = getItemListComponents(item_list);
                n = 0
                ct = ''
                for (const item of item_list) {
                  ct += `\n${game.item_icons[n]} ${item.name}: ${item.desc}`
                  n++;
                }
                await interaction.message.channel.send({
                  content: `Trainer ${addTag(interaction.user.id)}, cậu chọn item nào để Restream nè? ✨` + ct + "\n",
                  components: buttons
                });

                is_delete = false
                break;
            }
          }

          // Thực hiện hành động tương ứng với item
          break;
        case 'Subathon':
          // Ấn vào và không làm gì cả :D
          break;
        case 'Trà sữa':
          if (game.query_command.type == 'item') {
            let containerComponent
            switch (game.query_command.type_id) {
              case 'Restream':
                API_Item_Restream(interaction)
                break;
              default:
                API_Item_Instant_Use(interaction)
                break;
            }
          }
          break;
        case 'Outfit mới':
          // TẠO POLL ĐỂ TARGET 1 ELEMENT VÀ TẠO API HỎI THÊM INFO CHO API
          if (game.query_command.type == 'item') {
            let containerComponent
            switch (game.query_command.type_id) {
              case 'Restream':
                API_Item_Restream(interaction)
                break;
              default:
                game.setTypeIdQueryCommand(interaction.customId)
                deleteMessage(interaction)
                buttons = getElementListComponents();
                await interaction.message.channel.send({
                  content: `Trainer ${addTag(interaction.user.id)}, cậu chọn nguyên tố nào nào cho item Outfit mới? ✨` + "\n",
                  components: buttons
                });
                is_delete = false
                break;
            }
          }


          // Thực hiện hành động tương ứng với item 
          break;
        case 'Collab':
          // TẠO POLL ĐỂ TARGET 1 VTUMON VÀ TẠO API HỎI THÊM INFO CHO API
          if (game.query_command.type == 'item') {
            let containerComponent
            switch (game.query_command.type_id) {
              case 'Restream':
                API_Item_Restream(interaction)
                break;
              default:
                game.setTypeIdQueryCommand(interaction.customId)
                deleteMessage(interaction)
                if (!vtumon_list || vtumon_list.length === 0) {
                  await interaction.message.channel.send(`${addTag(interaction.user.id)}, bạn không có vtumon nào! 🍇`);
                  return; // Không có item nào để chọn
                }
                buttons = getVtumonListComponents(vtumon_list);
                n = 0;
                ct = ''
                for (const i of vtumon_list) {
                  ct += `\n${game.vtumon_icons[n]} ${i.name} [${i.elements[0]}, ${i.elements[1]}]`
                  n++;
                }
                await interaction.message.channel.send({
                  content: `Trainer ${addTag(interaction.user.id)}, cậu chọn vtumon nào cho item Collab? ✨` + ct + "\n",
                  components: buttons
                });
                is_delete = false
                break;
            }
          }

          // Thực hiện hành động tương ứng với item
          break;


        // Vtumon List reactions
        case '🐱': // Vtumon số 0
          vtumon = game.getVtumonOfPlayerByIndex(interaction.user.id, game.getIconVtumonToId(interaction.customId))
          if (vtumon) {
            API_Target_Vtumon(interaction, vtumon)
          }
          break;
        case '🦇': // Vtumon số 1
          vtumon = game.getVtumonOfPlayerByIndex(interaction.user.id, game.getIconVtumonToId(interaction.customId))
          if (vtumon) {
            API_Target_Vtumon(interaction, vtumon)
          }
          break;
        case '🦊': // Vtumon số 2
          vtumon = game.getVtumonOfPlayerByIndex(interaction.user.id, game.getIconVtumonToId(interaction.customId))
          if (vtumon) {
            API_Target_Vtumon(interaction, vtumon)
          }
          break;

        // Skill List reactions
        case '🌀': // Skill số 0
          API_Skill_Instant_Use(interaction, 0, false)
          break;
        case '🗡️': // Skill số 0
          API_Skill_Instant_Use(interaction, 1, false)
          break;
        case '🛡️': // Skill số 0
          API_Skill_Instant_Use(interaction, 2, false)
          break;
        case '💥': // Skill số 0
          API_Skill_Instant_Use(interaction, 3, false)
          break;
        case 'close':
          // Ấn vào thì ăn xóa message
          // await interaction.message.channel.send({ content: '🔥 Cậu đã chọn close', ephemeral: true }); // xóa 
          break;
        default:

          break;
      }
    }
    //Nếu customId là tên của 1 trong các nguyên tố trong danh sách
    if (elements.isElementNameValid(interaction.customId)) {
      game.setTargetIdQueryCommand(interaction.customId)
      const containerComponent = new ContainerBuilder()
        .addTextDisplayComponents(
          new TextDisplayBuilder().setContent(`Trainer ${addTag(interaction.user.id)} đã sử dụng ${game.query_command.type} ${game.query_command.type_id} với nguyên tố là ${interaction.customId}`)
        );
      await interaction.message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [containerComponent] });
      console.log(game.query_command)
      game.resetQueryCommand() // Reset query sau khi gửi
    }

    if (is_delete) {
      deleteMessage(interaction)
      // try {
      //   if (interaction.message.deletable) {
      //     await interaction.message.delete();
      //     // console.log('Đã xóa poll!');
      //   } else {
      //     console.warn('Không thể xóa pollMessage: Không có quyền hoặc không hợp lệ.');
      //   }
      // } catch (error) {
      //   console.error('Lỗi khi xóa poll:', error);
      // }
    }
  }

  return
});


// Prefix command handler
client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmdName = args.shift().toLowerCase();
  const command = client.prefixCommands.get(cmdName);
  if (!command) return;
  try {
    command.execute(message, args);
  } catch (err) {
    console.error(err);
    message.reply('Có lỗi xảy ra rồi 😥');
  }
});



client.once('ready', () => {
  console.log(`🟢 Bot online với tên ${client.user.tag}`);
});

client.login(process.env.TOKEN);
