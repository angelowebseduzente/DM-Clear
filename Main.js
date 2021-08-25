const Discord = require('discord.js');
const colors = require('colors');
const config = require('./config.json')
const client = new Discord.Client();

client.on("ready", () => {
    console.log(colors.cyan(`



            ▄████████  ▄█          ▄████████    ▄████████    ▄████████ 
            ███    ███ ███         ███    ███   ███    ███   ███    ███ 
            ███    █▀  ███         ███    █▀    ███    ███   ███    ███ 
            ███        ███        ▄███▄▄▄       ███    ███  ▄███▄▄▄▄██▀ 
            ███        ███       ▀▀███▀▀▀     ▀███████████ ▀▀███▀▀▀▀▀   
            ███    █▄  ███         ███    █▄    ███    ███ ▀███████████ 
            ███    ███ ███▌    ▄   ███    ███   ███    ███   ███    ███ 
            ████████▀  █████▄▄██   ██████████   ███    █▀    ███    ███ 
                       ▀                                     ███    ███ 
                       `));
     console.log(colors.white(`                   DM Clear connected in: ${client.user.username}`));
});

client.on("message", async (message) => {

    if (message.author.id == client.user.id && message.content.startsWith(".purge")) { // Here you can change the command to clear messages
        const max = 50 // Each 1 is 100, so 50 are the last 5000 messages
        let lastMessageID;
        for (let a = 0; a < max; a++) {
            const messages = await message.channel.fetchMessages({ limit: 10, before: lastMessageID });
            lastMessageID = messages.last().id;

            const mymessages = messages.filter(m => m.author.id === message.author.id).array()

            console.log(colors.green(`  [$] - Message deleted`));

            for (let msg of mymessages) {
                await msg.delete().catch(() => { })
            }
        }
    }
});

client.login(config.token);