const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require('discord.js')
const {QuickDB} = require('quick.db')
const db = new QuickDB()

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setwelcomemessage')
    .setDescription("allows you to set a message for new members joining the server")
    .addStringOption(option => option.setName('description').setDescription("make a message for new members").setRequired(true)),
    async execute (interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "<:jinsoulcross:1076465842595844146> `you do not have the correct permissions to do that`", ephemeral:true})
        const description = interaction.options.getString('description')

        const embed = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription(`<:jinsoultick:1076465844407767051>  set welcome message to\n"${description}`)
        await db.set(`welcmessage_${interaction.guild.id}`, description)
        await interaction.reply({embeds: [embed]})
        .catch(err => {
            interaction.reply({content: "<:jinsoulcross:1076465842595844146> `there was an error`", ephemeral: true})
        })
    }
}