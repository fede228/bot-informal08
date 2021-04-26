const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "mpstart",
    category: "moderation",
    run: async (client, message, args) => {
        if (!message.member.roles.cache.some(r => r.id == '836283243401445416') && !message.member.hasPermission('MANAGE_MESSAGES')) {
            message.react("🚫")
            const Embed = new MessageEmbed()
            .setColor(0xFF0000)
            .setTitle("🚫┃ Ошибка")
            .setDescription(`**У тебя нету прав на выполнение этой команды**`)
            .setTimestamp()
            return message.channel.send(Embed).then(m => (m.delete({timeout: 3000})));
        }
        if (!args[0]) {
            message.react("🛑")
            const embed = new MessageEmbed()
            .setTitle(`🛑┃ Ошибка`)
            .setDescription(`**Выберите количество выйграваемых коинов от 1 до 1000**`)
            .setColor(0xFF0000)
            return message.channel.send(embed).then(m => (m.delete({timeout: 3000})));
        }
   
        let wincoin;

        if (parseInt(args[0]) > 1000 ) {
            wincoin = 1000;
        } else {
            wincoin = parseInt(args[0]);
        }
        message.delete()
        const embed = new MessageEmbed()
            .setTitle(`**Мероприятие**`)
            .setDescription(`**Приветствуем уважаемые пользователи, сейчас пройдёт мероприятие числа.\nВ этом мероприятие вы должны написать в чат число от 1 до 25 и вы сможете получить за это приз.\n\nВедущий: ${message.member}**\n**Приз:** \`${wincoin} coins\``)
            .setColor('BLACK')
            .setImage('https://i.imgur.com/9L97RUL.gif')
            .setFooter(`Модераторы могут использовать реакции ниже, для взаимодействия`)
            const msg = await message.channel.send(embed);
         await msg.edit(embed)
         await msg.react('⚠️')
         await msg.react('🗑')
         const filter = (reaction, user) => (reaction.emoji.name === '🗑' || reaction.emoji.name === '⚠️') && (user.id === message.author.id);
         msg.awaitReactions(filter, { max: 1 })
             .then((collected) => {
                 collected.map((emoji) => {
                     switch (emoji._emoji.name) {
                         case '⚠️':
                            const embed = new MessageEmbed()
                            .setTitle(`**Мероприятие числа**`)
                            .setDescription(`**Мероприятие закончилось**`)
                            .setImage('https://i.imgur.com/9L97RUL.gif')
                            .setColor(`RED`)
                            message.channel.send(embed).then(message => message.edit(embed))
                         case '🗑':
                             msg.delete()
                             break;
                     }
                 })
             })
            
    }
}