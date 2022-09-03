const { promisify } = require('util');
const glob = require('glob');
const consola = require("consola")

module.exports = {
  search: promisify(glob),
  error: async function error(error, message) {
    consola.error(`${error}`)
    let embed = {
      title: "Обнаружена ошибка",
      description: `\`\`\`js\n${error}\`\`\`\nВозможно вы что-то не так указали, но это маловероятно`,
      color: cfg.color,
      footer: {
        text: "Обратитесь к создателю бота чтобы исправить ошибку"
      }
    }
    message.reply({embeds:[embed]})
  },
  createProfile: async function createProfile(user, server) {
    let money = await db.has(`money_${server}_${user}`)
    if(!money) await db.set(`money_${server}_${user}`, 0)
    let bank = await db.has(`bank_${server}_${user}`)
    if(!bank) await db.set(`bank_${server}_${user}`, 0)
    let workCd = await db.has(`workCd_${server}_${user}`)
    if(!workCd) await db.set(`workCd_${server}_${user}`, 0)
    let dailyCd = await db.has(`dailyCd_${server}_${user}`)
    if(!dailyCd) await db.set(`dailyCd_${server}_${user}`, Date.now())
    let weeklyCd = await db.has(`weeklyCd_${server}_${user}`)
    if(!weeklyCd) await db.set(`weeklyCd_${server}_${user}`, Date.now())
    let monthlyCd = await db.has(`monthlyCd_${server}_${user}`)
    if(!monthlyCd) await db.set(`monthlyCd_${server}_${user}`, Date.now())
    let lvl = await db.has(`lvl_${server}_${user}`)
    let all = await db.has(`all_${server}_${user}`)
    let xp = await db.has(`xp_${server}_${user}`)
    let need = await db.has(`need_${server}_${user}`)
    let lvlSystem = await db.has(`lvlSystem_${server}`)
    let channelLvl = await db.has(`channelLvl_${server}`)
    if(!lvl) await db.set(`lvl_${server}_${user}`, 1)
    if(!all) await db.set(`all_${server}_${user}`, 300)
    if(!xp) await db.set(`xp_${server}_${user}`, 0)
    if(!need) await db.set(`need_${server}_${user}`, 300)
    if(!lvlSystem) await db.set(`lvlSystem_${server}`, true)
    if(!channelLvl) await db.set(`channelLvl_${server}`, "message")
    let date = await db.has(`date_${server}_${user}`)
    if(!date) await db.set(`date_${server}_${user}`, `<t:${Math.floor(Date.now()/1000)}>`)
    // Сезоны

    let sweets = await db.has(`sweets_${user}`)
    let gifts = await db.has(`gifts_${user}`)
    let eggs = await db.has(`eggs_${user}`)

    if(!sweets) await db.set(`sweets_${user}`, 0)
    if(!gifts) await db.set(`gifts_${user}`, 0)
    if(!eggs) await db.set(`eggs_${user}`, 0)
    
    
  },
  hasProfile: async function hasProfile(user, server) {
    let has = []
    let hasProfl;
    let bank = await db.has(`bank_${server}_${user}`)
    let money = await db.has(`money_${server}_${user}`)
    let workCd = await db.has(`workCd_${server}_${user}`)
    let dailyCd = await db.has(`dailyCd_${server}_${user}`)
    let weeklyCd = await db.has(`weeklyCd_${server}_${user}`)
    let monthlyCd = await db.has(`monthlyCd_${server}_${user}`)
    let lvl = await db.has(`lvl_${server}_${user}`)
    let all = await db.has(`all_${server}_${user}`)
    let xp = await db.has(`xp_${server}_${user}`)
    let need = await db.has(`need_${server}_${user}`)
    let date = await db.has(`date_${server}_${user}`)
    let lvlSystem = await db.has(`lvlSystem_${server}`)
    let channelLvl = await db.has(`channelLvl_${server}`)
    has.push(!money)
    has.push(!bank)
    has.push(!workCd)
    has.push(!dailyCd)
    has.push(!weeklyCd)
    has.push(!monthlyCd)
    has.push(!lvl)
    has.push(!all)
    has.push(!xp)
    has.push(!need)
    has.push(!lvlSystem)
    has.push(!channelLvl)
    has.push(!date)
    if (has.includes(true)) hasProfl = false
    else hasProfl = true
    return hasProfl
  },

  checkProfile: async function hasProfile(user, server) {
    let has = []
    let hasProfl;
    let bank = await db.has(`bank_${server}_${user}`)
    let money = await db.has(`money_${server}_${user}`)
    let workCd = await db.has(`workCd_${server}_${user}`)
    let dailyCd = await db.has(`dailyCd_${server}_${user}`)
    let weeklyCd = await db.has(`weeklyCd_${server}_${user}`)
    let monthlyCd = await db.has(`monthlyCd_${server}_${user}`)
    let lvl = await db.has(`lvl_${server}_${user}`)
    let xp = await db.has(`xp_${server}_${user}`)
    let need = await db.has(`need_${server}_${user}`)
    let lvlSystem = await db.has(`lvlSystem_${server}`)
    let channelLvl = await db.has(`channelLvl_${server}`)
    has.push((money == true))
    has.push((bank == true))
    has.push((workCd == true))
    has.push((dailyCd == true))
    has.push((weeklyCd == true))
    has.push((monthlyCd == true))
    has.push((lvl == true))
    has.push((xp == true))
    has.push((need == true))
    has.push((lvlSystem == true))
    has.push((channelLvl == true))
    if (has.includes(false)) hasProfl = "Неуспешно"
    else hasProfl = "Успешно"
    let returned = `Проверка профиля оказалась \`${hasProfl}\`\nОтклик переменных базы данных:\n\`\`\`js\n${has.join(", ")}\`\`\``
    return returned
  }
}