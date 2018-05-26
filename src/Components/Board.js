import React, { Component } from "react";

import Row from "./Row";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.createBoard(props),
      diamondCount: 0,
      score: 0,
      finished: false
    };
  }

  /* createBoard function is to create the 8x8 grid for the game*/
  createBoard = props => {
    let board = [];
    for (let i = 0; i < props.rows; i++) {
      board.push([]);
      for (let j = 0; j < props.columns; j++) {
        board[i].push({
          x: j,
          y: i,
          isOpen: false,
          hasDiamond: false
        });
      }
    }

    /*This is to randomally put the diamond in the grid*/
    for (let i = 0; i < props.diamonds; i++) {
      let randomRow = Math.floor(Math.random() * props.rows); //random selecttion of the row
      let randomColumn = Math.floor(Math.random() * props.columns); // random selection of the columns
      let cell = board[randomRow][randomColumn];
      if (cell.hasDiamond) {
        i--;
      } else {
        cell.hasDiamond = true;
      }
    }
    return board;
  };

  /*open function is to open the cell when clicked to see the avaibility of the diamond*/

  open = cell => {
    /*to get the count of the neares diamond asyncronously */
    let asyncCountDiamond = new Promise(resolve => {
      let diamonds = this.findDiamond(cell);
      resolve(diamonds);
    });

    let rows = this.state.rows;
    let current = rows[cell.y][cell.x];

    //If the cell have the diamond the count of diamond will be updated
    if (current.hasDiamond) {
      this.setState({ diamondCount: this.state.diamondCount + 1 }, () => {
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
          this.setState({ score: unOpenedCount, finished: true });
        }
      });
    } else {
      /*Gives the count of the diamond*/
      asyncCountDiamond.then(noOfDiamonds => {
        console.log(noOfDiamonds);
      });
    }

    this.setState({ rows }); //Gives the latest rows
    current.isOpen = true; //change the current cell to open

    console.log(this.state.diamondCount);
  };

  /*findDiamond to find the nearest diamond around the clicked cell*/

  findDiamond = cell => {
    let diamondProxi = 0;
    let xAxis = 0;
    let yAxis = 0;
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col < 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (
            cell.y + row < this.state.rows.length &&
            cell.x + col < this.state.rows[0].length
          ) {
            if (
              this.state.rows[cell.y + row][cell.x + col].hasDiamond &&
              !(row === 0 && col === 0)
            ) {
              diamondProxi++;
              xAxis = cell.x + col;
              yAxis = cell.y + row;
            }
          }
        }
      }
    }

    //returns the count of the diamonds near the current cell and also tells the location
    return { count: diamondProxi, x: xAxis, y: yAxis };
  };

  render() {
    let rows = this.state.rows.map((row, index) => {
      return (
        <Row
          cells={row}
          key={index}
          open={this.open}
          finished={this.state.finished}
          count={this.state.diamondCount}
        />
      );
    });
    return (
      <div className="board">
        <div>{rows}</div>
        <div>Score: {this.state.score}</div>
        {this.state.finished ? <div>Game Finished</div> : null}
      </div>
    );
  }
}

export default Board;
