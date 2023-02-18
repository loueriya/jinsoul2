const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require('discord.js')
const {QuickDB} = require('quick.db')
const db = new QuickDB()

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setwelcomechannel')
    .setDescription("allows you to set a channel where welcome messages will be sent")
    .addChannelOption(option => option.setName('channel').setDescription("choose a channel").setRequired(true)),
    async execute (interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "<:jinsoulcross:1076465842595844146> `you do not have the correct permissions to do that`", ephemeral:true})
        const channel = interaction.options.getChannel('channel')

        const embed = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription(`<:jinsoultick:1076465844407767051>  set welcome channel to ${channel}\nplease set a welcome message using **/setwelcomemessage** otherwise it won't work.`)
        await db.set(`welcchannel_${interaction.guild.id}`, channel.id)
        await interaction.reply({embeds: [embed]})
        .catch(err => {
            interaction.reply({content: "<:jinsoulcross:1076465842595844146> `there was an error`", ephemeral: true})
        })
    }
}