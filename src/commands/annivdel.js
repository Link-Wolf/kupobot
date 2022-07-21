const sqlite = require("sqlite3").verbose();

module.exports = {
	name: "annivdel",
	description: "Delete a saved birthday",
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
		if (args.length != 1 || !message.mentions.users.first())
			throw "Trop ou trop peu d'argument pour suppression d'anniv";
		if (!message.member.hasPermission("ADMINISTRATOR"))
			return message.reply(
				"Pour limiter les abus, cette commande est réservée aux admins kupo, n'hésite pas à contacter Link notamment ! (mais ne les ping pas tous kupo)"
			);

		////////// Sqlite db part, not fully working on the current hosting system //////////

		const db = new sqlite.Database("./src/db.db", sqlite.OPEN_READWRITE);

		const id = message.mentions.users.first().id;

		const query = `SELECT * FROM birthday WHERE userid = ?`;
		db.get(query, [id], (error, result) => {
			if (error) {
				throw "Error : SELECT del anniv";
			}

			if (!result) {
				return message.channel.send(
					"Tu ne peux pas supprimer cet anniversaire si la personne ne l'a pas enregistrée kupo !"
				);
			}
			/*
            const deletedata = db.run('DELETE FROM birthday WHERE userid = ?', [id]);
            db.close();
            */
			const server = message.guild.name;
			const annivChannel = client.guilds.cache
				.get("453159761639112704")
				.channels.cache.get("862629198777679872");
			annivChannel.send(
				`${new Date().toLocaleString()} sur [${server}]\nSupprimer anniv de ${
					args[0]
				} (${message.mentions.users.first().id})`
			);
			return message.channel.send(
				"J'aurai bien oublié son anniversaire sous peu kupo !... mais je ne serai plus capable de le rappeler au reste du monde kupo.."
			);
		});
	}
};
