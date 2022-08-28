const { hasProfile } = require('../../Classes/Utils.js');
const { createProfile } = require('../../Classes/Utils.js');

module.exports = {
  name: "bal",
  aliases: ["profile", "ebalance"],
  category: "Экономика",
  description: "Выдает ваш профиль",
  usage: "c!bal",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {

    if(await hasProfile(message.author.id, message.guild.id) == false) {
      let embed = {
        title: "Создаю профиль",
        description: `Ваш профиль в базе данных создается либо обновлется, пропишите команду еще раз`,
        color: cfg.color
      }
      message.reply({embeds: [embed]})
      await createProfile(message.author.id, message.guild.id)
    } else {
      let embed = {
        title: "Профиль",
        description: `Баланс: **${await db.get(`money_${message.guild.id}_${message.author.id}`)}$**`,
        color: cfg.color
      }
      message.reply({embeds: [embed]})
    }
  }
}