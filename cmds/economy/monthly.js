const { hasProfile } = require('../../Classes/Utils.js');
const { createProfile } = require('../../Classes/Utils.js');
const ms = require("ms")

module.exports = {
  name: "monthly",
  aliases: [],
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
      if(await db.get(`monthlyCd_${message.guild.id}_${message.author.id}`)+(86400000*31)>Date.now()) {
        let cdembed = {
              title: "⌛ Задержка",
              description: `Пожалуйста подождите \`${ms((86400000*31)-(Date.now()-(await db.get(`monthlyCd_${message.guild.id}_${message.author.id}`))))}\``,
              color: cfg.color
      }
      message.reply({embeds: [cdembed]});
      } else {
        
        let coins = 2000
            let rand = f[Math.floor((Math.random() * f.length))]
            if (rand == "Большое") coins = Math.floor((Math.random() * (8100-4050+1)+4050))
            if (rand == "Среднее") coins = Math.floor((Math.random() * (2700-1350+1)+1350))
            if (rand == "Маленькое") coins = Math.floor((Math.random() * (900-450+1)+450))
        coins = coins * 3
        await db.add(`money_${message.guild.id}_${message.author.id}`, coins)
        await db.set(`monthlyCd_${message.guild.id}_${message.author.id}`, Date.now())
        let embed = {
          title: "Ежемесячный бонус",
          description: `Вы получили ежемесячную премию в размере ${coins}$\nБаланс: **${await db.get(`money_${message.guild.id}_${message.author.id}`)}$**`,
          color: cfg.color
        }
        message.reply({embeds: [embed]})
      }
    }
  }
}