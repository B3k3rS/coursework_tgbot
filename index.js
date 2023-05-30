const TelegramBot = require('node-telegram-bot-api');
const Para = require("./para.js");
const Paras = new Para();

const TOKEN = `5744262434:AAG2aojYQd6f9tgjgDeo3ArodIVkW2V8fZg`;
const bot = new TelegramBot(TOKEN, {polling: true});

bot.setMyCommands([
    {command: '/help', description: 'Вивести список всех команд'},
    {command: '/now', description: 'Вивести проходящую пару'},
    {command: '/tod', description: 'Вивести расписание пар на сегодня'},
    {command: '/tom', description: 'Вивести расписание пар на завтра'},
    {command: '/author', description: 'Вивести информацию о авторе'},
])

 
bot.on('message', (msg) => {
    const ChatID = msg.chat.id;

    if (msg.text == '/start') {
        bot.sendMessage(ChatID,'Вітаю в боті групи КНТ-112СП!\nНапиши /help, щоб ознайомитись з моїм функціоналом!')
    }
    else if (msg.text == '/help') {
        bot.sendMessage(ChatID,'/now - Вивести інформацію про пару, яка зараз проводиться.\n/tod - Вивести розклад пар на сьогодні.\n/tom - Вивести розклад пар на завтра.\n/author - Вивести iнформацiю про автора бота.')
    }
    else if (msg.text == '/now') {
        bot.sendMessage(ChatID,Paras.now())
    }
    else if (msg.text == '/tod') {
        bot.sendMessage(ChatID,Paras.today())
    }
    else if (msg.text == '/tom') {
        bot.sendMessage(ChatID,Paras.tomorrow())
    }
    else if (msg.text == '/author') {
        bot.sendMessage(ChatID,`Бот собран на коленке <code>@aleksandrny</code>`, { parse_mode: 'HTML' })
    }
})