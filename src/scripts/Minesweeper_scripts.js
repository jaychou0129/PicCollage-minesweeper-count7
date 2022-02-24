import { calculateCount } from './helpers'

export const initializeBoard = (b, first_click_row, first_click_col, gameConfig) => {
  placeBombs(b, first_click_row, first_click_col, gameConfig);
  calculateNumbers(b, gameConfig);
};

const adjacentTo = (ax, ay, bx, by) => {
  return Math.abs(ax - bx) <= 1 && Math.abs(ay - by) <= 1;
};

const placeBombs = (b, start_x, start_y, gameConfig) => {
  for (let i = 0; i < gameConfig.numBombs; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * gameConfig.dimension);
      y = Math.floor(Math.random() * gameConfig.dimension);
    } while (b[x][y] === "BOMB" || adjacentTo(x, y, start_x, start_y));
    // bombs cannot be placed where there's already a bomb, or adjacent to the first click

    b[x][y] = "BOMB";
  }
};

const calculateNumbers = (b, gameConfig) => {
  const dx_list = [-1, 0, 1],
    dy_list = [-1, 0, 1];
  for (let i = 0; i < gameConfig.dimension; i++) {
    for (let j = 0; j < gameConfig.dimension; j++) {
      if (b[i][j] === "BOMB") continue;

      let count = 0;
      dx_list.forEach((dx) => {
        dy_list.forEach((dy) => {
          if (dx === 0 && dy === 0) return;
          if (
            i + dx < 0 ||
            i + dx >= gameConfig.dimension ||
            j + dy < 0 ||
            j + dy >= gameConfig.dimension
          )
            return;
          if (b[i + dx][j + dy] === "BOMB") count += 1;
        });
      });
      if (count > 0) b[i][j] = count;
    }
  }
};

export const propagateOpening = (b, cellStates, start_x, start_y, gameConfig, gameState, setGameState) => {
  // flip the starting cell
  cellStates[start_x][start_y] = 1;
  if (b[start_x][start_y] === "") {
    let flipSet = new Set();
    propagateOpeningHelper(b, flipSet, start_x, start_y, gameConfig);
    for (let flipItem of flipSet) {
      const [x, y] = flipItem.split("-");
      cellStates[x][y] = 1;
    }
  }
  setGameState({
    ...gameState,
    cellStates: cellStates,
    numUnflipped:
      gameConfig.dimension * gameConfig.dimension -
      calculateCount(cellStates, 1),
  });
};

const propagateOpeningHelper = (b, flipSet, x, y, gameConfig) => {
  // skips if already in FLIPSET or out of bounds

  if (
    flipSet.has(`${x}-${y}`) ||
    x >= gameConfig.dimension ||
    x < 0 ||
    y >= gameConfig.dimension ||
    y < 0
  )
    return;
  flipSet.add(`${x}-${y}`);
  if (b[x][y] === "") {
    propagateOpeningHelper(b, flipSet, x + 1, y + 1, gameConfig);
    propagateOpeningHelper(b, flipSet, x + 1, y, gameConfig);
    propagateOpeningHelper(b, flipSet, x + 1, y - 1, gameConfig);
    propagateOpeningHelper(b, flipSet, x, y + 1, gameConfig);
    propagateOpeningHelper(b, flipSet, x, y - 1, gameConfig);
    propagateOpeningHelper(b, flipSet, x - 1, y + 1, gameConfig);
    propagateOpeningHelper(b, flipSet, x - 1, y, gameConfig);
    propagateOpeningHelper(b, flipSet, x - 1, y - 1, gameConfig);
  }
};

export const flipCells = (cellStates, flipArray, gameState, setGameState) => {
  if (flipArray.length === 0) return;
  const [x, y] = flipArray[0].split('-');
  flipArray.shift();
  setTimeout( () => {
    cellStates[x][y] = 1;
    setGameState({...gameState, cellStates: cellStates});
    flipCells(cellStates, flipArray, gameState, setGameState)
  }, 100)
}