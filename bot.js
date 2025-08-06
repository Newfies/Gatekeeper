// Packages
const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv").config();
const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionsBitField, 
        Permissions, Embed, Activity, ActivityType, ButtonBuilder, ButtonStyle, ActionRowBuilder, } = require("discord.js");
const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, ], });

// Local
const log = require('./utils/logger.js');

// Variables
const TOKEN = process.env.TOKEN;

// Load Commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'Commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Register Commands to Collection
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        log(`Loaded command: ${command.data.name}`, 'success');
    } else {
        log(`Command at ${filePath} is missing "data" or "execute".`, 'warn');
    }
}

// Register Slash Commands at Runtime
client.once(Events.ClientReady, async () => {
    log(`${client.user.tag} is now running!`, 'infot');

    for (const [name, command] of client.commands) {
        try {
            await client.application.commands.create(command.data);
            log(`Registered slash command: /${name}`, 'success');
        } catch (error) {
            log(`Failed to register command /${name}: ${error}`, 'error');
        }
    }
});

// Handle Slash Commands
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
        log(`Executed command: ${interaction.commandName}`, 'info');
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
    }
});

// Login To Bot
client.login(TOKEN);
