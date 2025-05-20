const fetch = require('node-fetch')
const { fileIO, api, UploadFiles} = require('../lib/uploadFile')
const sleep = require('../functions.js')
let handler = async (m, { conn, usedPrefix, command, text }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw `Kirim/Reply Gambar dengan caption ${command}`
m.reply(`Proses`)
let media = await q.download()
let url = await fileIO(media)
let hasil = `${webapi}api/ai/jadianime?url=${url}&apikey=${apichan}`
const buffer = await downloadAsBuffer(hasil);
//setTimeout(async () =>{
    await conn.sendFile(m.chat, buffer, '', `${global.wm}`, m)
//}, 45000)

}

handler.help = ['jadianime']
handler.tags = ['fun']
handler.command = /^(jadianime)$/i
handler.premium = true
module.exports = handler

async function downloadAsBuffer(url) {
    const https = require("https");
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            const chunks = [];
            response.on("data", (chunk) => chunks.push(chunk)); // Mengumpulkan data dalam buffer
            response.on("end", () => resolve(Buffer.concat(chunks))); // Gabungkan semua buffer
            response.on("error", reject); // Tangani kesalahan
        });
    });
}

async function getBuffer(url, options) {
        try {
                options ? options : {}
                const res = await axios({
                        method: "get",
                        url,
                        headers: {
                                'DNT': 1,
                                'Upgrade-Insecure-Request': 1
                        },
                        ...options,
                        responseType: 'arraybuffer'
                })
                return res.data
        } catch (e) {
                console.log(`Error : ${e}`)
        }
}