const { hasProfile } = require('../../Classes/Utils.js');
const { createProfile } = require('../../Classes/Utils.js');
const ms = require("ms")

module.exports = {
  name: "work",
  aliases: ['w'],
  category: "Экономика",
  description: "Способ получения денег",
  usage: "c!work",
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
      if(await db.get(`workCd_${message.guild.id}_${message.author.id}`)+300000>Date.now()) {
        let cdembed = {
              title: "⌛ Задержка",
              description: `Пожалуйста подождите \`${ms(300000-(Date.now()-(await db.get(`workCd_${message.guild.id}_${message.author.id}`))))}\``,
              color: cfg.color
      }
      message.reply({embeds: [cdembed]});
      } else {
        
        let coins;
            let f = [
              "Большое",
              "Среднее",
              "Маленькое"
            ]
            let rand = f[Math.floor((Math.random() * f.length))]
            if (rand == "Большое") coins = Math.floor((Math.random() * (50-30+1)+30))
            if (rand == "Среднее") coins = Math.floor((Math.random() * (40-20+1)+20))
            if (rand == "Маленькое") coins = Math.floor((Math.random() * (30-10+1)+10))
        await db.add(`money_${message.guild.id}_${message.author.id}`, coins)
        await db.set(`workCd_${message.guild.id}_${message.author.id}`, Date.now())
        let embed = {
          title: "Работаем",
          description: `Вы долго работали и получили ${coins}$\nБаланс: **${await db.get(`money_${message.guild.id}_${message.author.id}`)}$**`,
          color: cfg.color
        }
        message.reply({embeds: [embed]})
      }
    }
  }
}