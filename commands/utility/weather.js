const { SlashCommandBuilder } = require('discord.js');
const https = require('https');
require('dotenv').config(); // Load environment variables from .env

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Gets the current weather for a specified city.')
		.addStringOption(option =>
			option.setName('city')
				.setDescription('Enter the name of the city')
				.setRequired(true)),
	async execute(interaction) {
		const city = interaction.options.getString('city');
		const apiKey = process.env.WEATHERAPI_KEY; // Fetch the API key from environment variables

		if (!apiKey) {
			await interaction.reply('API key is missing. Please set it in the .env file.');
			return;
		}

		const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

		https.get(url, (response) => {
			let data = '';

			// Collect data chunks
			response.on('data', (chunk) => {
				data += chunk;
			});

			// Handle the end of the response
			response.on('end', async () => {
				const weatherData = JSON.parse(data);

				if (weatherData.error) {
					await interaction.reply(`Could not find weather data for ${city}.`);
					return;
				}

				const weather = weatherData.current.condition.text;
				const temp = weatherData.current.temp_c;

				await interaction.reply(`The weather in ${city} is currently ${weather} with a temperature of ${temp}°C.`);
			});
		}).on('error', async (error) => {
			console.error(error);
			await interaction.reply('There was an error fetching the weather data. Please try again later.');
		});
	},
};
