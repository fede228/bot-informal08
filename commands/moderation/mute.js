'use strict';

const { MessageEmbed } = require('discord.js');
const ms = require('ms');
module.exports = {
  name: 'mute',
  aliases: ['mute'],
  description: 'Мутить людей',
  run: async (client, message, args) => {
    
    const memberToMute = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0]),
    );

    const errorEmbed = require('../../Utils/error')

    if (!message.member.roles.cache.some(r => r.id == '655528442825015297') && !message.member.hasPermission('MANAGE_ROLES')) {
      return message.channel.send(errorEmbed(message.client, 'У вас нету прав на использование данной команды.')).then(d_msg => { 
        d_msg.delete({timeout: 10000})});
    }

    if (!memberToMute) {
      return message.channel.send(errorEmbed(message.client, 'Не удалось найти пользователя')).then(d_msg => { 
        d_msg.delete({timeout: 10000})});
    }
    const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

    if (memberToMute.hasPermission('MANAGE_ROLES')) {
      return message.channel.send(errorEmbed(message.client, 'У меня недостаточно прав для мута!')).then(d_msg => { 
        d_msg.delete({timeout: 10000})});
    }

  
    if (!muteRole) {
      return message.channel.send(errorEmbed(message.client, 'Роль для мута не была найдена!')).then(d_msg => { 
        d_msg.delete({timeout: 10000})});
    }

    // Сделать проверку на валидность указанного времени
    const muteTime = args[1];
    if (!muteTime) {
      return message.channel.send(errorEmbed(message.client, 'Вы не указали время для мута.')).then(d_msg => { 
        d_msg.delete({timeout: 10000})});
    }
    let time = timestoi(message.content.split(/ +/)[2]);

    const reason = args.slice(2).join(' ');
    if (!reason) {
      return message.channel.send(errorEmbed(message.client, 'Вы не указали причину мута.')).then(d_msg => { 
        d_msg.delete({timeout: 10000})});
    }
    const MutedEmbed = new MessageEmbed()
    .setColor('#7fff00')
    .setTimestamp()
    .setFooter('© Команда модерации | Informal')
    .setThumbnail(memberToMute.user.avatarURL({ format: 'png', dynamic: true, size: 1024} ))
    .setAuthor(`${memberToMute.user.tag} был замучен на ${timeitos(time)}`, message.guild.iconURL({dynamic:true}))
    .setDescription(`**Модератор: ${message.author}\nПричина: \`${reason}\`**`)
  message.reply(MutedEmbed);
// Отправка сообщения в тот же чат, где была прописана команда.
memberToMute.send(new MessageEmbed() .setFooter('© Команда модерации | Informal') .setThumbnail(memberToMute.user.avatarURL({format: 'png', dynamic: true, size: 1024})).setAuthor(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 })) .setColor('RED').setTitle('Система выдачи mute') .setTimestamp() .setDescription(`**Вы были замучены на \`${timeitos(time)}\`\nМодератор: ${message.author}\nПричина: \`${reason}\`\nЕсли вы не согласны с наказанием, вы можете подать жалобу - [в этой теме](https://forum.robo-hamster.ru/forums/214/)**`))
// отправка сообщения в лс
  await memberToMute.roles.add(muteRole.id);

  setTimeout(() => memberToMute.roles.remove(muteRole.id), ms(muteTime));
  return message.delete();
},
};


function timestoi(a) {
  if (a.endsWith('h')) {
      return a.slice(0, -1) * 60 * 60 * 1000
  } else if (a.endsWith('m')) {
      return a.slice(0, -1) * 60 * 1000
  } else if (a.endsWith('s')) {
      return a.slice(0, -1) * 1000
  } else return -1;
}

function endsWithAny(suffixes, string) {
  return suffixes.some(function (suffix) {
      return string.endsWith(suffix);
  });
}


function timeitos(s) {
  let ms = s % 1000;
  s = (s - ms) / 1000;
  let secs = s % 60;
  s = (s - secs) / 60;
  let mins = s % 60;
  s = (s - mins) / 60;
  let hrs = s % 24;
  s = (s - hrs) / 24;
  let days = s;
  let output = '';


  if (days != 0) {
      if (days.toString().endsWith('1') && !days.toString().endsWith('11')) {
          output = days + ' день ';
      } else if (endsWithAny(['2', '3', '4'], days.toString()) && !endsWithAny(['12', '13', '14'], days.toString())) {
          output += days + ' дня ';
      } else {
          output += days + ' дней ';
      }
  }
  if (hrs != 0) {
      if (hrs.toString().endsWith('1') && !hrs.toString().endsWith('11')) {
          output += hrs + ' час ';
      } else if (endsWithAny(['2', '3', '4'], hrs.toString()) && !endsWithAny(['12', '13', '14'], hrs.toString())) {
          output += hrs + ' часа ';
      } else {
          output += hrs + ' часов ';
      }
  }
  if (mins != 0) {
      if (mins.toString().endsWith('1') && !mins.toString().endsWith('11')) {
          output += mins + ' минута ';
      } else if (endsWithAny(['2', '3', '4'], mins.toString()) && !endsWithAny(['12', '13', '14'], mins.toString())) {
          output += mins + ' минуты ';
      } else {
          output += mins + ' минут ';
      }
  }

  if (secs != 0) {
      if (secs.toString().endsWith('1') && !secs.toString().endsWith('11')) {
          output += secs + ' секунда ';
      } else if (endsWithAny(['2', '3', '4'], secs.toString()) && !endsWithAny(['12', '13', '14'], secs.toString())) {
          output += secs + ' секунды ';
      } else {
          output += secs + ' секунд ';
      }
  }
  if (output == '') output = "0 секунд"
  return output;
}