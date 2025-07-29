require('dotenv').config();
const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const game = require('./3-model/game').default;
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
  if (
    global.activePollId &&
    reaction.message.id === global.activePollId &&
    !global.pollClosed &&
    !user.bot
  ) {
    global.pollClosed = true;
    // Lấy lại pollMessage từ id
    switch (reaction.emoji.name) {
      case '🍎':
        await reaction.message.channel.send(`${addTag(user.id)} đã chọn Skip! 🍎`);
        break;
      case '🍌':
        await reaction.message.channel.send(`${addTag(user.id)} đã chọn Skills! 🍌`);
        break;
      case '🍇':
        await reaction.message.channel.send(`${addTag(user.id)} đã chọn Items! 🍇`);
        break;
      case '🍉':
        await reaction.message.channel.send(`${addTag(user.id)} đã chọn Swap! 🍉`);
        break;
      default:
        return; // Không xử lý emoji khác
    }
    // await reaction.message.channel.send(
    //   `Poll đã đóng! Người đầu tiên vote là ${addTag(user.id)} với lựa chọn ${reaction.emoji.name}`
    // );
    // 🧹 Xóa poll sau khi đã xử lý
    try {
      if (reaction.message.deletable) {
        await reaction.message.delete();
        console.log('Đã xóa poll!');
      } else {
        console.warn('Không thể xóa pollMessage: Không có quyền hoặc không hợp lệ.');
      }
    } catch (error) {
      console.error('Lỗi khi xóa poll:', error);
    }
    global.activePollId = null;
  }
});

client.once('ready', () => {
  console.log(`🟢 Bot online với tên ${client.user.tag}`);
});

client.login(process.env.TOKEN);
