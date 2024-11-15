const { convertCurrency } = require('./convertCurrency'); // Assurez-vous que le chemin est correct

describe('convertCurrency', () => {
  test('should convert currency correctly', async () => {
    const result = await convertCurrency(100, 'USD', 'EUR');
    expect(result).toBeDefined();
  });

  test('should handle API error gracefully', async () => {
    try {
      await convertCurrency(100, 'USD', 'INVALID');
    } catch (error) {
      expect(error.message).toBe('Conversion échouée');
    }
  });
});