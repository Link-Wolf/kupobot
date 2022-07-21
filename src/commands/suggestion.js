module.exports = {
	name: "suggestion",
	description: "Save users suggestions to improve the bot",
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
		if (args.length < 1) throw "Mauvais arguments pour suggestion";

		const server = message.guild.name;
		const date = new Date().toLocaleString();
		const author = message.author.username;
		const content = message.content.slice(pref.length + 10).trim();

		const sendDM = client.users.fetch(ownerID);
		sendDM.then(function(owner) {
			owner.send(`${date}\n[${server}], de : ${author}\n${content}`);
		});

		const date2 = new Date().toLocaleString().prototype.getDay();

		////////// Json storage part, not working on the current hosting system //////////
		/*
        const date = new Date().toLocaleString();
		const ideas = JSON.parse(readFileSync("./suggestion.json", "utf8"));
        ideas[date] = {
            author: message.author.username,
            content: message.content.slice(pref.length+10).trim()
        }
        writeFile("./suggestion.json", JSON.stringify(ideas, null, 2), (err) => {
            if (err) console.error(err)
        });
        */

		message.channel.send(`C'est noté kupo !`);
	}
};
