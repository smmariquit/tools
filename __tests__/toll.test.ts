import { describe, it, expect } from 'vitest';
import { getTollFee } from '../src/app/toll-calculator/tollData';

describe('Toll Matrix Lookup Logic', () => {
  it('should find exact direct route toll fee', () => {
    const fee = getTollFee('Skyway Stage 3', 'Buendia', 'Quezon Ave', 'class1');
    expect(fee).toBe(264);
  });

  it('should find reverse route toll fee assuming symmetry', () => {
    const fee = getTollFee('Skyway Stage 3', 'Quezon Ave', 'Buendia', 'class1');
    expect(fee).toBe(264);
  });

  it('should return null for invalid routes', () => {
    const fee = getTollFee('Skyway Stage 3', 'Buendia', 'NonExistentExit', 'class1');
    expect(fee).toBeNull();
  });
});
