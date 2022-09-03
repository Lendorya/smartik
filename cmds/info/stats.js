const { get } = require("systeminformation");
const { cpu } = require('node-os-utils');
module.exports = {
  name: "stats",
  aliases: ["bot", "bs"],
  usage: "c!stats",
  description: "Выдает статистику бота",
  category: "Информация",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async(client,message,args) => {
    let a = await db.all()
    let msg = await message.reply("Получаю информацию..") 
    get({
            "cpu": "manufacturer, brand, speed, cores, physicalCores",
            "mem": "total, used",
        }).then(async(data) => {
            const cpuManufacturer = data.cpu.manufacturer;
            const cpuBrand = data.cpu.brand;
            const cpuCores = data.cpu.cores;
    
            const memUsed = (data.mem.used / 1024 / 1024).toFixed(2);
            const memTotal = (data.mem.total / 1024 / 1024).toFixed(2);
            
    let weeks = Math.floor(client.uptime / 604800000)
    let days = Math.floor(client.uptime / 86400000) % 7
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    let de = [] 
    cfg["devs"].forEach(value => {
      let dev = client.users.cache.get(value)
      de.push(`${dev.tag}`)
    })
    let up;
    if (weeks == 0 && days == 0 && hours == 0 && minutes == 0) up = `${seconds}с`
    else if (weeks == 0 && days == 0 && hours == 0) up = `${minutes}м ${seconds}с`
    else if (weeks == 0 && days == 0) up = `${hours}ч ${minutes}м ${seconds}с`
    else if (weeks == 0) up = `${days}д ${hours}ч ${minutes}м ${seconds}с`
    else up = `${weeks} ${days}д ${hours}ч ${minutes}м ${seconds}с`
    let c = await cpu.free()
    let embed = {
      title: "Статистика бота",
      fields: [
      {
       name: "Основное", 
       value: `\`\`\`asciidoc
Пинг API     :: ${client.ws.ping}ms
Пинг бота    :: ${Date.now() - message.createdTimestamp}ms
Аптайм       :: ${up}
Серверов     :: ${client.guilds.cache.size}
Пользователи :: ${client.users.cache.size}
Разработчик  :: ${de.join(", ")}
\`\`\``,inline: true},
      
      {
        name: "Сервера", 
        value: `\`\`\`asciidoc
Платформа    :: ${require('os').platform} ${require('os').arch}
Процессор    :: ${cpuManufacturer} ${cpuBrand}
Ядер         :: ${cpuCores}
Доступно     :: ${c.toFixed(2)}%
ОЗУ (занято) :: ${memUsed}MB
ОЗУ (всего)  :: ${memTotal}MB
\`\`\``,inline: true},

        {
          name: "База данных",
          value: `\`\`\`asciidoc
База Данных  :: quick.db
Версия       :: ^9.0.6
Ключей в БД  :: ${a.length}\`\`\``,
          inline: false
        }
      ],
      color: cfg.color
    }
      setTimeout(async() => {
        await msg.edit({content: "", embeds: [embed]})
      }, 1500)
      
    })
  }
}