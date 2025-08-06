const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user by selecting them or entering their ID.')
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for banning')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Ban category (e.g., Spam, Harassment, etc.)')
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Select a user from the server')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('Enter a user ID manually')
                .setRequired(false)
        ),

    async execute(interaction) {
        // Permission Check
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return await interaction.reply({ content: 'You do not have permission to ban members.', ephemeral: true });
        }

        const reason = interaction.options.getString('reason');
        const category = interaction.options.getString('category');
        const userOption = interaction.options.getUser('user');
        const userIdOption = interaction.options.getString('userid');

        let targetId = null;

        if (userOption) {
            targetId = userOption.id;
        } else if (userIdOption) {
            targetId = userIdOption;
        } else {
            return await interaction.reply({ content: 'You must provide either a user or a user ID.', ephemeral: true });
        }

        // Attempt to Ban
        try {
            await interaction.guild.members.ban(targetId, { reason });
            await interaction.reply({ content: `Successfully banned <@${targetId}> (${targetId}) for: ${reason}` });
        } catch (error) {
            console.error(error);
            return await interaction.reply({ content: `Failed to ban user. Error: ${error.message}`, ephemeral: true });
        }

        // Log Ban to File
        try {
            const serverId = interaction.guild.id;
            const dirPath = path.join(__dirname, '..', 'data', 'servers', serverId);
            const filePath = path.join(dirPath, 'bans.json');

            // Ensure directory exists
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            // Read existing bans.json or create new
            let bans = [];
            if (fs.existsSync(filePath)) {
                const fileData = fs.readFileSync(filePath, 'utf-8');
                bans = JSON.parse(fileData);
            }

            // Append the new ban entry
            bans.push({
                userid: targetId,
                reason: reason,
                category: category
            });

            // Save back to bans.json
            fs.writeFileSync(filePath, JSON.stringify(bans, null, 2));
        } catch (err) {
            console.error(`Failed to log ban to file: ${err.message}`);
        }
    }
};
