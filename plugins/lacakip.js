let fetch = require('node-fetch')
const { fetchJson, sleep } = require("../functions.js")
let handler = async (m, { conn, text }) => {
if (!text) throw 'contoh .lacakip 0.0.0.0'
    let res = await fetch(`https://api.lolhuman.xyz/api/ipaddress/${text}?apikey=${apichan}`)
    var ress = await res.json()
    var x = ress.result
    var teks = `*GHOST +T R A C K E R+*

Country: ${x.country}
City: ${x.city}
Timezone: ${x.timezone}
Maps: http://www.google.com/maps/place/${x.lat},${x.lon}/@${x.lat},${x.lon}

gunakan Tools Ini dengan Bijak!!`
// for (let x of aih.result){
// teks +=`- Country: ${x.country}\n- City: ${x.city}\n- Timezone: Rp${x.timezone}\n- Maps: //http://www.google.com/maps/place/${x.lat},${x.lon}/@${x.lat},${x.lon}\n\n${wm}`
// }
   m.reply(teks)
}
handler.help = ['lacakip <teks>']
handler.tags = ['tools']
handler.command = /^(lacakip)$/i
handler.limit = true
handler.premium = false

module.exports = handler