const sqlite = require("sqlite3").verbose();

module.exports = async (guild, channel, client) => {
	// When call, check if today corresponds to a registered birthday

	const day = new Date().toLocaleString("fr-FR", {
		day: "numeric",
		month: "numeric"
	});
	today = day.split("/")[1] + "/" + day.split("/")[0];

	const db = new sqlite.Database("./src/db.db", sqlite.OPEN_READWRITE);

	const query = `SELECT username, userid, date FROM birthday WHERE date = ?`;
	db.all(query, [today], (error, results) => {
		if (error) {
			throw "Error : SELECT check anniv";
		}
		const gens = [];
		results.forEach(row => {
			gens.push(row.userid);
		});
		if (!results.length) {
			db.close();
			return;
		}
		client.users.fetch(gens[0]).then(user => {
			channel.send(
				`Aujourd'hui est un grand jour, c'est l'anniversaire de ${user} ! Joyeux anniversaire kupo ! ${client.emojis.cache.find(
					emoji => emoji.name === "moghappy"
				)}`
			);
		});

		if (results.length > 1) {
			for (let i = 1; i < results.length; i++) {
				client.users
					.fetch(gens[i])
					.then(user =>
						channel.send(
							`C'est aussi l'anniversaire de ${user} ! Joyeux anniversaire à toi aussi kupo ! 🎉`
						)
					);
			}
		}
		db.close();
		return;
	});
};
