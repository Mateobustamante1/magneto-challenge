import { isMutant } from '../src/utils/dnaChecker';

test('detects mutant DNA sequence', () => {
  const mutantDna = ["ATCGGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
  expect(isMutant(mutantDna)).toBe(true);
});

test('detects human DNA sequence', () => {
  const humanDna = ["ATCGGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"];
  expect(isMutant(humanDna)).toBe(false);
});
