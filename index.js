require('dotenv').config();
const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const game = require('./3-model/game'); // <-- import game object
const { addTag } = require('./utils'); // <-- import hàm addTag
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
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Oops! Có lỗi rồi 😵‍💫', ephemeral: true });
  }
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

client.on('messageReactionAdd', async (reaction, user) => {
  if (!game.isPlayer(user.id)) return; // Chỉ xử lý nếu người dùng là player

  if (
    global.activePollId &&
    reaction.message.id === global.activePollId &&
    !global.pollClosed &&
    !user.bot
    && game.isTurnOfPlayer(user.id) // Chỉ xử lý nếu là lượt của người chơi
  ) {
    global.pollClosed = true;
    let isDeletePoll = true;
    let item = null
    let item_list = game.getItemOfPlayer(user.id); // <-- Lấy item của người chơi
    let vtumon_list = game.getItemOfPlayer(user.id); // <-- Lấy item của người chơi
    // Lấy lại pollMessage từ id
    switch (reaction.emoji.name) {
      // Actions reactions
      // 🍎 Skip, 🍌 Skills, 🍇 Items, 🍉  Swap 
      case '🍎': // Skip my turn
        await reaction.message.channel.send(`${addTag(user.id)} đã chọn Skip! 🍎`);
        break;
      case '🍌': //Skill list of Vtumon
        await reaction.message.channel.send(`${addTag(user.id)} đã chọn Skills! 🍌`);
        break;
      case '🍇': //Item List
        isDeletePoll = false;
        global.pollClosed = false; // Đặt lại trạng thái pollClosed
        try {
          if (reaction.message.deletable) {
            await reaction.message.delete();
            // console.log('Đã xóa poll!');
          } else {
            console.warn('Không thể xóa pollMessage: Không có quyền hoặc không hợp lệ.');
          }
        } catch (error) {
          console.error('Lỗi khi xóa poll:', error);
        }
        if (!item_list || item_list.length === 0) {
          await reaction.message.channel.send(`${addTag(user.id)}, bạn không có item nào! 🍇`);
          return; // Không có item nào để chọn
        }
        let ct = '';
        let n = 0;
        for (const i of item_list) {
          ct += `\n${game.item_icons[n]} ${i.name} (${i.used ? 'Đã dùng' : 'Chưa dùng'})`;
          n++;
        }
        const pollMessage = await reaction.message.channel.send({
          content: `${addTag(user.id)}, bạn chọn item nào?${ct}`,
          fetchReply: true
        });
        n = 0;
        for (const i of item_list) {
          await pollMessage.react(game.item_icons[n]);
          n++;
        }
        await pollMessage.react('❌'); // Close poll
        // Lưu pollMessage.id vào biến toàn cục
        global.activePollId = pollMessage.id;
        global.pollClosed = false;
        // await reaction.message.channel.send(`${addTag(user.id)} đã chọn Items! 🍇`);
        break;
      case '🍉': // Swap vtumon
        await reaction.message.channel.send(`${addTag(user.id)} đã chọn Swap! 🍉`);
        break;

      // Item List reactions
      case '🍏': // Item Index 0
        console.log("Item Index số " + game.getIconItemToId(reaction.emoji.name));
        item = game.getItemOfPlayerByIndex(user.id, game.getIconItemToId(reaction.emoji.name)); // <-- Lấy ID của item từ icon
        // API check item đặc thù
        break;
      case '🍐': // Item Index 1
        console.log("Item Index số " + game.getIconItemToId(reaction.emoji.name));
        item = game.getItemOfPlayerByIndex(user.id, game.getIconItemToId(reaction.emoji.name)); // <-- Lấy ID của item từ icon
        break;
      case '🍊': // Item Index 2
        item = game.getItemOfPlayerByIndex(user.id, game.getIconItemToId(reaction.emoji.name)); // <-- Lấy ID của item từ icon
        break;
      case '🍋': // Item Index 3
        item = game.getItemOfPlayerByIndex(user.id, game.getIconItemToId(reaction.emoji.name)); // <-- Lấy ID của item từ icon
        break;
      case '🥭': // Item Index 4
        item = game.getItemOfPlayerByIndex(user.id, game.getIconItemToId(reaction.emoji.name)); // <-- Lấy ID của item từ icon
        break;

      case '❌': // Close poll
        break;
      default:
        isDeletePoll = false;
        return; // Không xử lý emoji khác
    }
    // await reaction.message.channel.send(
    //   `Poll đã đóng! Người đầu tiên vote là ${addTag(user.id)} với lựa chọn ${reaction.emoji.name}`
    // );

    // console.log(item);
    if (item !== null) {
      switch (item.name) {
        case 'Đánh úp':
          // CALL API USE ITEM LẤY PHẢN HỒI ĐỂ SETTING LẠI VÀ TRẢ LỜI
          await reaction.message.channel.send(`${addTag(user.id)} đã sử dụng ${item.name}! 🍎`);
          break;
        case 'Superchat':
          // TẠO POLL ĐỂ TARGET 1 VTUMON VÀ TẠO API HỎI THÊM INFO CHO API
          await reaction.message.channel.send(`${addTag(user.id)} đã sử dụng ${item.name}! 🍌`);
          // Thực hiện hành động tương ứng với item
          break;
        case 'Debut 2.0':
          // TẠO POLL ĐỂ TARGET 1 VTUMON VÀ TẠO API HỎI THÊM INFO CHO API
          await reaction.message.channel.send(`${addTag(user.id)} đã sử dụng ${item.name}! 🍇`);
          // Thực hiện hành động tương ứng với item
          break;
        case 'Cắn cáp':
          // CALL API USE ITEM LẤY PHẢN HỒI ĐỂ SETTING LẠI VÀ TRẢ LỜI
          await reaction.message.channel.send(`${addTag(user.id)} đã sử dụng ${item.name}! 🍉`);
          // Thực hiện hành động tương ứng với item
          break;
        case 'Xóa filter':
          // CALL API USE ITEM LẤY PHẢN HỒI ĐỂ SETTING LẠI VÀ TRẢ LỜI
          await reaction.message.channel.send(`${addTag(user.id)} đã sử dụng ${item.name}! 🍏`);
          // Thực hiện hành động tương ứng với item
          break;
        case 'Restream':
          // TẠO POLL ĐỂ TARGET 1 ITEM VÀ TẠO API HỎI THÊM INFO CHO API
          await reaction.message.channel.send(`${addTag(user.id)} đã sử dụng ${item.name}! 🍐`);
          // Thực hiện hành động tương ứng với item
          break;
        case 'Subathon':
          await reaction.message.channel.send(`${addTag(user.id)}, ${item.name} không cần sử dụng! 🍊`);
          // Thực hiện hành động tương ứng với item
          break;
        case 'Trà sữa':
          // CALL API USE ITEM LẤY PHẢN HỒI ĐỂ SETTING LẠI VÀ TRẢ LỜI
          await reaction.message.channel.send(`${addTag(user.id)} đã sử dụng ${item.name}! 🍋`);
          // Thực hiện hành động tương ứng với item
          break;
        case 'Outfit mới':
          // TẠO POLL ĐỂ TARGET 1 ELEMENT VÀ TẠO API HỎI THÊM INFO CHO API
          await reaction.message.channel.send(`${addTag(user.id)} đã sử dụng ${item.name}! 🍭`);
          // Thực hiện hành động tương ứng với item 
          break;
        case 'Collab':
          // TẠO POLL ĐỂ TARGET 1 VTUMON VÀ TẠO API HỎI THÊM INFO CHO API
          await reaction.message.channel.send(`${addTag(user.id)} đã sử dụng ${item.name}! 🍬`);
          // Thực hiện hành động tương ứng với item
          break;
        default:
          break;
      }
    }; // Không có item nào được chọn
    // 🧹 Xóa poll sau khi đã xử lý
    if (isDeletePoll) {
      try {
        if (reaction.message.deletable) {
          await reaction.message.delete();
          // console.log('Đã xóa poll!');
        } else {
          console.warn('Không thể xóa pollMessage: Không có quyền hoặc không hợp lệ.');
        }
      } catch (error) {
        console.error('Lỗi khi xóa poll:', error);
      }
      global.activePollId = null;
    }
  }
});

client.once('ready', () => {
  console.log(`🟢 Bot online với tên ${client.user.tag}`);
});

client.login(process.env.TOKEN);
