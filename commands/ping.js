const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong! See the bot\'s latency.')
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Should the reply be private (only you can see it)?')
                .setRequired(false)
        ),

    async execute(interaction) {
        const isEphemeral = interaction.options.getBoolean('ephemeral') ?? true;

        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true, ephemeral: isEphemeral });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;

        await interaction.editReply({ content: `Pong! 🏓 Latency is ${latency}ms.` });
    }
};
