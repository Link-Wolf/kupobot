const {MessageEmbed} = require("discord.js");

module.exports = {
	name: "help",
	description: "Send embed with all availables commands and functions",
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
		const embed = new MessageEmbed()
			.setTitle("KupoBot : commandes et fonctionnalités :")
			.setAuthor(message.author.username, message.author.avatarURL())
			.setColor("ff0000")
			.setDescription(
				"Voici la liste de ce que je suis capable de faire kupo !"
			)
			.setFooter(
				"by @Link#7689",
				"https://cdn.discordapp.com/avatars/238655993330925568/8bcbdb5c4a899fab668612c850893428.webp?size=128"
			)
			.setThumbnail(
				"https://cdn.discordapp.com/avatars/855416697019170817/d63450942c93c849f93b3711e0a122ab.webp?size=128"
			)
			.addFields(
				{
					name: "Réagis à vos messages",
					value:
						"\n- Aux différentes salutations kupo\n- Aux questions existentielles que vous vous posez\n- A tous vos autres messages kupo\n- Et même à vos ``quoi ?`` (ffeur) !\n"
				},
				{
					name: "Commandes",
					value: `\n\`\`${pref}help\`\` :\n - Obtenir les infos à mon propos kupo ! (vous êtes déjà en train de le lire)\n\n\`\`${pref}suggestion [votre proposition]\`\` :\n - Enregistre vos propositions d'améliorations et ajouts pour toujours m'améliorer kupo !\n\n\`\`${pref}annivset [jour 1-31]/[mois 1-12]\`\` :\n - Enregistre votre date d'anniversaire pour vous le souhaiter le jour j kupo !`
				}
			);
		message.channel.send({embed});
	}
};
