const { hasProfile } = require('../../Classes/Utils.js');
const { createProfile } = require('../../Classes/Utils.js');
const ms = require("ms")

module.exports = {
  name: "bonus",
  aliases: ["daily"],
  category: "Экономика",
  description: "Способ получения денег",
  usage: "c!bonus",
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
      if(await db.get(`dailyCd_${message.guild.id}_${message.author.id}`)+86400000>Date.now()) {
        let cdembed = {
              title: "⌛ Задержка",
              description: `Пожалуйста подождите \`${ms(86400000-(Date.now()-(await db.get(`dailyCd_${message.guild.id}_${message.author.id}`))))}\``,
              color: cfg.color
      }
      message.reply({embeds: [cdembed]});
      } else {
        
        let coins = 500
        await db.add(`money_${message.guild.id}_${message.author.id}`, coins)
        await db.set(`dailyCd_${message.guild.id}_${message.author.id}`, Date.now())
        let embed = {
          title: "Ежедневный бонус",
          description: `Вы получили ежедневную премию в размере ${coins}$\nБаланс: **${await db.get(`money_${message.guild.id}_${message.author.id}`)}$**`,
          color: cfg.color
        }
        message.reply({embeds: [embed]})
      }
    }
  }
}