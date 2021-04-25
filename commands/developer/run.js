const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'run',
    aliases: ['run'],
    description: 'Запуск кода',
    run: (client, message, args) => {

        client.on('message', message => {
            const rolesToRemove = [
                "[-] Samparo" // добавляешь роли через запятую, на пример: const rolesToRemove = ["[-] Samparo","ещё роль","ещё роль"]
              ];
              const lmember = message.guild.roles.cache.find(r => r.id === '835801927992344597'); // общая роль легал мемберс
              const errorEmbed = require('../../Utils/error')
             let logChannel = message.guild.channels.cache.find((c) => c.id == "789602745312477194"); // id лог канала (ПОМЕНЯЕШЬ!)
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
    let cmdrun = args.slice(0).join(" ");
    var myid = "449699809700610049"; 
    var Nedolbaeb = "691701692256878632";
    if (message.author.id != myid && message.author.id != Nedolbaeb)
    return;
      
    try {
        eval(cmdrun);
    } catch (err) {
        message.reply(`**\`произошла ошибка: ${err.name} - ${err.message}\`**`);
    }
  } 
}

