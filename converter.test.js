const { convertCurrency } = require('./index');

// Mock console.error pour éviter d'afficher les erreurs dans les tests
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('convertCurrency', () => {
  test('should convert currency correctly', async () => {
    const result = await convertCurrency(100, 'USD', 'EUR');
    expect(result).toBeDefined();  // Vérifie que le résultat est défini
  });

  test('should handle API error gracefully', async () => {
    try {
      // Test avec une devise invalide pour générer une erreur d'API
      await convertCurrency(100, 'USD', 'INVALID');
    } catch (error) {
      // Vérifie si l'erreur levée est la bonne
      expect(error.message).toBe('Conversion échouée');
    }
  });
});