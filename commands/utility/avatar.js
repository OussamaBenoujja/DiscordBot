const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Displays the profile picture of a specified user.')
		.addUserOption(option => 
			option.setName('target')
				.setDescription('The user to show the avatar of')
		),
	async execute(interaction) {
		// Get the specified user, or fall back to the command issuer if none is specified
		const user = interaction.options.getUser('target') || interaction.user;
		const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 1024 });

		await interaction.reply(`${user.username}'s Profile Picture: ${avatarUrl}`);
	},
};
