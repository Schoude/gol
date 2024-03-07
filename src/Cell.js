class Cell {
  row;
  column;
  element;
  // 'dead' or 'alive'
  status = 'dead';
  neighbors;

  constructor(row, column, element) {
    this.row = row;
    this.column = column;
    this.element = element;
  }

  setNeighbors(cellArrays) {
    const topRow = cellArrays[this.row - 1];
    const bottomRow = cellArrays[this.row + 1];
    const myRow = cellArrays[this.row];

    let topNeighbors = [];
    let bottomNeighbors = [];
    let rowNeighbors = [];

    if (topRow != null) {
      topNeighbors = [
        topRow[this.column - 1],
        topRow[this.column],
        topRow[this.column + 1],
      ].filter(n => n != null);
    }

    // row of the Cell
    rowNeighbors = [
      myRow[this.column - 1],
      myRow[this.column + 1],
    ].filter(n => n != null);

    if (bottomRow != null) {
      bottomNeighbors = [
        bottomRow[this.column - 1],
        bottomRow[this.column],
        bottomRow[this.column + 1],
      ].filter(n => n != null);
    }

    this.neighbors = [
      ...topNeighbors,
      ...rowNeighbors,
      ...bottomNeighbors,
    ];
  }

  // 3. **Birth**: A dead cell with exactly three live neighbors becomes alive in the next generation, simulating reproduction.
  // 4. **Survival**: A live cell with two or three live neighbors remains alive in the next generation, simulating survival.
  // 5. **Death**: In all other cases, a cell dies or remains dead in the next generation due to overpopulation (more than three live neighbors) or loneliness (fewer than two live neighbors).
  checkStatus() {
    const livingNeighbors = this.neighbors.reduce((neighborCount, neighborCell) => {
      if (neighborCell.status === 'alive') {
        neighborCount = neighborCount + 1;
      }

      return neighborCount;
    }, 0);

    // Birth
    if (this.status === 'dead' && livingNeighbors === 3) {
      this.setStatus('alive');

      return;
    }

    if (this.status === 'alive') {
      // 5. **Death**: In all other cases, a cell dies or remains dead in the next generation due to overpopulation (more than three live neighbors) or loneliness (fewer than two live neighbors).
      if (livingNeighbors > 3 || livingNeighbors < 2) {
        this.setStatus('dead');
      }
    }
  }

  setStatus(status) {
    this.status = status;

    if (status === 'dead') {
      this.#die();
    } else {
      this.#live();
    }
  }

  #live() {
    this.element.style.backgroundColor = 'green';
  }

  #die() {
    this.element.style.backgroundColor = 'white';
  }
}

export default Cell;
