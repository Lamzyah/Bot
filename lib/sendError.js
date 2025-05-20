const axios = require('axios');
module.exports = async pesan => {
    let BOT_TOKEN = '6872659747:AAGE2zaDBWTz3b7hoCGIbcs_PIOZZTU-U4o' // BIAR KALO ADA ERORR GW FIX JANGAN DIHAPUS
                axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
  chat_id: '6683367462',
  text: pesan
})
.then(response => {
 // console.log('Response:', response.data);
})
.catch(error => {
 // console.error('Error:', error.response.data);
});
}