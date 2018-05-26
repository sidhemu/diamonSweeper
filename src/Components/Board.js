import React, { Component } from "react";

import Row from "./Row";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.createBoard(props),
      diamondCount: 0,
      score: 0
    };
  }
  createBoard = props => {
    let board = [];
    for (let i = 0; i < props.rows; i++) {
      board.push([]);
      for (let j = 0; j < props.columns; j++) {
        board[i].push({
          x: j,
          y: i,
          count: 0,
          isOpen: false,
          hasDiamond: false
        });
      }
    }
    for (let i = 0; i < props.diamonds; i++) {
      let randomRow = Math.floor(Math.random() * props.rows);
      let randomColumn = Math.floor(Math.random() * props.columns);

      let cell = board[randomRow][randomColumn];
      if (cell.hasDiamond) {
        i--;
      } else {
        cell.hasDiamond = true;
      }
    }
    console.log(board);

    return board;
  };

  open = cell => {
    let rows = this.state.rows;
    let current = rows[cell.y][cell.x];
    if (current.hasDiamond) {
      this.setState({ diamondCount: this.state.diamondCount + 1 });
    }
    this.setState({ rows });
    current.isOpen = true;

    if (this.state.diamondCount === 8) {
      let unOpenedCount = 0;
      console.log("Game finished");
      for (let i = 0; i < this.state.rows.length; i++) {
        let col = this.state.rows[i];
        for (let j = 0; j < col.length; j++) {
          if (!col[j].isOpen) {
            unOpenedCount++;
          }
        }
      }
      this.setState({ score: unOpenedCount });
      console.log("score is ", unOpenedCount);
    }
  };

  render() {
    let rows = this.state.rows.map((row, index) => {
      return (
        <Row
          cells={row}
          key={index}
          open={this.open}
          count={this.state.diamondCount}
        />
      );
    });
    return (
      <div className="board">
        <div>{rows}</div>
        <div>Score: {this.state.score}</div>
      </div>
    );
  }
}

export default Board;
