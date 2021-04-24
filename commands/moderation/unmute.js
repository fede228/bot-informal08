'use strict';

const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'unmute',
  aliases: ['unmute'],
  description: 'Размут команда',
  run: (client, message) => {
    const errorEmbed = require('../../Utils/error')
    if (!message.member.roles.cache.some(r => r.name == '🛠️ • Модератор • 🛠️') && !message.member.hasPermission('MANAGE_ROLES')) {
      return message.channel.send(errorEmbed(message.client, 'У вас нету прав на использование данной команды.')).then(d_msg => { 
        d_msg.delete({timeout: 10000})});
    }

    if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
      return message.channel.send(errorEmbed(message.client, 'У меня недостаточно прав для размута.')).then(d_msg => { 
        d_msg.delete({timeout: 10000})});
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(errorEmbed(message.client, 'Не удалось найти пользователя')).then(d_msg => { 
        d_msg.delete({timeout: 10000})});
    }

    let muterole = message.guild.roles.cache.find(x => x.name === 'Muted').then(d_msg => { 
      d_msg.delete({timeout: 10000})});


    if (user.roles.cache.has(muterole)) {
      return message.channel.send(errorEmbed('Пользователь не замучен.')).then(d_msg => { 
        d_msg.delete({timeout: 10000})});
    }

    user.roles.remove(muterole);

    message.reply(
      new MessageEmbed()
        .setColor('#8c11ca')
        .setTimestamp()
      .setFooter('© Команда модерации | Informal')
      .setThumbnail(user.user.avatarURL({ format: 'png', dynamic: true, size: 1024} ))
        .setAuthor(`${user.user.tag} был размучен`, message.guild.iconURL({dynamic:true}))
        .addField('Модератор:', `${message.author}`)
    );
    return message.delete();
  },
};