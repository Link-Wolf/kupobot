const annivcheck = require("../annivcheck");

const sqlite = require("sqlite3").verbose();

module.exports = {
	name: "annivset",
	description: "Save birthday if not already save",
	execute(
		message,
		args,
		readFileSync,
		writeFile,
		ownerID,
		client,
		pref,
		birthdays
	) {
		if (args.length != 1)
			throw "Mauvais arguments pour enregistrement d'anniv";

		const dateTest = message.content
			.slice(pref.length + 8)
			.trim()
			.split("/");
		const date = new Date(
			2000,
			dateTest[1] - 1,
			dateTest[0]
		).toLocaleString("fr-FR", {day: "numeric", month: "numeric"});

		////////// Sqlite db part, not fully working on the current hosting system //////////

		const db = new sqlite.Database("./src/db.db", sqlite.OPEN_READWRITE);

		const query = `SELECT * FROM birthday WHERE userid = ?`;
		db.get(query, [message.author.id], (error, result) => {
			if (error) {
				throw "Error : SELECT set anniv";
			}

			if (!result) {
				/*
                const inserdata = db.prepare("INSERT INTO birthday VALUES(?,?,?,?)")
                inserdata.run(message.author.id, message.author.username, message.guild.name, date);
                inserdata.finalize();
                db.close();
                */
				const server = message.guild.name;
				const annivChannel = client.guilds.cache
					.get("453159761639112704")
					.channels.cache.get("862629198777679872");
				annivChannel.send(
					`${new Date().toLocaleString()} sur [${server}]\nAjouter anniv de ${
						message.author.username
					} (${message.author.id}) au : ${date}`
				);
				return message.channel.send(
					`Entendu ! Ton anniversaire sera très prochainement sauvegardé au ${date} kupo !`
				);
			}
			const actualDate =
				result.date.split("/")[1] + "/" + result.date.split("/")[0];
			db.close();
			return message.channel.send(
				`Ton anniversaire est déjà enregistré au ${actualDate} kupo! Si tu as besoin de le changer, demande à Link ou à un admin de le supprimer.`
			);
		});
	}
};
