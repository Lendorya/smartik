module.exports = {
  name: "eval",
  aliases: ["e", "ev"],
  category: "Разработчик",
  description: "Выдает результат выполненого кода",
  usage: "c!eval",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if (cfg.devs.includes(message.author.id) == false) return message.fail("Извини, но данная команда доступна только разработчику")
  const { inspect } = require('util');
  const { MessageEmbed } = require('discord.js');

  let code = args.join(" ")
  try {
    let preEval = process.hrtime.bigint();
    let evaled = await eval(code);
    let lastEval = process.hrtime.bigint();
  if (typeof evaled !== "string") evaled = inspect(evaled);
    if (evaled.includes(process.env.TOKEN) == true) {
      let evalerror = {
        title: "Ошибочка вышла",
        description: "\`\`\`js\nTi Eblan Error: client.token is secret информация\n\`\`\`",
        color: cfg.color
    }
    message.reply({embeds:[evalerror]});
    } else if (evaled.includes(process.env.URL) == true) {
      let evalerror = {
        title: "Ошибочка вышла",
        description: "\`\`\`js\nTi Eblan Error: client.db.URL is secret информация\n\`\`\`",
        color: cfg.color
    }
    message.reply({embeds:[evalerror]});
    } else {
      message.reply(`Код был выполнен за \`${Date.now() - message.createdTimestamp}ms\`\n\`\`\`js\n${evaled.slice(0, 1900)}\`\`\``, { code: "js" });
    }
  } catch(e) {
    let evalerror = {
        title: "Ошибочка вышла",
        description: "\`\`\`js\n" + e + "\n\`\`\`",
        color: cfg.color
    }
    message.reply({embeds:[evalerror]});
  }
}}