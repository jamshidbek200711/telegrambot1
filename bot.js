const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const { log } = require('console');
require('dotenv').config()
const token = process.env.token; 
const bot = new TelegramBot(token, { polling: true });

// `🏛 Haftalik dars jadvali.`,  `🏛 Kunlik dars jadvali.` 'button'larini chiqarish
const home = JSON.stringify({
  resize_keyboard: true,
  keyboard: [
    [`🏛 Haftalik dars jadvali.`, `🏛 Kunlik dars jadvali.`]
  ]
});

// Dars jadvalini o'qish
function readSchedule() {
  try {
    const schedule = JSON.parse(fs.readFileSync('schedule.json', 'utf8')); // Ma'lumotlar bazasini o'qish
    return schedule;
  } catch (error) {
    console.error("Xatolik: Dars jadvali o'qib bo'lmadi.");
    return "Xatolik: Dars jadvali o'qib bo'lmadi.";
  }
}

// /start komandasiga javob berish
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  option = {
    reply_to_message_id: msg.message_id,
    parse_mode: "markdown",
    reply_markup: home
  }
  
  bot.sendMessage(chatId, `Assalomu alaykum, 338-maktab 10-'B' sinfining maxsus botiga xush kelibsiz.`, option);
});

// Haftalik dars jadvalini qaytarish
bot.onText(/🏛 Haftalik dars jadvali./, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,`
  📌Dushanba:\n 1.Õzbekiston tarixi.\n 2.Biologiya.\n 3.Ona-tili.\n 4.Ingliz-tili.\n 5.Huquq.\n 6.Adabiyot.\n 
  📌Seshanba:\n 1.Geografiya.\n 2.Algebra.\n 3.Jismoniy tarbiya.\n 4.Jismoniy tarbiya.\n 5.Fizika.\n 6.Ona-tili.\n
  📌Chorshanba:\n 1.Kimyo.\n 2.Tarbiya.\n 3.Informatika.\n 4.Informatika.\n 5.Geometriya.\n
  📌Payshanba:\n 1.Biologiya.\n 2.Jahon tarixi.\n 3.Fizika.\n 4.Rus-tili.\n 5.Algebra.\n
  📌Juma:\n 1.Ma'naviyat soati.\n 2.Kimyo.\n 3.Algebra.\n 4.Geografiya.\n 5.Ingliz-tili.\n 6.Ingliz-tili.\n
  📌Shanba:\n 1.Adabiyot.\n 2.Geometriya.\n 3.Rus-tili.\n 4.YoChT`);
  });

//  "🏛 Kunlik dars jadvali." komandasiga kiruvchi 'button'larni chiqarish
bot.on("message", (msg) => {
  chatId = msg.chat.id;
  text = msg.text;  
  if(text == "🏛 Kunlik dars jadvali."){
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

// Dushanba dars jadvalini chiqarish
bot.onText(/🔎Dushanba/, (msg) => {
  const chatId = msg.chat.id;
  const schedule = readSchedule();
  bot.sendMessage(chatId, "Kunlik dars jadvali:\n" + JSON.stringify(schedule.Dushanba, null, 2));
});

// Seshanba dars jadvalini chiqarish
bot.onText(/🔎Seshanba/, (msg) => {
  const chatId = msg.chat.id;
  const schedule = readSchedule();
  bot.sendMessage(chatId, "Kunlik dars jadvali:\n" + JSON.stringify(schedule.Seshanba, null, 2));
});

// Chorshanba dars jadvalini chiqarish
bot.onText(/🔎Chorshanba/, (msg) => {
  const chatId = msg.chat.id;
  const schedule = readSchedule();
  bot.sendMessage(chatId, "Kunlik dars jadvali:\n" + JSON.stringify(schedule.Chorshanba, null, 2)); 
});

// Payshanba dars jadvalini chiqarish
bot.onText(/🔎Payshanba/, (msg) => {
  const chatId = msg.chat.id;
  const schedule = readSchedule();
  bot.sendMessage(chatId, "Kunlik dars jadvali:\n" + JSON.stringify(schedule.Payshanba, null, 2)); 
});

// Juma dars jadvalini chiqarish
bot.onText(/🔎Juma/, (msg) => {
  const chatId = msg.chat.id;
  const schedule = readSchedule();
  bot.sendMessage(chatId, "Kunlik dars jadvali:\n" + JSON.stringify(schedule.Juma, null, 2)); 
});

// Shanba dars jadvalini chiqarish
bot.onText(/🔎Shanba/, (msg) => {
  const chatId = msg.chat.id;
  const schedule = readSchedule();
  bot.sendMessage(chatId, "Kunlik dars jadvali:\n" + JSON.stringify(schedule.Shanba, null, 2)); 
});

// Botni ishga tushirish
bot.on('polling_error', (error) => {
  console.error(error);
});

console.log(`bot run...`);
