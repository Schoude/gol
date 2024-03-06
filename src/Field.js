import Cell from './Cell.js';

class Field {
  rowsCount;
  columnsCount;
  colunCells = [];
  playingField = document.querySelector('#playing-field')
  cellSize = '5px';

  constructor(rowsCount = 99, columnsCount = 99) {
    this.rowsCount = rowsCount;
    this.columnsCount = columnsCount;
  }

  drawField() {
    this.addStyles();

    for (let rowIndex = 0; rowIndex < this.rowsCount; rowIndex++) {
      const rowEl = document.createElement('div');
      rowEl.classList.add('row');

      for (let columnIndex = 0; columnIndex < this.columnsCount; columnIndex++) {

        const columnEl = document.createElement('div');
        columnEl.classList.add('col');
        rowEl.appendChild(columnEl);

        this.addCell(new Cell(rowIndex, columnIndex, columnEl));
      }

      this.playingField.appendChild(rowEl);
    }
  }

  addCell(cell) {
    this.colunCells.push(cell)
  }

  addStyles() {
    const styleEl = document.createElement('style');

    const styles = `
      #playing-field {
        inline-size: max-content;
        margin-inline: auto;
        display: grid;
        gap: .2rem;
        grid-template-rows: repeat(${this.rowsCount}, ${this.cellSize});
      }
      .row {
        display: grid;
        gap: .2rem;
        grid-template-columns: repeat(${this.columnsCount}, ${this.cellSize});
      }
      .col {
        background-color: white;
      }`;

    styleEl.innerText = styles.replace(/\s/g, '');

    document.head.appendChild(styleEl);
  }
}

export default Field;
