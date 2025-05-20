
const { createHash } = require('crypto');

let handler = async function(m, { text, usedPrefix }) {
  let user = global.db.data.users[m.sender];
  if (!user.email) throw `Anda belum mendaftar menggunakan email\nSilakan mendaftar terlebih dahulu menggunakan command *${usedPrefix}regmail <email>*"`;
  if (user.registered === true) throw `Anda sudah terdaftar\nIngin mendaftar lagi? ${usedPrefix}unreg 90259a21exxxxxx`;
  if (!text) throw `Format salah\n*${usedPrefix}vercode <verification code>*`;
  let verificationCode = parseInt(text.trim());
  if (user.verificationCode !== verificationCode) throw 'Kode verifikasi salah';
  if (+new Date() > user.verificationExp) throw 'Kode verifikasi telah kedaluwarsa.';
  let email = user.email;
  let name = email.split('@')[0];
  let sn = createHash('md5').update(m.sender).digest('hex');
  let balanceBonus = getRandomInt(1000, 100000);
  let limitBonus = getRandomInt(1000, 1000);
  let expBonus = getRandomInt(1000, 1000);
  let age = getRandomInt(18, 30);
  user.balance = balanceBonus;
  user.limit = limitBonus;
  user.exp = expBonus;
  user.sn = sn;
  user.name = name;
  user.age = age;
  user.registered = true;
  global.db.data.users[m.sender] = user;

  let registerInfo = `Sukses Verifikasi!\n\n╭─「 Info 」\n${user.name ? `│ Name: ${user.name}\n` : ''}${user.age ? `│ Age: ${user.age}\n` : ''}${user.balance ? `│ Balance: ${user.balance.toLocaleString()}\n` : ''}${user.limit ? `│ Limit: ${user.limit}\n` : ''}${user.exp ? `│ Exp: ${user.exp}\n` : ''}${user.sn ? `│ SN: ${user.sn}\n` : ''}╰────`;

  m.reply(registerInfo);
};

handler.help = ['vercode'];
handler.tags = ['xp'];
handler.command = /^vercode$/i;

module.exports = handler;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}