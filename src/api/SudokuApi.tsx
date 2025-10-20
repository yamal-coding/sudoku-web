export async function fetchSudoku() {
  /*try {
    const response = await fetch('https://sudoku.com/api/level/easy', {
      headers: {
        'x-requested-with': 'XMLHttpRequest',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.log('Fetch error: ', error);
    throw new Error('Failed to fetch Sudoku data');
  }*/

  return {
        mission: "400307600003002800028510704100823900000750128004009000602048351030070400009000280",
        solution: "415387692763492815928516734157823946396754128284169573672948351831275469549631287"
  };
}
