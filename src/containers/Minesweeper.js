import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFlag,
  faBomb,
  faClock,
  faRedoAlt,
} from '@fortawesome/free-solid-svg-icons';
import { getCell } from '../utils/utils';
import { updateMinesweeper, resetMinesweeper } from '../actions';

const MinesweeperWrapper = styled.div`
  width: 20vw;
  height: 80vh;
  background: ${(props) =>
    props.selectedTheme === 'light'
      ? 'linear-gradient(200.6deg, #EBF2F9 19.14%, #C6D7EB 154.68%);'
      : 'linear-gradient(200.6deg, #353A40 -3.02%, #121416 93.08%)'};
  box-shadow: ${(props) =>
    props.selectedTheme === 'light'
      ? '-16px -16px 40px rgba(255, 255, 255, 0.8),16px 4px 64px rgba(18, 61, 101, 0.3),inset -8px -6px 80px rgba(255, 255, 255, 0.18)'
      : '36px 12px 64px rgba(2, 3, 3, 0.7), -12px -20px 56px rgba(232, 237, 243, 0.05), inset -16px -6px 80px rgba(248, 249, 249, 0.03)'};
  border-radius: 32px;
  diplay: flex;
  flex-direction: column;
  padding-top: 5vh;
  position: relative;
  margin: 32px;
`;

const Header = styled.div`
  height: 10%;
  position: relative;
  display: flex;
  align-items: center;
`;

const Timer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5%;
  position: absolute;
  left: 16px;
  border-radius: 16px;
  width: 45%;
  height: 80%;
  background: ${(props) =>
    props.selectedTheme === 'light'
      ? '#E3EDF7'
      : 'linear-gradient(144.05deg,#32383E -69.07%,#17191C 122.22%)'};
  box-shadow: ${(props) =>
    props.selectedTheme === 'light'
      ? 'inset -3px -3px 7px #FFFFFF, inset 2px 2px 5px rgba(136, 165, 191, 0.38)'
      : ' inset -2px -2px 10px rgba(255, 255, 255, 0.05), inset 2px 3px 10px #070709'};

  .icon {
    color: #516d7b !important;
    font-size: 2.5rem;
  }

  .time {
    color: #516d7b !important;
    font-size: 2rem;
    font-weight: 800;
    margin-left: 15%;
    overflow: hidden;
  }
`;

const RestartButton = styled.button`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  background: ${(props) =>
    props.selectedTheme === 'light'
      ? props.theme.colors.lightMainColor
      : 'linear-gradient(144.05deg, #32383E -69.07%, #17191C 122.22%)'};
  box-shadow: ${(props) =>
    props.selectedTheme === 'light'
      ? ' -4px -2px 16px #FFFFFF, 4px 2px 16px rgba(136, 165, 191, 0.48)'
      : '-4px -2px 16px rgba(195, 200, 205, 0.08), 4px 4px 18px rgba(0, 0, 0, 0.5);'};
  border-radius: 50%;
  position: absolute;
  right: 16px;
  color: #516d7b;
`;

const MinesweeperTable = styled.table`
  width: 100%;
  padding: 8px;
  border-spacing: 8px 8px;
  margin-top: 2vh;
`;

const MinesweeperRow = styled.tr``;

const MinesweeperCell = styled.td`
  width: 50px;
  height: 50px;
  background: ${(props) =>
    props.selectedTheme === 'light'
      ? props.theme.colors.lightMainColor
      : 'linear-gradient(144.05deg, #32383E -69.07%, #17191C 122.22%)'};
  box-shadow: ${(props) =>
    props.selectedTheme === 'light'
      ? 'inset -4px -4px 16px rgba(255, 255, 255, 0.8), inset 4px 4px 12px rgba(136, 165, 191, 0.4)'
      : 'inset -2px -2px 12px rgba(255, 255, 255, 0.06), inset 2px 3px 16px rgba(7, 7, 9, 0.8)'};
  border-radius: 8px;
  text-align: center;
  vertical-align: middle;
  font-size: 1.5rem;
  font-weight: 800;
  &.hidden {
    background: linear-gradient(69.08deg, #f8ac75 2.63%, #d76238 132.25%);
    box-shadow: ${(props) =>
      props.selectedTheme === 'light'
        ? ' -6px -6px 16px rgba(255, 255, 255, 0.6), 4px 12px 16px rgba(244, 102, 0, 0.42)'
        : '-6px -6px 16px rgba(0, 0, 0, 0.6), 4px 12px 16px rgba(244, 102, 0, 0.2)'};
  }

  &.cell_1 {
    color: #dd6e41;
  }
  &.cell_2 {
    color: #7a9db8;
  }
  &.cell_3 {
    color: #dea040;
  }
  &.cell_4 {
    color: #be6be0;
  }
  &.cell_5 {
    color: #3bab68;
  }
  &.cell_6 {
    color: #af525f;
  }
  &.cell_7 {
    color: #e45656;
  }
  &.cell_8 {
    color: #b31315;
  }

  &.bomb {
    color: #4f6b79;
    font-size: 2rem;
  }

  &.flag {
    color: #4f6b79;
    font-size: 1.5rem;
  }
`;

const Minesweeper = ({
  config,
  minesweeper,
  updateMinesweeper,
  resetMinesweeper,
}) => {
  const [time, setTime] = useState(0);
  let timer;
  function timeCounter() {}

  useEffect(() => {
    timer = setTimeout(() => {
      if (!(minesweeper.lost || minesweeper.won)) {
        setTime(time + 1);
      }
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  function restart() {
    clearTimeout(timer);
    resetMinesweeper();
    setTime(0);
  }

  function onLeftClick(x, y, minesweeperState, updateMinesweeper) {
    const { board, lost, won } = minesweeperState;
    if (lost || won) return;

    if (time === 0) timeCounter();

    const clickedCell = board[y][x];
    let cellsToBeRevealed = [{ x, y }];
    if (clickedCell.bombsAround === 0)
      checkCellNeighbours(board, x, y, cellsToBeRevealed);
    else if (clickedCell.isRevealed) {
      let flaggedCellsInRange = 0;
      let unflaggedCells = [];

      board.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell.isFlagged) flaggedCellsInRange++;
          else unflaggedCells.push({ x, y });
        });
      });

      if (clickedCell.bombsAround === flaggedCellsInRange) {
        cellsToBeRevealed = cellsToBeRevealed.concat(unflaggedCells);
      }
    }

    let lostNow = false;
    let wonNow = false;

    cellsToBeRevealed.forEach((obj) => {
      const cell = board[obj.y][obj.x];
      cell.isRevealed = true;
      if (cell.isBomb) lostNow = true;
    });

    if (!lostNow) {
      let unrevealedCells = 0;
      board.forEach((row) => {
        row.forEach((cell) => {
          if (!cell.isRevealed && !cell.isBomb) {
            unrevealedCells++;
          }
        });
      });
      wonNow = unrevealedCells === 0;
    }

    //if (isLost && onLose) onLose();
    //else if (isWon && onWin) onWin();
    const newMinesweeperState = { board, lost: lostNow, won: wonNow };
    updateMinesweeper(newMinesweeperState);
  }
  function checkCellNeighbours(board, x, y, cellsToBeRevealed) {
    const neighbours = [
      { x, y: y - 1 }, //top
      { x: x + 1, y }, //right
      { x, y: y + 1 }, //bottom
      { x: x - 1, y }, //left
    ];

    for (var i = 0; i < neighbours.length; i++) {
      const neighbour = neighbours[i];
      const neighbourCell = getCell(board, neighbour.x, neighbour.y);
      const alreadyRevealed = cellsToBeRevealed.find(
        (p) => p.x === neighbour.x && p.y === neighbour.y
      );
      if (neighbourCell && !neighbourCell.isBomb && !alreadyRevealed) {
        cellsToBeRevealed.push(neighbour);
        if (neighbourCell.bombsAround === 0)
          checkCellNeighbours(
            board,
            neighbourCell.x,
            neighbourCell.y,
            cellsToBeRevealed
          );
      }
    }
  }

  function onRightClick(
    event,
    x,
    y,
    minesweeperState,
    updateMinesweeper,
    resetMinesweeper
  ) {
    event.preventDefault();
    const { board, lost, won } = minesweeperState;
    if (lost || won) return;
    if (time === 0) timeCounter();
    const cell = board[y][x];
    cell.isFlagged = !cell.isFlagged;
    updateMinesweeper({ board });
  }

  /* Based on https://stackoverflow.com/a/37770048 */
  function secondsToString(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
  }

  const minesweeperBoardRows = minesweeper.board.map((row, y) => {
    return (
      <MinesweeperRow key={y}>
        {row.map((cell, x) => {
          let cellClass = 'cell_' + cell.bombsAround;
          let content = cell.bombsAround || '';

          if (cell.isBomb) {
            cellClass += ' bomb';
            content = <FontAwesomeIcon icon={faBomb} />;
          }

          if (
            !(cell.isRevealed || minesweeper.lost) &&
            !(cell.isFlagged && !minesweeper.lost)
          ) {
            cellClass += ' hidden';
            content = '';
          }

          if (cell.isFlagged && !minesweeper.lost) {
            cellClass += ' flag';
            content = <FontAwesomeIcon icon={faFlag} />;
          }
          return (
            <MinesweeperCell
              selectedTheme={config.theme}
              className={cellClass}
              key={x}
              onClick={() => {
                onLeftClick(x, y, minesweeper, updateMinesweeper);
              }}
              onContextMenu={(event) => {
                onRightClick(event, x, y, minesweeper, updateMinesweeper);
              }}
            >
              {content}
            </MinesweeperCell>
          );
        })}
      </MinesweeperRow>
    );
  });

  return (
    <MinesweeperWrapper selectedTheme={config.theme}>
      <Header>
        <Timer selectedTheme={config.theme}>
          <FontAwesomeIcon icon={faClock} className="icon" />
          <div className="time">{secondsToString(time)}</div>
        </Timer>
        <RestartButton
          selectedTheme={config.theme}
          onClick={() => {
            restart();
          }}
        >
          <FontAwesomeIcon icon={faRedoAlt} className="restart" />
        </RestartButton>
      </Header>
      <MinesweeperTable>
        <tbody>{minesweeperBoardRows}</tbody>
      </MinesweeperTable>
    </MinesweeperWrapper>
  );
};

const mapStateToProps = ({ config, minesweeper }) => {
  return { config, minesweeper };
};

export default connect(mapStateToProps, {
  updateMinesweeper,
  resetMinesweeper,
})(Minesweeper);
