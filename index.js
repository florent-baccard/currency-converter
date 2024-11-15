const axios = require('axios');

async function convertCurrency(amount, fromCurrency, toCurrency) {
  const API_KEY = '38df67baaaaebb696644f0c8'; // Remplace par ta clé API
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

  try {
    const response = await axios.get(url);
    const rate = response.data.conversion_rate;
    const convertedAmount = (amount * rate).toFixed(2);
    return `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    console.error('Erreur lors de la conversion :', error.message);
    throw new Error('Conversion échouée');
  }
}

// Exemple d'utilisation
// convertCurrency(100, 'USD', 'EUR').then(console.log);

module.exports = { convertCurrency };