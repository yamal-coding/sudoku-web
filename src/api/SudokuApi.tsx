async function readPuzzleCount(reader: ReadableStreamDefaultReader<Uint8Array>, decoder: TextDecoder): Promise<{ puzzlesCount: number; remainingBuffer: string }> {
  const firstChunk = await reader.read();
  if (firstChunk.done) {
    throw new Error('Empty file');
  }
  
  const buffer = decoder.decode(firstChunk.value, { stream: true });
  const firstNewlineIndex = buffer.indexOf('\n');
  
  if (firstNewlineIndex === -1) {
    throw new Error('Invalid file format - no newline found');
  }
  
  const puzzlesCount = parseInt(buffer.substring(0, firstNewlineIndex).trim(), 10);
  if (isNaN(puzzlesCount) || puzzlesCount <= 0) {
    throw new Error('Invalid puzzles count');
  }

  const remainingBuffer = buffer.substring(firstNewlineIndex + 1);
  
  return { puzzlesCount, remainingBuffer };
}

export async function fetchSudoku(difficulty: 'easy' | 'medium' | 'hard' = 'easy') {
  try {
    const response = await fetch(`src/levels/${difficulty}.txt`);
    
    if (!response.body) {
      throw new Error('Unable to get response stream');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let selectedLineIndex = -1;
    let currentLineIndex = 0;

    const { puzzlesCount, remainingBuffer } = await readPuzzleCount(reader, decoder);
    let buffer = remainingBuffer;

    selectedLineIndex = Math.floor(Math.random() * puzzlesCount);

    while (currentLineIndex <= selectedLineIndex) {
      const newlineIndex = buffer.indexOf('\n');
      
      if (newlineIndex !== -1) {
        if (currentLineIndex === selectedLineIndex) {
          const selectedLine = buffer.substring(0, newlineIndex).trim();
          const [mission, solution] = selectedLine.split(' ');
          
          if (!mission || !solution) {
            throw new Error('Invalid puzzle format');
          }

          reader.releaseLock();
          
          return { mission, solution };
        }
        
        buffer = buffer.substring(newlineIndex + 1);
        currentLineIndex++;
      } else {
        const chunk = await reader.read();
        if (chunk.done) {
          throw new Error('Reached end of file before finding selected puzzle');
        }
        buffer += decoder.decode(chunk.value, { stream: true });
      }
    }

    throw new Error('Failed to find selected puzzle');
  } catch (error) {
    console.error('Error loading sudoku puzzle:', error);
    throw new Error('Failed to load sudoku puzzle from file');
  }
}
