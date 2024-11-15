const http = require('http');
const axios = require('axios');
const url = require('url');

// Fonction de conversion de devises
async function convertCurrency(amount, fromCurrency, toCurrency) {
  const API_KEY = '38df67baaaaebb696644f0c8'; // Remplace par ta clé API
  const apiUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

  try {
    const response = await axios.get(apiUrl);
    const rate = response.data.conversion_rate;
    const convertedAmount = (amount * rate).toFixed(2);
    return `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    console.error('Erreur lors de la conversion :', error.message);
    throw new Error('Conversion échouée');
  }
}

// Créer le serveur
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;

  // Serve la page de formulaire pour la conversion
  if (parsedUrl.pathname === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
      <head>
        <title>Convertisseur de devises</title>
      </head>
      <body>
        <h1>Convertisseur de devises</h1>
        <form id="converter-form">
          <label for="amount">Montant:</label>
          <input type="number" id="amount" name="amount" required><br><br>
          <label for="fromCurrency">Devises d'origine:</label>
          <input type="text" id="fromCurrency" name="fromCurrency" required><br><br>
          <label for="toCurrency">Devises cibles:</label>
          <input type="text" id="toCurrency" name="toCurrency" required><br><br>
          <button type="submit">Convertir</button>
        </form>
        <div id="result"></div>

        <script>
          document.getElementById('converter-form').addEventListener('submit', async function(event) {
            event.preventDefault();  // Empêche la soumission du formulaire

            const amount = document.getElementById('amount').value;
            const fromCurrency = document.getElementById('fromCurrency').value;
            const toCurrency = document.getElementById('toCurrency').value;

            const response = await fetch('/convert', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ amount, fromCurrency, toCurrency })
            });

            const data = await response.json();
            const resultElement = document.getElementById('result');
            if (response.ok) {
              resultElement.innerHTML = \`Résultat de la conversion: \${data.result}\`;
            } else {
              resultElement.innerHTML = \`Erreur: \${data.error}\`;
            }
          });
        </script>
      </body>
      </html>
    `);
  }

  // Gérer la requête POST pour la conversion
  else if (parsedUrl.pathname === '/convert' && method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      const { amount, fromCurrency, toCurrency } = JSON.parse(body);
      try {
        const result = await convertCurrency(amount, fromCurrency, toCurrency);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ result }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  }

  // Page 404 si la route est inconnue
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Page non trouvée</h1>');
  }
});

// Lancer le serveur
const port = 3000;
server.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

module.exports = { convertCurrency };