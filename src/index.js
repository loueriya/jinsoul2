const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField,Collection, Events } = require(`discord.js`);
const fs = require('fs');
const {QuickDB} = require('quick.db')
const db = new QuickDB()
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] }); 

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();

client.on(Events.GuildMemberAdd, async (member) => {
    const role = await db.get(`autorole_${member.guild.id}`)
    const giverole = await member.guild.roles.cache.get(role)
    member.roles.add(giverole)
})

client.on(Events.GuildMemberAdd, async (member) => {
    const message = await db.get(`welcmessage_${member.guild.id}`)
    const channelID = await db.get(`welcchannel_${member.guild.id}`)
    const channel = member.guild.channels.cache.get(channelID)
    const newmember = member.id
    
    if (channelID == null) return
    if (message == null) return
    channel.send(`${message}`)
})