import Cell from './Cell.js';

class Field {
  rowsCount;
  columnsCount;
  rowCellArrays = [];
  playingField = document.querySelector('#playing-field')
  cellSize = '5px';

  // Game Loop Parameter
  lastFrameTime = 0;
  fps = 3; // Frames per second
  frameDelay = 1000 / this.fps;

  constructor(rowsCount = 50, columnsCount = 50) {
    this.rowsCount = rowsCount;
    this.columnsCount = columnsCount;
  }

  drawField() {
    this.addStyles();

    for (let rowIndex = 0; rowIndex < this.rowsCount; rowIndex++) {
      const rowEl = document.createElement('div');
      rowEl.classList.add('row');
      const rowCellArray = [];

      for (let columnIndex = 0; columnIndex < this.columnsCount; columnIndex++) {

        const columnEl = document.createElement('div');
        columnEl.classList.add('col');
        rowEl.appendChild(columnEl);
        rowCellArray.push(new Cell(rowIndex, columnIndex, columnEl));
      }

      this.addRowCell(rowCellArray);

      this.playingField.appendChild(rowEl);
    }
  }

  addRowCell(rowCell) {
    this.rowCellArrays.push(rowCell)
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

  update() {
    // TODO
  }

  gameLoop(timestamp) {
    // Define variables
    const deltaTime = timestamp - this.lastFrameTime;

    if (deltaTime >= this.frameDelay) {
      this.lastFrameTime = timestamp - (deltaTime % this.frameDelay);

      this.update();
    }

    requestAnimationFrame((t) => this.gameLoop(t))
  }

  play() {
    requestAnimationFrame((t) => this.gameLoop(t))
  }
}

export default Field;
