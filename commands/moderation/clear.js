'use strict';
const { MessageEmbed } = require('discord.js');
// НЕ ЮЗАЙ ПОКА, САМ ПОТОМ СДЕЛАЮ ЗАЕБИСЬ.
module.exports = {
    name: 'clearing',
    aliases: ['clearing'],
    description: 'Удалять сообщения',
    run: (client, message, args) => {
    const errorEmbed = require('../../Utils/error')
    var myid = "449699809700610049"; 
    if (!message.member.roles.cache.some(r => r.id == '655528442825015297') && !message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send(errorEmbed(message.client, 'У вас нету прав на использование данной команды.')).then(d_msg => { 
          d_msg.delete({timeout: 10000})});
      }
      let del = args[0] // число
      if (!del)
  return message.channel.send(errorEmbed(message.client, 'Укажите пожалуйста кол-во сообщений, которые вы хотите удалить')).then(d_msg => { 
    d_msg.delete({timeout: 10000})});

  if(del < 2)
  return message.channel.send(errorEmbed(message.client, 'Укажите пожалуйста кол-во сообщений больше 2')).then(d_msg => { 
    d_msg.delete({timeout: 10000})});

  if(del > 100)
  return message.channel.send(errorEmbed(message.client, 'Укажите пожалуйста кол-во сообщений меньше 100')).then(d_msg => { 
    d_msg.delete({timeout: 10000})});

message.reply(
    new MessageEmbed()
      .setColor('#0094ef')
      .setTimestamp()
      .setFooter('© Команда модерации | Informal')
      .setAuthor(`Очистка сообщений`, message.guild.iconURL({dynamic:true}))
      .setDescription(`**Удалено cледующее количество сообщений: \`${del}\` \nМодератор: ${message.author}**`)) .then(d_msg => { 
        d_msg.delete({timeout: 10000})});
        message.channel.bulkDelete(args[0]) // удаляем число сообщений
      }}