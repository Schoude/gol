class Cell {
  row;
  column;

  constructor(row, column) {
    this.row = row;
    this.column = column;
  }

  static say(message) {
    console.log(message);
  }
}

export default Cell;
