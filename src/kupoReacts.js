const {helloWords} = require("../config.json");
module.exports = async (message, ownerID, client) => {
	//Possible special react if i want do do something with my (owner) messages
	if (
		message.author.id == ownerID &&
		message.content.toLowerCase().includes("TestKupo")
	) {
		return message.send("");
	}

	//Answer if someone ping the bot
	if (/<@!855416697019170817>|<@855416697019170817>/.test(message.content)) {
		return message.reply("Qu'y a-t-il ? Pas besoin de me mentionner Kupo!");
	}

	//React to some "hello" words listed in the config files to answer
	if (
		helloWords.some(word => message.content.toLowerCase().includes(word)) &&
		message.content.toLowerCase().includes("kupo")
	) {
		if (message.author.id == ownerID)
			return message.channel.send(
				`Salutations à vous aussi cher créateur-kupo !`
			);
		return message.channel.send(
			`Bonjour à toi aussi ${message.author.username}-kupo !`
		);
	}

	//React if the message contains "kupo" & "?" to answer like a 8-ball
	if (
		message.content.toLowerCase().includes("kupo") &&
		message.content.toLowerCase().includes("?")
	) {
		const random = Math.floor(Math.random() * 2);
		if (random == 1) {
			return message.channel.send("Kupo ! ❤️");
		} else {
			return message.channel.send("Kupo kupo....");
		}
	}

	//Detect "quoi" to simply answer "-feur"
	if ((message.content.toLowerCase().match(/(\w+)\W*$/) || [])[1] == "quoi") {
		return message.channel.send("ffeur kupo");
	}

	//Detect "hein" to simply answer "deux ? trois kupo ?"
	if ((message.content.toLowerCase().match(/(\w+)\W*$/) || [])[1] == "hein") {
		return message.channel.send("deux ? trois kupo ?");
	}

	//Detect "kupo" and answer among various possibles things, desactivate in the main channel
	if (
		message.channel.id != "310741557391261706" &&
		message.content.toLowerCase().includes("kupo")
	) {
		const rdm = Math.floor(Math.random() * 6);
		switch (rdm) {
			case 0:
				message.channel.send("... Kupo ?");
				break;
			case 1:
				message.channel.send("Kupo !");
				break;
			case 2:
				message.channel.send("Kupo.");
				break;
			case 3:
				message.channel.send("Kupo ?!");
				break;
			case 4:
				message.channel.send("Kupo.. ❤️");
				break;
			case 5:
				const mog = client.emojis.cache.find(
					emoji => emoji.name === "moghappy"
				);
				message.channel.send(`Kupo! ${mog}`);
				break;
		}
		return;
	}
};
