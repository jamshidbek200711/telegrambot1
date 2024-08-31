const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const { log } = require('console');
require('dotenv').config()
const token = process.env.token; 
const bot = new TelegramBot(token, { polling: true });

// `🏛 Kundalik.com`,  `🏛 Dars jadvallari.` 'button'larini chiqarish
const home = JSON.stringify({
  resize_keyboard: true,
  keyboard: [
    [`🏛 Kundalik.com`, `🏛 Dars jadvallari.`],
            [`⏱️ Dars vaqtlari.`]
  ]
});


// /start komandasiga javob berish
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  option = {
    reply_to_message_id: msg.message_id,
    parse_mode: "markdown",
    reply_markup: home
  }
  
  bot.sendMessage(chatId, `Assalomu alaykum, 338-maktab 11-'B' sinfining maxsus botiga xush kelibsiz.`, option);
});

// Haftalik dars jadvalini qaytarish
bot.onText(/🏛 Kundalik.com/, (msg) => {
            const chatId = msg.chat.id;
            bot.sendMessage(chatId, `https://emaktab.uz/userfeed 👈 ko'rish uchun bosing.`);
});

//  "🏛 Dars jadvallari." komandasiga kiruvchi 'button'larni chiqarish
bot.on("message", (msg) => {
  chatId = msg.chat.id;
  text = msg.text;  
  if(text == "🏛 Dars jadvallari."){
    option = {
      reply_to_message_id: msg.message_id,
      parse_mode: "markdown",
      reply_markup: JSON.stringify({
        resize_keyboard: true,
        keyboard: [
          [`🔎Dushanba`, `🔎Seshanba`],
          [`🔎Chorshanba`, `🔎Payshanba`],
          [`🔎Juma`, `🔎Shanba`],
          [`⬅️Ortga`]
        ]
      })
    }
    bot.sendMessage(chatId, `🏛 Kunlik dars jadvali bo'limidasiz.`, option);
  }
// "⬅️Ortga" vazifasini amalga oshirish
  if(text == "⬅️Ortga"){
    option = {
      reply_to_message_id: msg.message_id,
      parse_mode: "markdown",
      reply_markup: home
    }
    bot.sendMessage(chatId, `Bosh sahifadasz!`, option);
  }
});



//   Dars vaqtlarini chiqarish
function readFile(filepath) {
  try {
    const data = fs.readFileSync(filepath, 'utf8');
    return data;
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    return null;
  }
}


const fileContent = readFile('Haftalar/soatlar.txt');
if (fileContent) {
  bot.onText(/⏱️ Dars vaqtlari./, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, fileContent);
  })
}

const dushanba = readFile('Haftalar/dushanba.txt')
if(dushanba){
  bot.onText(/🔎Dushanba/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, dushanba);
  })
}

const seshanba = readFile('Haftalar/seshanba.txt')
if(seshanba){
  bot.onText(/🔎Seshanba/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, seshanba);
  })
}

const chorshanba = readFile('Haftalar/chorshanba.txt')
if(chorshanba){
  bot.onText(/🔎Chorshanba/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, chorshanba)
  })
}

const payshanba = readFile('Haftalar/payshanba.txt')
if(payshanba){
  bot.onText(/🔎Payshanba/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, payshanba)
  })
}

const juma = readFile('Haftalar/juma.txt')
if(juma){
  bot.onText(/🔎Juma/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, juma)
  })
}

const shanba = readFile('Haftalar/shanba.txt')
if(shanba){
  bot.onText(/🔎Shanba/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, shanba)
  })
}

// Botni ishga tushirish
bot.on('polling_error', (error) => {
  console.error(error);
});

console.log(`bot run...`);