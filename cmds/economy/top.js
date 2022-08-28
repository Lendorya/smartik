let actionmoney = (async(message, client) => {
  let database = await db.all()
  let top = []
  database.forEach(async(a) => {
    if (a.id.includes("money") && a.id.includes(message.guild.id)) {
      let data = a.id.split("_")
      data.push(a.value)
      if(data[3] == 0) return;
      let u;
      try {
        u = client.users.cache.get(data[2]).tag
      } catch(e) {
        u = "Неизвестно (" + data[2] + ")"
      }
      top.push({user: u, money: data[3]})
    }
  })
  let forEmbed = []
  let embedValue = 1
  top = await top.sort(function (a, b) {
  if (a.money > b.money) {
    return -1;
  }
  if (a.money < b.money) {
    return 1;
  }
  return 0;
});
  top.forEach(async(b) => {
    if(embedValue == 10 || b.money == 0) return;
    forEmbed.push({name:`**[${embedValue}]** ${b.user}`, value:` **— ${b.money}$**`})
    embedValue++
  })
  if(forEmbed.length == 0) {
    forEmbed = [{name: "Пусто", value: "да"}]
    return forEmbed
  } else return forEmbed
})

let actionlvl = (async(message,client) => {
  let database = await db.all()
  let top = []
  let top2 = []
database.forEach(async(a) => {
    if (`${a.id[0]}${a.id[1]}${a.id[2]}` == "lvl" && a.id.includes(message.guild.id)) {
      let data = a.id.split("_")
      data.push(a.value)
      if(data[3] == 0) return;
      let u;
      try {
        u = client.users.cache.get(data[2]).tag
      } catch(e) {
        return;
      };
      top.push({user: data[2], lvl: data[3]})
    }
  })
  let forEmbed = []
  let embedValue = 1
  top = await top.sort(function (a, b) {
  if (a.lvl > b.lvl) {
    return -1;
  }
  if (a.lvl < b.lvl) {
    return 1;
  }
  return 0;
});
  for (let b of top) {
    if(client.users.cache.get(b.user).bot == false && embedValue <= 20 && !cfg.blacklist.includes(b.user)) {
      forEmbed.push({name:`**[${embedValue}]** ${client.users.cache.get(b.user).tag}`, value:` **— ${b.lvl}lvl** | [ ${await db.get(`xp_${message.guild.id}_${b.user}`)} / ${await db.get(`need_${message.guild.id}_${b.user}`)} ]`})
      embedValue++
    }
  }
  if(forEmbed.length == 0) {
    forEmbed = [{name: "Пусто", value: "да"}]
    return forEmbed
  } else return forEmbed
})

module.exports = {
  name: "top",
  aliases: ["lb", "leaderboard"],
  category: "Экономика",
  description: "Выдает топ участников",
  usage: "c!top",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if (args[0] == "money") {
      let values = await actionmoney(message, client)
  
      let embed = {
          title: "Топ по деньгам",
          fields: values,
          color: cfg.color
        }
        message.reply({embeds: [embed]})
    } else if (args == "lvl") {
      let values = await actionlvl(message, client)
  
      let embed = {
          title: "Топ по уровню",
          fields: values,
          color: cfg.color
        }
        message.reply({embeds: [embed]})
    } else {
      message.fail("Попробуйте указать money/lvl")
    }
  }
}