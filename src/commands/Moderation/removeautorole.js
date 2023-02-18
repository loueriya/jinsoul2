const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require('discord.js')
const {QuickDB} = require('quick.db')
const db = new QuickDB()

module.exports = {
    data: new SlashCommandBuilder()
    .setName('removeautorole')
    .setDescription("allows you to remove the current auto-role"),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "<:jinsoulcross:1076465842595844146> `you do not have the correct permissions to do that`"})
        await db.delete(`autorole_${interaction.guild.id}`)

        const embed = new EmbedBuilder()
        .setColor("2f3135")
        .setDescription(`<:jinsoultick:1076465844407767051> removed auto-role`)
        await interaction.reply({embeds: [embed]})
        .catch(err => {
            interaction.reply({content: "<:jinsoulcross:1076465842595844146> `there was an error`", ephemeral: true})
        })
    }
}