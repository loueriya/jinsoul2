const {SlashCommandBuilder} = require('@discordjs/builders')
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("displays someones avatar")
    .addUserOption(option => option.setName("user").setDescription("choose a user").setRequired(false)),
    async execute (interaction) {
        const user = interaction.options.getUser('user') || interaction.user

        const Embed = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription(`${user}'s avatar`)
        .setImage(user.displayAvatarURL({size: 512}))

        await interaction.reply({embeds: [Embed]})
        .catch(err => {
            interaction.reply({content: "<:jinsoulcross:1076465842595844146> `there was a problem`", ephemeral: true})
        })
    }
}