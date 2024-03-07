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
