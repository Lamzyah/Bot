let handler = m => m;
const similarity = require('similarity')
const util = require('util');

// Definisikan threshold untuk kesamaan jawaban
const threshold = 0.75;
handler.before = async function (m) {
    try {
        let id = m.sender;
        let reward = randomInt(100, 800);
        let users = global.db.data.users[m.sender];
        let body = (typeof m.text == 'string' ? m.text : '');
        conn.tebakanime = conn.tebakanime ? conn.tebakanime : {};

        if (id in conn.tebakanime) {
            let json = conn.tebakanime[id][1];
            let isSurrender = /^(suren)$/i.test(body);
            let isHint = /^(hint)$/i.test(body);
            if (isHint) {
            let ans = json.jawaban.trim()
    let clue = ans.replace(/[AIUEOaiueo]/g, '_')
    conn.reply(m.chat, '```' + clue + '```\n', conn.tebakanime[id][0])
            return;
        }
        if (isSurrender) {
            await conn.reply(m.chat, `🚩 Menyerah`, m);
            clearTimeout(conn.tebakanime[id][3]);
            delete conn.tebakanime[id];
            return;
        }
            if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
                users.exp += 500;  // Sebelumnya: this.tebakanime[id][2]
                users.tiketcoin += 1;
                m.reply(`*Benar!*\n+500 XP\n+1 Tiketcoin`);
                clearTimeout(conn.tebakanime[id][3]);
                delete conn.tebakanime[id];
            } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
                m.reply(`*Dikit Lagi!*`);
            } else {
                m.reply(`*Salah!*`);
            }
        }
    } catch (e) {
        return conn.reply(m.chat, util.format(e), m);
    }
    return true;
}

handler.exp = 0;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatNumber(number) {
    return number.toLocaleString();
}

module.exports = handler;