import React, { Component } from "react";

import Board from "./Components/Board";

import "./App.css";

class App extends Component {
  state = {
    rows: 8,
    columns: 8,
    diamonds: 8,
    openCells: 0
  };

  render() {
    return (
      <div className="App">
        <h2>Diamond Sweeper</h2>
        <Board
          rows={this.state.rows}
          columns={this.state.columns}
          diamonds={this.state.diamonds}
          openCells={this.state.openCells}
        />
      </div>
    );
  }
}

export default App;
