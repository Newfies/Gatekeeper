const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Simple ping command!'),
        
    async execute(interaction) {
        await interaction.reply({ content: "Pong!", ephemeral: true });
    }
};
