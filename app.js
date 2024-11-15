document.getElementById('currencyForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement
  
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
  
    try {
      const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${fromCurrency}`);
      const data = await response.json();
  
      if (data && data.rates[toCurrency]) {
        const convertedAmount = (amount * data.rates[toCurrency]).toFixed(2);
        document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
      } else {
        document.getElementById('result').textContent = 'Erreur lors de la conversion.';
      }
    } catch (error) {
      document.getElementById('result').textContent = 'Erreur de connexion à l\'API.';
    }
  });