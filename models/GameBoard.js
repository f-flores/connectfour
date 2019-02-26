// ===========================================
//
// File name: GameBoard.js
// Description: Mongo DB model for game board
//
// ===========================================

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  playerNum: {
    type: Number,
    default: 0,
    required: true
  },
  xPos: {
    type: Number
  },
  yPos: {
    type: Number
  },
  playerName: {
    type: String
  },
  color: {
    type: String
  }
});

const GameBoard = mongoose.model("GameBoard", boardSchema);

module.exports = GameBoard;
