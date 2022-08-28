const { get } = require("systeminformation");
const {cpu} = require('node-os-utils');
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
    get({
            "cpu": "manufacturer, brand, speed, cores, physicalCores",
            "mem": "total, used",
        }).then(async(data) => {
            const cpuManufacturer = data.cpu.manufacturer;
            const cpuBrand = data.cpu.brand;
            const cpuSpeed = data.cpu.speed;
            const cpuCores = data.cpu.cores;
            const cpuPhysicalCores = data.cpu.physicalCores;
    
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

    let ping;
    if (client.ws.ping<300) ping = `:green_circle:`
    else if (client.ws.ping<600) ping = `:yellow_circle:`
    else if (client.ws.ping<1400) ping = `:orange_circle:`
    else if (client.ws.ping<1700) ping = `:red_circle:`
    else if (client.ws.ping>1700) ping = `:black_circle:`
    let c = await cpu.free()
    let embed = {
      title: "Статистика бота",
      fields: [
      {name: "Основное", value: `\`\`\`asciidoc\nПинг API :: ${client.ws.ping}ms\nПинг бота :: ${Date.now() - message.createdTimestamp}ms\nАптайм :: ${up}\nСерверов :: ${client.guilds.cache.size}\nПользователи :: ${client.users.cache.size}\nРазработчик :: ${de.join(", ")}\`\`\``,inline: true},
      
      {name: "Сервера", value: `\`\`\`asciidoc\nПлатформа :: ${require('os').platform} ${require('os').arch}\nПроцессор :: ${cpuManufacturer} ${cpuBrand}\nЯдер :: ${cpuCores}\nПотоков :: ${cpuPhysicalCores}\nДоступно :: ${c.toFixed(2)}% \nОЗУ :: ${memUsed && memTotal ? (memUsed + "MB / " + memTotal + "MB") : "b"}\`\`\``,inline: true}
      ],
      color: cfg.color
    }
    message.reply({embeds:[embed]})
    })
  }
}