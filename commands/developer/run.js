  
module.exports = {
    name: 'run',
    aliases: ['run'],
    description: 'Запуск кода',
    run: (client, message, args) => {
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