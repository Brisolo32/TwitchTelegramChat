//	Probably will stop updating this and make it a discord bot
//	instead. If i do make it into a discord bot it will def be
//	better
//		- Brisolo


process.env.NTBA_FIX_319 = 1;

const tmi = require('tmi.js');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const prompt = require('prompt-sync')({sigint: true});
var channel = prompt('Channel to listen for messages: ');

const teletoken = process.env.API_TOKEN;
const chatId = process.env.CHAT_ID;
const deb = process.env.DEBUG;

var twitchbotname = 'Put your TwitchBot token here'
var oauthtoken = 'Put your oauth token here'

const bot = new TelegramBot(teletoken, { polling: true });

const client = new tmi.Client({
	options: { debug: deb },
    connection: {
        reconnect: true
    },
	identity: {
		username: twitchbotname,
		password: oauthtoken
	},
	channels: [ channel ]
});

client.connect();

client.once('connected', () => {
	bot.sendMessage(chatId, `<b>Connected to ${channel}</b>`, { parse_mode: 'HTML' });
});

client.on('message', (channel, tags, message, self) => {
    bot.sendMessage(chatId, `<b>${tags['display-name']}:</b> ${message}`,{parse_mode : "HTML"});
});
		
