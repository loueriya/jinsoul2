const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require('discord.js')
const {QuickDB} = require('quick.db')
const db = new QuickDB()

module.exports = {
    data: new SlashCommandBuilder()
    .setName('removewelcomechannel')
    .setDescription("allows you to remove the current welcome channel"),
    async execute (interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "<:jinsoulcross:1076465842595844146> `you do not have the correct permissions to do that`"})

        const embed = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription(`<:jinsoultick:1076465844407767051> removed welcome channel`)
        await db.delete(`welcchannel_${interaction.guild.id}`)
        await interaction.reply({embeds: [embed]})
        .catch(err => {
            interaction.reply({content: "<:jinsoulcross:1076465842595844146> `there was an error`", ephemeral: true})
        })
    }
}