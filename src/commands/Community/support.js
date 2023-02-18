const {SlashCommandBuilder} = require('@discordjs/builders')
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("support")
    .setDescription("sends link to our support server"),

    async execute (interaction) {
        await interaction.reply({content: "`support server:` https://discord.gg/sskwmf4hkR"})
        .catch(err => {
            interaction.reply({content: "<:jinsoulcross:1076465842595844146> `there was a problem`", ephemeral: true})
        })
    }
}