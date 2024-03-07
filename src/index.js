import Field from './Field.js';

const startButton = document.querySelector('#btn-start');

const seedCellsCount = 200;
const field = new Field();

field.drawField();

field.fillNeighbors();

startButton.addEventListener('click', () => {
  field.play(seedCellsCount);
});
