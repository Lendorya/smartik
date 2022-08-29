const Bot = require('./Classes/Bot.js');
const canvacord = require("canvacord")
global.cfg = require("./cfg.js")
global.tr = require("./translates.js")
global.token = process.env.TOKEN 
global.startup = Date.now()
global.state = "Не подключена"
const { QuickDB } = require("quick.db");
global.db = new QuickDB();
const bot = new Bot(cfg);
const consola = require("consola")
require("./Classes/Message.js")
const express = require('express');
const server = express();
server.all('/', (req, res) => {res.send(`ок`)})
function keepAlive() {server.listen(3000, () => { consola.success("Подключено!") });}
module.exports = keepAlive;
bot.starter()
try{} catch(e) {consola.fatal(e)}