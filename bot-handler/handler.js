const { readdirSync } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Загрузка команд");
table.setHeading("Команда", "Статус загрузки");

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => { // Папка из которой считывается основа для хендлера
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js")); // какого формата файл нам интересны
        for (let file of commands) { 
            let pull = require(`../commands/${dir}/${file}`); // Из ранее выбраной папки, будет искать ещё одни папки и в них файлы ранее выбранного формата
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅'); // Если загрузка файла пройдёт успешно, то мы получим это сообщение
            } else {
                table.addRow(file, `❌  -> ошибка, файл не был загружен.`); // Если загрузка файла пройдёт не успешно, то мы получим это сообщение
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name)); // Строение таблицы
        }
    })
    console.log(table.toString()) // Вывод в консоль
}