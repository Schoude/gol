class Cell {
  row;
  column;
  element;
  // 'dead' or 'alive'
  status = 'dead';

  constructor(row, column, element) {
    this.row = row;
    this.column = column;
    this.element = element;
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
