const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rak-khdam')
		.setDescription('wa7d ccommaand bach ndir test lbot!'),
	async execute(interaction) {
		await interaction.reply('Yup!');
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};