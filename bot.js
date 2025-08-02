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

// Login To Bot
client.login(TOKEN);
