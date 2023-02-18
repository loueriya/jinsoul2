const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require('discord.js')
const {QuickDB} = require('quick.db')
const db = new QuickDB()

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setautorole')
    .setDescription("allows you to set a role that people recieve when they join the server")
    .addRoleOption(option => option.setName('role').setDescription("choose a role").setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "<:jinsoulcross:1076465842595844146> `you do not have the correct permissions to do that`"})
        const role = interaction.options.getRole('role')
        await db.set(`autorole_${interaction.guild.id}`, role.id)

        const embed = new EmbedBuilder()
        .setColor("2f3135")
        .setDescription(`<:jinsoultick:1076465844407767051> set auto-role to ${role}`)
        await interaction.reply({embeds: [embed]})
        .catch(err => {
            interaction.reply({content: "<:jinsoulcross:1076465842595844146> `there was an error`", ephemeral: true})
        })
    }
}