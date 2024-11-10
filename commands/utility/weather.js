const { SlashCommandBuilder } = require('discord.js');
const https = require('https');

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
		const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your OpenWeather API key
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

		https.get(url, (response) => {
			let data = '';

			// Collect data chunks
			response.on('data', (chunk) => {
				data += chunk;
			});

			// Handle the end of the response
			response.on('end', async () => {
				const weatherData = JSON.parse(data);

				if (weatherData.cod !== 200) {
					await interaction.reply(`Could not find weather data for ${city}.`);
					return;
				}

				const weather = weatherData.weather[0].description;
				const temp = weatherData.main.temp;

				await interaction.reply(`The weather in ${city} is currently ${weather} with a temperature of ${temp}°C.`);
			});
		}).on('error', async (error) => {
			console.error(error);
			await interaction.reply('There was an error fetching the weather data. Please try again later.');
		});
	},
};
