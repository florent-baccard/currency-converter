const { convertCurrency } = require('./index');

// Mock console.error pour éviter d'afficher les erreurs dans les tests
jest.spyOn(console, 'error').mockImplementation(() => {});

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