const discord = require('discord.js');
const botConfig = require('./conf.json');
const mysql = require('mysql');
const isImageUrl = require('is-image-url');

const fs = require('fs');

const bot = new discord.Client({
	ws: {
		intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_WEBHOOKS"]
	}
});
bot.commands = new discord.Collection();

// if the bot is ready say it is online and fill in the little playing
// thingy you have on discord when you are playing an game
bot.on('ready', async () => {
	console.log(`${bot.user.username} is online`);

	bot.user.setActivity('you ;) (also *help)', { type: 'LISTENING' });
});

// if a message is sent
bot.on('message', async message => {

	// if bot sends a message return
	if (message.author.bot) return;

	if (message.content === '*help') {
		return message.channel.send(
			"The bot is simple. For every message you sent there is a 1/10 chance you get a random (and publicly available) picture from the prime minister of the Netherlands: Mark Rutte. \nIf you either use: Rutte, Mark, Markie or one of the secret words in your message the chances will go up to 1/5. \nThe bot draws from a database of 250+ pictures that it randomly chooses from every time it gets a chance to react to you. \nIt's a silly bot for good reaction images that you can have fun with. \nWant more Rutte in your server? Use this link to invite him: https://discord.com/oauth2/authorize?client_id=692139313848254564&scope=bot."
		);
	} else {
		var rutte = message.content.includes('rutte');
		var Rutte = message.content.includes('Rutte');
		var RUTTE = message.content.includes('RUTTE');

		var mark = message.content.includes('mark');
		var Mark = message.content.includes('Mark');
		var MARK = message.content.includes('MARK');

		var markie = message.content.includes('markie');
		var Markie = message.content.includes('Markie');
		var MARKIE = message.content.includes('MARKIE');

		var markje = message.content.includes('markje');
		var Markje = message.content.includes('Markje');
		var MARKJE = message.content.includes('MARKJE');

		var daddy = message.content.includes('daddy');
		var Daddy = message.content.includes('Daddy');
		var DADDY = message.content.includes('DADDY');

		var gekoloniseerd = message.content.includes('gekoloniseerd');
		var Gekoloniseerd = message.content.includes('Gekoloniseerd');
		var GEKOLONISEERD = message.content.includes('GEKOLONISEERD');

		var papa = message.content.includes('papa');
		var Papa = message.content.includes('Papa');
		var PAPA = message.content.includes('PAPA');

		var vader = message.content.includes('vader');
		var Vader = message.content.includes('Vader');
		var VADER = message.content.includes('VADER');

		var caroliene = message.content.includes('caroliene');
		var Caroliene = message.content.includes('Caroliene');
		var CAROLIENE = message.content.includes('CAROLIENE');

		if (
			rutte === true ||
			Rutte === true ||
			RUTTE === true ||
			mark === true ||
			Mark === true ||
			MARK === true ||
			markie === true ||
			Markie === true ||
			MARKIE === true ||
			markje === true ||
			Markje === true ||
			MARKJE === true ||
			daddy === true ||
			Daddy === true ||
			DADDY === true ||
			gekoloniseerd === true ||
			Gekoloniseerd === true ||
			GEKOLONISEERD === true ||
			papa === true ||
			Papa === true ||
			PAPA === true ||
			vader === true ||
			Vader === true ||
			VADER === true
		) {
			var randomRutte = Math.floor(Math.random() * 5) + 1;

			if (randomRutte === 1) {
				sendRutte()
			}
		} else if (caroliene === true || Caroliene === true || CAROLIENE === true) {
			sendRutte()
		} else {
			var random = Math.floor(Math.random() * 10) + 1;

			if (random == 1) {
				sendRutte()
			}
		}
	}

	function sendRutte() {
		var con = mysql.createConnection({
			host: botConfig.host,
			user: botConfig.user,
			password: botConfig.password,
			database: botConfig.database,
		});

		con.query(`SELECT * FROM mark`, function (err, rows) {
			// if there is a error, throw it my way
			if (err) {
				throw err;
			}

			var rand = Math.floor(Math.random() * rows.length);

			return message.channel.send({
				files: [rows[rand].link],
			});
		});
	}
});

bot.login(botConfig.token);
