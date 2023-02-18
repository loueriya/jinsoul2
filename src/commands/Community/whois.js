const {SlashCommandBuilder} = require('@discordjs/builders')
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("whois")
    .setDescription("displays info about someone")
    .addUserOption(option => option.setName("user").setDescription("choose a user").setRequired(false)),
    async execute (interaction) {
        const user = interaction.options.getUser('user') || interaction.user
        const member = await interaction.guild.members.fetch(user.id)

        const Embed = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription(`
        about ${user}
        id: ${user.id}
        joined: <t:${parseInt(member.joinedAt / 1000)}:R>
        created: <t:${parseInt(user.createdAt / 1000)}:R>
        roles: ${member.roles.cache.map(r => r).join(" ")}`)
        .setThumbnail(user.displayAvatarURL())

        await interaction.reply({embeds: [Embed]})
        .catch(err => {
            interaction.reply({content: "<:jinsoulcross:1076465842595844146> `there was a problem`", ephemeral: true})
        })
    }
}