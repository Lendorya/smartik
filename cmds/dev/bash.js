module.exports = {
  name: "bash",
  aliases: ["bsh", "bh"],
  category: "Разработчик",
  description: "Выдает результат выполненого кода",
  usage: "c!bash",
  perms: {
    client: ["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if (cfg.devs.includes(message.author.id) == false) return message.fail("Извини, но данная команда доступна только разработчику")
    try {
        let out = require('child_process').execSync(args.join(' ')).toString('utf8') || "Чета не палучилась(("
        message.reply(`\`\`\`js\n${out.slice(0, 1900)}\`\`\`` || 'User ahuel but ne ahuel!', { split: "\n", code: 'bash' })
    } catch (err) {
         message.reply(err, { split: "\n", code: 'bash' })
    }
  }
}