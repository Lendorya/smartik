const { hasProfile } = require('../Classes/Utils.js');
const { createProfile } = require('../Classes/Utils.js');
module.exports = {
  event: "messageCreate",
  run: async(client,message) => {
    let user = `${message.guild.id}_${message.author.id}`
    let guild = `${message.guild.id}`
    if(await hasProfile(message.author.id, message.guild.id) == false) {
      await createProfile(message.author.id, message.guild.id)
    } else {

      let prefix = "s."
      if (message.content.startsWith(prefix) == true) return;
      if (message.author.bot == true) return;


      if(await db.get(`xp_${user}`) >= (await db.get(`lvl_${user}`) * 300)) {
        if (await db.get(`channelLvl_${guild}`) == "message") {
          await db.set(`xp_${user}`, (await db.get(`xp_${user}`) - (300 * await db.get(`lvl_${user}`))))
          await db.add(`lvl_${user}`, 1)
          await db.set(`need_${user}`, (await db.get(`lvl_${user}`) * 300))
          try {
            await message.channel.send("Поздравим <@" + message.author.id + "> с " + await db.get(`lvl_${user}`) + " уровнем")
          } catch(e) { 
            return;
          }
        } else if (await db.get(`channelLvl_${guild}`) == "none") {
          await db.set(`xp_${user}`, (await db.get(`xp_${user}`) - (300 * await db.get(`lvl_${user}`))))
          await db.add(`lvl_${user}`, 1)
          await db.set(`need_${user}`, (await db.get(`lvl_${user}`) * 300))
        } else {
          const channel = message.guild.channels.get(await db.get(`channelLvl_${guild}`)) 
          await db.set(`xp_${user}`, (await db.get(`xp_${user}`) - (300 * await db.get(`lvl_${user}`))))
          await db.add(`lvl_${user}`, 1)
          await db.set(`need_${user}`, (await db.get(`lvl_${user}`) * 300))
          channel.send("Поздравим <@" + message.author.id + "> с " + await db.get(`lvl_${user}`) + " уровнем")
        }
      } else {
        await db.add(`xp_${user}`, Math.floor((Math.random() * 10) + 1))
        await db.add(`alvl_${user}`, Math.floor((Math.random() * 10) + 1))
      }
    }
    
  }
}