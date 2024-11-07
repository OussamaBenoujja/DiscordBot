const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Displays your profile picture.'),
	async execute(interaction) {
		const user = interaction.user;
		const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 1024 });

		await interaction.reply(`${user.username}'s Profile Picture: ${avatarUrl}`);
	},
};
