import { useState } from "react";
import classNames from "classnames";
import "./App.css";

let initBoardData;

function App() {
  const [rowCount, setRowCount] = useState(5);
  const [columnCount, setColumnCount] = useState(5);
  const [boardArr, setBoardArr] = useState([]);

  const createBoardArray = () => {
    const board = new Array(rowCount);
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(columnCount);
    }
    return board;
  };

  const countBomb = (cellData) => {
    if (cellData.bomb) {
      return -1;
    }
    let bombCount = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const posX = i + cellData.row;
        const posY = j + cellData.col;
        if (posX > -1 && posX < rowCount && posY > -1 && posY < columnCount) {
          if (initBoardData[posX][posY].bomb) {
            bombCount += 1;
          }
        }
      }
    }
    return bombCount;
  };

  const startGame = () => {
    initBoardData = createBoardArray();
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < columnCount; col++) {
        initBoardData[row][col] = {
          row,
          col,
          bomb: Math.random(1) < 0.3 ? true : false,
          open: false,
          bombCount: -1,
        };
      }
    }
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < columnCount; col++) {
        const bombCount = countBomb(initBoardData[row][col]);
        initBoardData[row][col].bombCount = bombCount;
      }
    }
    setBoardArr([...initBoardData]);
  };

  const clickCell = (boardCell) => {
    if (!boardCell.open) {
      const newData = boardArr.map((boardArrRow) =>
        boardArrRow.map((boardArrCell) => {
          if (
            boardArrCell.row === boardCell.row &&
            boardArrCell.col === boardCell.col
          ) {
            return { ...boardArrCell, open: true };
          }
          return { ...boardArrCell };
        })
      );
      setBoardArr([...newData]);
    }
    if (boardCell.bomb) {
      alert("Oops!!!! Bomb Found");
      const newData = boardArr.map((boardArrRow) =>
        boardArrRow.map((boardArrCell) => {
          return { ...boardArrCell, open: true };
        })
      );
      setBoardArr([...newData]);
    }
  };

  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <div className="input-block">
        <div className="user-input">
          <div className="input-field">
            <label>Row count</label>
            <input
              placeholder="Enter row count"
              id="row_count"
              type="number"
              min="5"
              max="20"
              value={rowCount}
              onChange={(event) => setRowCount(+event.target.value)}
            />
          </div>
          <div className="input-field">
            <label>Column count</label>
            <input
              placeholder="Enter column count"
              id="column_count"
              type="number"
              min="5"
              max="20"
              value={columnCount}
              onChange={(event) => setColumnCount(+event.target.value)}
            />
          </div>
        </div>
        <button id="start_game" onClick={startGame}>
          Start Game
        </button>
      </div>
      <div id="game_board">
        {boardArr.map((boardRow) => (
          <div className="row-div">
            {boardRow.map((boardCell) => (
              <div
                className={classNames({
                  bomb: boardCell.open && boardCell.bomb,
                  open: boardCell.open,
                  close: !boardCell.open,
                })}
                onClick={() => clickCell(boardCell)}
              >
                {(boardCell.open && !boardCell.bomb && boardCell.bombCount) ||
                  ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
