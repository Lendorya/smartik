const { search } = require('../../Classes/Utils.js');
const fs = require("fs")
module.exports = {
  name: "reboot",
  aliases: ["load", "l"],
  category: "Разработчик",
  description: "Перезагружает команду",
  usage: "s.reboot",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if (cfg.devs.includes(message.author.id) == false) return message.fail("Извини, но данная команда доступна только разработчику")
    const { inspect } = require('util');
    const commandName = args[0].toLowerCase();

        const command =
            message.client.commands.get(commandName) ||
            message.client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );

        if (!command) {
            return message.reply({
                content: `Не могу найти комманду/алиас **\`${commandName}\`**.`,
            });
        }

        const commandFolders = fs.readdirSync("./cmds");

        const folderName = commandFolders.find((folder) =>
            fs.readdirSync(`./cmds/${folder}`).includes(`${command.name}.js`)
        );

        delete require.cache[
            require.resolve(`../${folderName}/${command.name}.js`)
        ];

        try {

            const newCommand = require(`../${folderName}/${command.name}.js`);

            message.client.commands.set(newCommand.name, newCommand);

            message.reply({
                content: `Комманда \`${newCommand.name}\` перезагружена!`,
            });
        } catch (error) {

            console.error(error);
            message.reply({
                content: `Упс.. произошла ошибка перезагрузки **\`${command.name}\`**. **\`\`\`${error.message}\`\`\`**`,
            });
        }
  }
}