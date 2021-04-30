
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'random',
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        const Embed = new MessageEmbed()
        .setColor(0xFF0000)
        .setTitle(":no_entry_sign:┃ Ошибка")
        .setDescription(`**У тебя нету прав на выполнение этой команды**`)
        .setTimestamp()
        return message.channel.send(Embed).then(m => (m.delete({timeout: 3000})));
    }

    await message.channel.send(`\nВыпадает число - ${Math.floor(Math.random() * 25) + 1}`);

}}