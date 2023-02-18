const { SlashCommandBuilder} = require('@discordjs/builders')
const {default: axios} = require("axios")
const {EmbedBuilder, PermissionsBitField} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("steal")
    .setDescription("allows u steal emojis from other servers")
    .addStringOption(option => option.setName("emoji").setDescription("choose an emoji to steal").setRequired(true))
    .addStringOption(option => option.setName("name").setDescription("set a name for the emoji").setRequired(true)),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) return await interaction.reply({content: "`you dont have permissions to do that`", ephemeral: true})

        let emoji = interaction.options.getString('emoji')?.trim()
        const name = interaction.options.getString('name')

        if (emoji.startsWith("<") && emoji.endsWith(">")) {
            const id = emoji.match(/\d{15,}/g)[0]

            const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
            .then(image => {
                if (image) return "gif"
                else return "png"
            }).catch(err => {
                return "png"
            })

            emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
        }

        if (!emoji.startsWith("http")) {
            return await interaction.reply({content: "`you cant steal default emojis`", ephemeral: true})
        }

        if (!emoji.startsWith("https")) {
            return await interaction.reply({content: "`you cant steal default emojis`", ephemeral: true})
        }

        interaction.guild.emojis.create({ attachment: `${emoji}`, name: `${name}`})
        .then(emoji =>{
            const embed = new EmbedBuilder()
            .setColor("2f3136")
            .setDescription(`<:jinsoultick:1076465844407767051> added ${emoji}`)

           return interaction.reply({embeds: [embed]})
        }).catch(err => {
            interaction.reply({content: "<:jinsoulcross:1076465842595844146> `cant add emoji because server has reached it's limit`", ephemeral: true})
        })
    }
}