const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('apply')
    .setDescription('Apply all bans from bans.json to this server'),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return await interaction.reply({ content: 'You do not have permission to ban members.', ephemeral: true });
    }

    const serverId = interaction.guild.id;
    const bansFile = path.join(__dirname, '..', 'data', 'servers', serverId, 'bans.json');

    if (!fs.existsSync(bansFile)) {
      return interaction.reply({ content: 'No bans data found for this server.', ephemeral: true });
    }

    let bans;
    try {
      const data = fs.readFileSync(bansFile, 'utf-8');
      bans = JSON.parse(data);
      if (!Array.isArray(bans)) throw new Error('Bans file is invalid.');
    } catch (err) {
      return interaction.reply({ content: 'Failed to read bans data.', ephemeral: true });
    }

    await interaction.deferReply({ ephemeral: true });

    let successCount = 0;
    let failCount = 0;
    for (const banEntry of bans) {
      try {
        // Try to ban user by ID
        await interaction.guild.members.ban(banEntry.userid, { reason: banEntry.reason });
        successCount++;
      } catch (error) {
        console.error(`Failed to ban ${banEntry.userid}:`, error.message);
        failCount++;
      }
    }

    await interaction.editReply({
      content: `Ban application complete.\nSuccessfully banned: ${successCount}\nFailed to ban: ${failCount}`,
    });
  },
};
