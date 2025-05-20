let handler = async (m, { conn, args, command }) => {
    let qris = 'https://telegra.ph/file/6bee0d9cb61c208dbad18.jpg'
let chann = `Gw kagak butuh kecil besar udah Rp500
Berharga Bagi Gw Syukur Nikmat Untuk Diberi Atas Apa Adnya

++++++++++++++
dana : +62 882022376830
A/n : alamsyah
--------  -------  ------
Qris All Payment
A/n : https://telegra.ph/file/c85898e6fef8f2639cf47.jpg
--------  -------  ------
Saweria
saweria.co/rallam
`
await conn.sendFile(m.chat, qris, 'qris.jpg', `${chann}`, m)
}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler