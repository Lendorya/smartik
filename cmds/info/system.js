const { version } = require("discord.js");
const { get } = require("systeminformation");
const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "system",
  aliases: ["sys", "si"],
  usage: "c!stats",
  description: "Выдает информацию о системе",
  category: "Информация",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async(client,message,args) => {
        get({
            "system": "manufacturer, model",
            "cpu": "manufacturer, brand, speed, cores, physicalCores",
            "cpuTemperature": "main",
            "mem": "total, used",
            "osInfo": "platform, arch"
        }).then((data) => {
            const systemManufacturer = data.system.manufacturer;
            const systemModel = data.system.model;
            const cpuManufacturer = data.cpu.manufacturer;
            const cpuBrand = data.cpu.brand;
            const cpuSpeed = data.cpu.speed;
            const cpuCores = data.cpu.cores;
            const cpuPhysicalCores = data.cpu.physicalCores;
    
            const cpuTempMain = data.cpuTemperature.cpuTempMain;
    
            const memUsed = (data.mem.used / 1024 / 1024).toFixed(2);
            const memTotal = (data.mem.total / 1024 / 1024).toFixed(2);
            
    
    
            const osPlatform = data.osInfo.platform;
            const osArch = data.osInfo.arch;
            const systemEmbed = new EmbedBuilder()
                .setTitle("Информация о системе")
                .setDescription("Все ниже")
                .setColor(cfg.color)
                .addFields([
                    {
                        "name": "Node.js Version",
                        "value": "```" + process.version + "```"
                    },
                    {
                        "name": "CPU",
                        "value": "```" + (cpuManufacturer ? (cpuManufacturer + " " + cpuBrand + ", " + cpuSpeed + "GHz " + cpuCores + " Ядер " + cpuPhysicalCores + " Потока") : "a") + "```"
                    },
                    {
                        "name": "ОЗУ",
                        "value": "```" + (memUsed && memTotal ? (memUsed + " / " + memTotal + "MB") : "b") + "```"
                    }
                ]);
    
            message.reply({
                "embeds": [systemEmbed]
            });
        });
  }
}