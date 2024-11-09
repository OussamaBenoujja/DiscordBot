const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls a random number between a specified range.')
		.addIntegerOption(option =>
			option.setName('min')
				.setDescription('Minimum number')
		)
		.addIntegerOption(option =>
			option.setName('max')
				.setDescription('Maximum number')
		),
	async execute(interaction) {
		const min = interaction.options.getInteger('min') || 1;
		const max = interaction.options.getInteger('max') || 100;
		const roll = Math.floor(Math.random() * (max - min + 1)) + min;
		await interaction.reply(`🎲 You rolled a ${roll}`);
	},
};
