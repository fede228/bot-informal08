const { MessageEmbed } = require('discord.js') // Вывод сообщения об ошибки
module.exports = (client, message) => {
    let emojis = ["🤨", "🧐", "🌚", "👁️", "🤖", "🥴", "👻", "👀", "😥", "😱"] // Набор эмодзи для выбора
    var random_emoji = Math.floor(Math.random() * emojis.length); // Выбор рандомного эмодзи из набора
    return new MessageEmbed() // Сообщение об ошибки
    .setColor('RED')
    .setDescription(`**${message}**`)
    .setTitle(`${emojis[random_emoji]} | **Произошла ошибка**`)
    .setFooter('ERROR | © Команда модерации | Informal')
    .setTimestamp()
}