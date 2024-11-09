export const isMutant = (dna) => {
    const N = dna.length;
    let sequencesFound = 0;
  
    const hasMutantSequence = (row, col, dirRow, dirCol) => {
      const base = dna[row][col];
      for (let i = 1; i < 4; i++) {
        const newRow = row + i * dirRow;
        const newCol = col + i * dirCol;
        if (
          newRow < 0 || newRow >= N ||
          newCol < 0 || newCol >= N ||
          dna[newRow][newCol] !== base
        ) {
          return false;
        }
      }
      return true;
    };
  
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (
          hasMutantSequence(row, col, 0, 1) || 
          hasMutantSequence(row, col, 1, 0) || 
          hasMutantSequence(row, col, 1, 1) || 
          hasMutantSequence(row, col, 1, -1)   
        ) {
          sequencesFound++;
          if (sequencesFound > 1) return true;
        }
      }
    }
  
    return false;
  };
  