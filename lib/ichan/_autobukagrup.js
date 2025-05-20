const { tmpdir } = require('os')
const { join } = require('path')
const fs = require('fs')
const cron = require('node-cron');
const {readdirSync,statSync,unlinkSync,existsSync,readFileSync,watch} = require('fs')
let actionTaken = false;
module.exports = (conn) => {
  let counter = 0;
const task = cron.schedule('*/1 * * * *', async () => { // Jadwalkan tugas untuk berjalan setiap menit
    if (actionTaken) return;
  //  console.log('tugas buka dijalankan pada setiap menit')
 // console.log('Tugas yang dijadwalkan dijalankan setiap menit');
     aturjadwal()
  counter++;
});
};
// function
async function aturjadwal() {
    let actionTaken = false;
    const filePath = './database/idgc.json';
                // Baca file JSON secara synchronous
    const data = fs.readFileSync(filePath, 'utf-8');
    
    // Lakukan parsing JSON
    const jsonData = JSON.parse(data);
    let group = jsonData.chatId

    const autotutupgroup = {
        Subuh: "05:12",
        Tidur: "07:00",
        Zuhur: "12:10",
        Asar: "15:20",
        Magrib: "18:32",
        Isya: "19:29",
    };

    const date = new Date(new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    // Periksa apakah waktu saat ini cocok dengan waktu sholat yang ditentukan
    for (const [tutup, waktu] of Object.entries(autotutupgroup)) {
        if (timeNow === waktu && tutup === 'Subuh') { // Periksa apakah waktu saat ini adalah Subuh
            // Kirim pesan
            conn.sendMessage(group, {
                text: `\n🌅 *Selamat Subuh* 🌅\n\nWaktu Subuh Telah Tiba Saatnya Untuk Melaksanakan Sholat Dan Kegiatan Lainnya. Semangat! 🗿`
            });
            actionTaken = true; // Set flag menjadi true
            break; // Keluar dari loop setelah tindakan dilakukan
        } else if (timeNow === waktu) { // Untuk waktu selain Subuh, lakukan tindakan
            try {
                // Lakukan tindakan
                conn.groupSettingUpdate(group, 'not_announcement');
                conn.sendMessage(group, {
                    text: `\n🚩 *System Open Group*\n\nWaktu *${tutup}* Telah Berlalu.\n\nTerima kasih Karena Sudah Menunggu. Saatnya untuk beraktivitas lagi.\n\nSalam hangat dari admin🗿.`
                });
                actionTaken = true; // Set flag menjadi true
                break; // Keluar dari loop setelah tindakan dilakukan
            } catch (error) {
                console.error(error); // Tangkap dan log kesalahan
            }
        }
      //  console.log('sedang di jadwalkan buka')
    }
}