let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
  if (!(isAdmin || isOwner)) {
	  global.dfail('admin', m, conn)
          throw false
  }
  let isClose = {
	  'close': 'not_announcement',
	  'tutup': 'not_announcement',
      'on': 'not_announcement',
	  '1': 'not_announcement',
	  'open': 'announcement',
	  'buka': 'announcement',
      'off': 'announcement',
      '0': 'announcement',
  }[(args[0] || '')]
  if (isClose === undefined) {
	  let caption = `
Contoh:
*${usedPrefix + command} tutup*
*${usedPrefix + command} buka*

Contoh pilihan: *${usedPrefix + command} tutup 1* 
Maka grup akan di buka otomatis 1 jam kemudian.
`
      m.reply(caption)
	  throw false
  }
  let timeoutset = 6000000 * args[1] / 100
  await conn.groupSettingUpdate(m.chat, isClose).then(async _=> {
	  m.reply(`Sukses me${isClose == 'announcement' ? 'nutup' : 'mbuka'} grup${args[1] ? `, grup akan di${args[0]} setelah *${clockString(timeoutset)}*` : ''}`)
  })
  if (args[1]) {
	 setTimeout(async () => {
            await conn.groupSettingUpdate(m.chat, `${isClose == 'announcement' ? 'not_announcement' : 'announcement'}`).then(async _=>{
		    conn.reply(m.chat, `Grup telah di ${isClose == 'not_announcement' ? 'tutup, sekarang hanya admin yang dapat mengirim pesan' : 'buka, sekarang semua member bisa mengirim pesan'}!`)
	    })
        }, timeoutset)
  }
  }
handler.help = ['groupt <open/close> <number>']
handler.tags = ['group']
handler.command = /^(groupt|gct)$/i

handler.botAdmin = true
handler.group = true 

module.exports = handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}