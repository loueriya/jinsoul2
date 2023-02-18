const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("displays information about the server"),
    async execute (interaction) {
        const guild = interaction.guild
        const mc = guild.memberCount
        const name = guild.name
        const id = guild.id
        const pfp = guild.iconURL()
        const timestamp = guild.createdTimestamp
        const roles = guild.roles.cache.size
        const Embed = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription(`
        **${name}**
        memebr count: **${mc}** 
        id: **${id}**
        creation: **<t:${parseInt(timestamp / 1000)}:R>**
        roles: **${roles}**`)
        .setThumbnail(pfp)

        await interaction.reply({embeds: [Embed]})
        .catch(err => {
            interaction.reply({content: "<:jinsoulcross:1076465842595844146> `there was a problem`", ephemeral: true})
        })
    }
}