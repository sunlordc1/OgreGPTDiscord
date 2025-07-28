require('dotenv').config();
const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const room = require('./room');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
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

client.once('ready', () => {
  console.log(`🟢 Bot online với tên ${client.user.tag}`);
});

client.login(process.env.TOKEN);
