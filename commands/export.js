const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('discord.js');

function generateCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('export')
        .setDescription('Export bans from this server as a shareable code')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Category to filter bans by')
                .setRequired(false)
        ),

    async execute(interaction) {
        const serverId = interaction.guild.id;
        const categoryFilter = interaction.options.getString('category');

        const bansFile = path.join(__dirname, '..', 'data', 'servers', serverId, 'bans.json');

        if (!fs.existsSync(bansFile)) {
            return interaction.reply({ content: 'No bans found for this server.', flags: 64 });
        }

        let bans = [];
        try {
            const data = fs.readFileSync(bansFile, 'utf-8');
            bans = JSON.parse(data);
        } catch (err) {
            return interaction.reply({ content: 'Failed to read bans data.', flags: 64 });
        }

        // Filter by category if provided
        if (categoryFilter) {
            bans = bans.filter(ban => ban.category && ban.category.toLowerCase() === categoryFilter.toLowerCase());
            if (bans.length === 0) {
                return interaction.reply({ content: `No bans found with category "${categoryFilter}".`, flags: 64 });
            }
        }

        // Generate Code & Save to exports folder
        const exportCode = generateCode();
        const exportPath = path.join(__dirname, '..', 'data', 'exports');
        if (!fs.existsSync(exportPath)) {
            fs.mkdirSync(exportPath, { recursive: true });
        }

        fs.writeFileSync(path.join(exportPath, `${exportCode}.json`), JSON.stringify(bans, null, 2));

        return interaction.reply({
            content: `Export successful. Use this code to import bans:\n\`${exportCode}\``,
            flags: 64,
        });
    }
};
