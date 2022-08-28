const { hasProfile } = require('../../Classes/Utils.js');
const { createProfile } = require('../../Classes/Utils.js');
module.exports = {
  name: "lvl",
  category: "Информация",
  description: "Выдает лвл участника",
  perms: {
    client:["EmbedLinks", "AttachFiles"],
    user: []
  },
  usage: "s.lvl",
  run: async(client,message,args) => {
    const canvacord = require("canvacord");
     const img = message.author.avatarURL({size: 2048, dynamic: true}).replace("webp", "png")
    const Discord = require("discord.js")
    if(await hasProfile(message.author.id, message.guild.id) == false) {
      let embed = {
        title: "Создаю профиль",
        description: `Ваш профиль в базе данных создается либо обновлется, пропишите команду еще раз`,
        color: cfg.color
      }
      message.reply({embeds: [embed]})
      await createProfile(message.author.id, message.guild.id)
    } else {
      let database = await db.all()
    let top = []
  database.forEach(async(a) => {
    if (`${a.id[0]}${a.id[1]}${a.id[2]}` == "lvl" && a.id.includes(message.guild.id)) {
      let data = a.id.split("_")
      data.push(a.value)
      if(data[3] == 0) return;
      let u;
      try {
        u = client.users.cache.get(data[2]).tag
      } catch(e) {
        u = "Неизвестно (" + data[2] + ")"
      }
      top.push({user: data[2], lvl: `${data[3]}`})
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
    top.forEach(async(b) => {
      if(embedValue == 10) return;
      forEmbed.push({name:`${embedValue}`,value:`${b.user}`})
      embedValue++
    })
    let mesto = 0
    forEmbed.forEach((b) => {
      if(b.value == message.author.id) mesto = b.name
      else return;
    })
    const rank = new canvacord.Rank()
        .setAvatar(img)
        .setCurrentXP(parseInt(await db.get(`xp_${message.guild.id}_${message.author.id}`)))
        .setRequiredXP(parseInt(await db.get(`need_${message.guild.id}_${message.author.id}`)))
      .setLevel(parseInt(await db.get(`lvl_${message.guild.id}_${message.author.id}`)))
        .setStatus(message.member.presence.status)
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator)
        .setRank(parseInt(mesto));
    
    rank.build()
        .then(data => {
            const attachment = new Discord.AttachmentBuilder(data, "RankCard.png");
            message.reply({files:[attachment]});
        });
    }
  }
}