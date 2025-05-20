const { tmpdir } = require('os')
const { join } = require('path')
const axios = require('axios');
const fs = require('fs')
const {readdirSync,statSync,unlinkSync,existsSync,readFileSync,watch} = require('fs')
let actionTaken = false;
module.exports = (conn) => {
    const cron = require('node-cron');
let counter = 0;
// Jadwalkan tugas untuk dijalankan setiap menit
const task = cron.schedule('*/1 * * * *', async () => { // Jadwalkan tugas untuk berjalan setiap menit
  // Jika tindakan sudah dilakukan, berhenti
    if (actionTaken) return;
  //  console.log('Tugas jadwal tutup dijalankan setiap menit');
    aturjadwal()
    counter++;
  }, {
  scheduled: true,
  timezone: 'Asia/Jakarta'
});
};

// function
async function aturjadwal() {
    let actionTaken = false;
    // waktu
    let fetch = require('node-fetch')
let moment = require('moment-timezone')
let petik = '```'
let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    const wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    const wita = moment.tz('Asia/Makassar').format("HH:mm:ss")
    const wit = moment.tz('Asia/Jayapura').format("HH:mm:ss")
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let datee = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    
   const filePath = './database/idgc.json';
                // Baca file JSON secara synchronous
    const datas = fs.readFileSync(filePath, 'utf-8');
    ////
    const faths = './database/datashalat.json';
                // Baca file JSON secara synchronous
    const datase = fs.readFileSync(faths, 'utf-8');
    const datae = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(datae);
    // Lakukan parsing JSON
    const shalat = JSON.parse(datase);
    let group = jsonData.chatId
    // Kota yang Anda inginkan untuk mendapatkan jadwal shalatnya
const cityName = 'Jakarta';

// API endpoint untuk mendapatkan jadwal shalat dari MuslimSalat.com
const apiUrl = `http://api.aladhan.com/v1/timingsByCity?city=${cityName}&country=Indonesia&method=2`;

// Kirim permintaan GET ke API untuk mendapatkan jadwal shalat
let chan = await axios.get(apiUrl)
    const data = chan.data.data;
    // Jadwal shalat berdasarkan waktu lokal
    const timings = data.timings;
    const autotutupgroups = {
        Subuh: shalat.subuh,
        Tidur: "21:05",
        Zuhur: shalat.Dzuhur,
        Asar: shalat.Ashar,
        Magrib: shalat.Maghrib,
        Isya: shalat.Isya
    };
    const date = new Date(new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    // Periksa apakah waktu saat ini cocok dengan waktu sholat yang ditentukan
    for (const [tutup, waktu] of Object.entries(autotutupgroups)) {
        if (timeNow === waktu && tutup === 'Tidur') { // Periksa apakah waktu saat ini adalah Subuh
            // Kirim pesan
            conn.groupSettingUpdate(group, 'announcement');
            conn.sendMessage(group, {
                text: `\n🌌 *Selamat Malam* 🌌\n\nWaktu Istirahat Telah Tiba Saatnya Tidur.....\nAgar esok hari semangat beraktivitas kembali😉😇`
            });
            actionTaken = true; // Set flag menjadi true
            break; // Keluar dari loop setelah tindakan dilakukan
        } else if (timeNow === waktu) { // Untuk waktu selain Subuh, lakukan tindakan
            try {
                // Lakukan tindakan
                conn.groupSettingUpdate(group, 'announcement');
                conn.sendMessage(group, {
                    text: `🕌 Pukul ${wib} WIB, waktunya *${tutup}* untuk ${cityName}, daerah dan sekitarnya.

                📑 Jadwal Shalat Hari Ini :
				Tanggal = ${week}, ${datee}
				-

                🔖 Sumber: Kemenag RI`
                });
                actionTaken = true; // Set flag menjadi true
                break; // Keluar dari loop setelah tindakan dilakukan
            } catch (error) {
                console.error(error); // Tangkap dan log kesalahan
            }
        }
      //  console.log('sedang di jadwalkan tutup')
       // await doSomethingAsync();
    }
}