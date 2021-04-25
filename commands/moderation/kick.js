'use strict';

const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'kick',
  aliases: ['kick'],
  description: 'Кик пользователя',
  run: (client, message, args) => {
    const errorEmbed = require('../../Utils/error')
    if (!message.member.roles.cache.some(r => r.id == '655528442825015297') && !message.member.hasPermission('KICK_MEMBERS')) {
      return message.channel.send(errorEmbed(message.client, 'У вас нету прав на использование данной команды.')).then(d_msg => { 
        d_msg.delete({timeout: 10000})});
    }

    const member = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0]),
    );
    if (!member) {
      return message.channel.send(errorEmbed(message.client, 'Не удалось найти пользователя')).then(d_msg => { 
        d_msg.delete({timeout: 10000})});
    }
    const reason = args.slice(1).join(' ');
    if (member.hasPermission('KICK_MEMBERS')) {
      return message.channel.send(errorEmbed(message.client, 'У меня недостаточно прав для кика!')).then(d_msg => { 
        d_msg.delete({timeout: 10000})});
    }
      if (!reason) {
      return message.channel.send(errorEmbed(message.client, 'Вы не указали причину.')).then(d_msg => { 
        d_msg.delete({timeout: 10000})});
    }

    if (member.hasPermission('KICK_MEMBERS')) {
      return message.channel.send(errorEmbed(message.client, 'У меня недостаточно прав для кика!')).then(d_msg => { 
        d_msg.delete({timeout: 10000})});
    }
    member.send(new MessageEmbed() .setFooter('© Команда модерации | Informal') .setThumbnail(member.user.avatarURL({format: 'png', dynamic: true, size: 1024})).setAuthor(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 })) .setColor('RED').setTitle('Система выдачи kick') .setTimestamp() .setDescription(`**Вы были кикнуты!\nМодератор: ${message.author}\nПричина: ${reason}\nЕсли вы не согласны с наказанием, вы можете подать жалобу - [в этой теме](https://forum.robo-hamster.ru/forums/214/)**`))
    message.reply(
      new MessageEmbed()
        .setColor('#0094ef')
        .setTimestamp()
        .setFooter('© Команда модерации | Informal')
        .setThumbnail(member.user.avatarURL({ format: 'png', dynamic: true, size: 1024} ))
        .setAuthor(`${member.user.tag} был кикнут`, message.guild.iconURL({dynamic:true}))
        .addField('Модератор:', `${message.author}`)
        .addField('Причина', reason));
// Сообщение о кике
member.kick(reason + " / " + message.member.displayName);
    // Сообщение в ЛС кикнотому и кик с самого сервера
    return message.delete();
  },
};