const fs = require('fs')
const cron = require('node-cron');
module.exports = (conn) => {
  const task = cron.schedule('00 01 * * *', async () => { // Jadwalkan tugas untuk berjalan setiap menit
   jadwalshalat();
  }, {
    scheduled: true,
    timezone: 'Asia/Jakarta'
  });
}
async function jadwalshalat() {
    const axios = require('axios');
const cityName = 'Jakarta';
    const apiUrl = `http://api.aladhan.com/v1/timingsByCity?city=${cityName}&country=Indonesia&method=2`;

    try {
        let response = await axios.get(apiUrl);
        const data = response.data.data;
        const timings = data.timings;

        const jadwalnya = {
            Subuh: timings.Fajr,
            Imsak: timings.Imsak,
            Dzuhur: timings.Dhuhr,
            Ashar: timings.Asr,
            Maghrib: timings.Maghrib,
            Isya: timings.Isha
        };

        // Path lengkap ke file JSON yang akan Anda buat
        const filePath = './database/datashalat.json';

        // Tulis data JSON ke dalam file
        fs.writeFile(filePath, JSON.stringify(jadwalnya, null, 2), (err) => {
            if (err) {
               // console.error('Gagal membuat file JSON:', err);
                return;
            }
          //  console.log('File JSON berhasil dibuat:', filePath);
        });
    } catch (error) {
      //  console.error('Gagal mengambil data jadwal shalat:', error);
    }
}