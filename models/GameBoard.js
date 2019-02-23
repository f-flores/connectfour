import { Schema } from "mongoose";

// ===========================================
//
// File name: GameBoard.js
// Description: Mongo DB model for game board
//
// ===========================================

const boardSchema = new Schema({
  player: {
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
  namePlayer: {
    type: String
  }
});

const GameBoard = mongoose.model("GameBoard", boardSchema);

module.exports = GameBoard;
