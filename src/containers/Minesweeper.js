import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faBomb } from '@fortawesome/free-solid-svg-icons';
import { getCell } from '../utils/utils';
import { updateMinesweeper } from '../actions';

const MinesweeperWrapper = styled.div`
  width: 30vw;
  height: 80vh;
  background-color: ${props =>
    props.selectedTheme == 'light'
      ? props.theme.colors.lightMainColor
      : props.theme.colors.darkMainColor};
  box-shadow: 5px 5px 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 64px;
  diplay: flex;
  flex-direction: column;
  padding-top: 5vh;
  position: relative;
  margin: 32px;
`;

const MinesweeperTable = styled.table``;

const MinesweeperRow = styled.tr``;

const MinesweeperCell = styled.td`
  width: 25px;
  height: 25px;
  background-color: grey;
`;

function checkCellNeighbours(board, x, y, cellsToBeRevealed) {
  const neighbours = [
    { x, y: y - 1 }, //top
    { x: x + 1, y }, //right
    { x, y: y + 1 }, //bottom
    { x: x - 1, y } //left
  ];

  for (var i = 0; i < neighbours.length; i++) {
    const neighbour = neighbours[i];
    const neighbourCell = getCell(board, neighbour.x, neighbour.y);
    const alreadyRevealed = cellsToBeRevealed.find(
      p => p.x === neighbour.x && p.y === neighbour.y
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

function onLeftClick(x, y, minesweeperState) {
  return () => {
    const { board, lost, won } = minesweeperState;
    if (lost || won) return;
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

    let isLost = false;
    let isWon = false;

    cellsToBeRevealed.forEach(obj => {
      const cell = board[obj.y][obj.x];
      cell.isRevealed = true;
      if (cell.isBomb) isLost = true;
    });

    if (!isLost) {
      let unrevealedCells = 0;
      board.forEach(row => {
        row.forEach(cell => {
          if (!cell.isRevealed && !cell.isBomb) {
            unrevealedCells++;
          }
        });
      });
      isWon = unrevealedCells === 0;
    }

    //if (isLost && onLose) onLose();
    //else if (isWon && onWin) onWin();
    updateMinesweeper({ board, isLost, isWon });
  };
}

function onRightClick(event, x, y) {
  event.preventDefault();
  alert('right');
}

const Minesweeper = ({ config, minesweeper, onLeftClick, onRightClick }) => {
  const minesweeperBoardRows = minesweeper.board.map((row, y) => {
    console.log(row);
    return (
      <MinesweeperRow key={y}>
        {row.map((cell, x) => {
          let cellClass = cell.bombsAround + 'BombsAround';
          let content = cell.bombsAround || '';

          if (cell.isBomb) {
            cellClass += ' bomb';
            content = <FontAwesomeIcon icon={faBomb} />;
          }

          if (cell.isFlagged && !minesweeper.lost) {
            cellClass += ' flag';
            content = <FontAwesomeIcon icon={faFlag} />;
          }

          if (!(cell.isRevealed || minesweeper.lost)) {
            cellClass += ' hidden';
            content = '';
          }

          return (
            <MinesweeperCell
              className={cellClass}
              key={x}
              onClick={onLeftClick(x, y, minesweeper)}
              onContextMenu={event => {
                onRightClick(event, x, y);
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
      <MinesweeperTable>
        <tbody>{minesweeperBoardRows}</tbody>
      </MinesweeperTable>
    </MinesweeperWrapper>
  );
};

const mapStateToProps = ({ config, minesweeper }) => {
  return { config, minesweeper };
};

export default connect(mapStateToProps, { onLeftClick, onRightClick })(
  Minesweeper
);
