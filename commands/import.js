const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('import')
        .setDescription('Import bans using a code')
        .addStringOption(option =>
            option.setName('code')
                .setDescription('Export code provided by /export')
                .setRequired(true)
        ),

    async execute(interaction) {
        const serverId = interaction.guild.id;
        const code = interaction.options.getString('code').toUpperCase();

        const importFile = path.join(__dirname, '..', 'data', 'exports', `${code}.json`);
        const serverBansFile = path.join(__dirname, '..', 'data', 'servers', serverId, 'bans.json');

        if (!fs.existsSync(importFile)) {
            return interaction.reply({ content: 'Invalid code. No export found.', flags: 64 });
        }

        let importedBans = [];
        try {
            importedBans = JSON.parse(fs.readFileSync(importFile, 'utf-8'));
            if (!Array.isArray(importedBans)) throw new Error('Invalid export data.');
        } catch (err) {
            return interaction.reply({ content: 'Failed to read import data.', flags: 64 });
        }

        // Load existing server bans (if exists)
        let existingBans = [];
        if (fs.existsSync(serverBansFile)) {
            try {
                existingBans = JSON.parse(fs.readFileSync(serverBansFile, 'utf-8'));
                if (!Array.isArray(existingBans)) existingBans = [];
            } catch {
                existingBans = [];
            }
        }

        // Merge bans without duplicates (keyed by userid)
        const banMap = new Map();
        for (const ban of existingBans) banMap.set(ban.userid, ban);
        for (const ban of importedBans) banMap.set(ban.userid, ban);

        const mergedBans = Array.from(banMap.values());

        // Ensure /data/servers/[server id]/ exists
        const serverDir = path.dirname(serverBansFile);
        if (!fs.existsSync(serverDir)) {
            fs.mkdirSync(serverDir, { recursive: true });
        }

        // Write the updated bans.json
        fs.writeFileSync(serverBansFile, JSON.stringify(mergedBans, null, 2));

        return interaction.reply({
            content: `Successfully imported ${importedBans.length} bans into this server.`,
            flags: 64,
        });
    }
};
