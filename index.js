"use strict";
const port = process.env.PORT || 5000;

// Import the discord.js module
const {Client, Collection} = require("discord.js");

//Import the rest
const {readdirSync, readFileSync, writeFile} = require("fs");
const {token, prefix, ownerID} = require("./config.json");
const kupoReacts = require("./src/kupoReacts.js");
const sqlite = require("sqlite3").verbose();
const cron = require("node-cron");
const checkanniv = require("./src/annivcheck.js");

// Create an instance of a Discord client & Discord collection (commands) + fill it
const client = new Client();
client.commands = new Collection();

const commandFiles = readdirSync("./src/commands").filter(file =>
	file.endsWith(".js")
);

for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	client.commands.set(command.name, command);
}

//Ready event, execute when bot starts
client.on("ready", () => {
	client.user.setActivity(
		`${prefix}help | Actuellement sur ${client.guilds.cache.size} serveurs`
	);

	////////// Sqlite db part, not working on the current hosting system //////////
	/*
  const db = new sqlite.Database('./db.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
  db.run('CREATE TABLE IF NOT EXISTS birthday(userid TEXT NOT NULL PRIMARY KEY, username TEXT NOT NULL, server TEXT NOT NULL, date TEXT NOT NULL)');
  */

	const checkBirthday = cron.schedule(
		"00 00 09 * * *",
		() => {
			// Runs every day at 09:00:00
			const guild = client.guilds.cache.get("310741557391261706");
			const channel = guild.channels.cache.get("310741557391261706");
			console.log("index juste avant check");
			checkanniv(guild, channel, client);
			const kupoBirthdayCheck = new Date(2000, 5, 18);
			if (
				new Date().getDate() == kupoBirthdayCheck.getDate() &&
				new Date().getMonth() + 1 == kupoBirthdayCheck.getMonth()
			)
				channel.send(
					`Aujourd'hui est un jour encore plus spécial que les autres, c'est mon propre anniversaire rien qu'à moi kupo ! ${client.emojis.cache.find(
						emoji => emoji.name === "moghappy"
					)}`
				);
		},
		{
			timezone: "Europe/Paris"
		}
	);
	checkBirthday.start();
	console.log("I am ready!");
});

// This event triggers when the bot joins a guild.
client.on("guildCreate", guild => {
	client.user.setActivity(
		`${prefix}help | Actuellement sur ${client.guilds.cache.size} serveurs`
	);
});

// This event triggers when the bot is removed from a guild.
client.on("guildDelete", guild => {
	client.user.setActivity(
		`${prefix}help | Actuellement sur ${client.guilds.cache.size} serveurs`
	);
});

// This event triggers when any message is sent.
client.on("message", message => {
	if (message.author.bot) return;
	if (message.content.startsWith(prefix)) {
		const args = message.content
			.slice(prefix.length)
			.trim()
			.split(/ +/);
		const command = args.shift().toLowerCase();

		if (!client.commands.has(command)) return;

		try {
			client.commands
				.get(command)
				.execute(
					message,
					args,
					readFileSync,
					writeFile,
					ownerID,
					client,
					prefix
				);
		} catch (error) {
			console.error(error);
			message.reply(
				"Une erreur est survenue, m'as tu transmis les bonnes informations pour cette commande kupo ?"
			);
		}
	} else if (
		message.author.id == ownerID ||
		message.content.toLowerCase().includes("kupo") ||
		message.content.toLowerCase().includes("quoi")
	) {
		kupoReacts(message, ownerID, client);
	}
});

client.login(token);
