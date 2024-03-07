import Cell from './Cell.js';

// Conway's Game of Life is a cellular automaton devised by mathematician John Horton Conway. Here are the basic rules:
// 1. **Cells**: The game is played on a grid of cells, each of which can be in one of two states: alive or dead.
// 2. **Neighborhood**: Each cell interacts with its eight neighbors, which are the cells horizontally, vertically, or diagonally adjacent to it.

// States
// 3. **Birth**: A dead cell with exactly three live neighbors becomes alive in the next generation, simulating reproduction.
// 4. **Survival**: A live cell with two or three live neighbors remains alive in the next generation, simulating survival.
// 5. **Death**: In all other cases, a cell dies or remains dead in the next generation due to overpopulation (more than three live neighbors) or loneliness (fewer than two live neighbors).
// These simple rules give rise to complex patterns and behaviors, making Conway's Game of Life a fascinating subject for study and exploration in the field of cellular automata.

class Field {
  rowsCount;
  columnsCount;
  rowCellArrays = [];
  playingField = document.querySelector('#playing-field')
  cellSize = '10px';
  isPlaying = false;

  // Game Loop Parameter
  lastFrameTime = 0;
  fps = 15; // Frames per second = cell generations per second
  frameDelay = 1000 / this.fps;

  constructor(rowsCount = 70, columnsCount = 150) {
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
        grid-template-rows: repeat(${this.rowsCount}, ${this.cellSize});
      }
      .row {
        display: grid;
        grid-template-columns: repeat(${this.columnsCount}, ${this.cellSize});
      }
      .col {
        background-color: white;
      }`;

    styleEl.innerText = styles.replace(/\s/g, '');

    document.head.appendChild(styleEl);
  }

  fillNeighbors() {
    this.rowCellArrays.flat().forEach(cell => {
      cell.setNeighbors(this.rowCellArrays);
    });
  }

  seedField(seedCellsCount) {
    for (let index = 0; index < seedCellsCount; index++) {
      const seedRow = Math.floor(Math.random() * this.rowsCount);
      const seedColumn = Math.floor(Math.random() * this.columnsCount);

      const seedCell = this.rowCellArrays[seedRow][seedColumn];
      seedCell.setStatus('alive');
    }
  }

  checkCells() {
    this.rowCellArrays.flat().forEach(c => c.checkStatus())
  }

  gameLoop(timestamp) {
    // Define variables
    const deltaTime = timestamp - this.lastFrameTime;

    if (deltaTime >= this.frameDelay) {
      this.lastFrameTime = timestamp - (deltaTime % this.frameDelay);

      this.checkCells();
    }

    requestAnimationFrame((t) => this.gameLoop(t))
  }

  play(seedCellsCount) {
    console.log('play game');
    this.seedField(seedCellsCount);

    requestAnimationFrame((t) => this.gameLoop(t))
  }
}

export default Field;
