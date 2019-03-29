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

const MONGODB_LOCATION = process.env.MONGODB_URI || "mongodb://localhost/connectfour";

// connect to db
async function connect(io) {
  await mongoose.connect(MONGODB_LOCATION);
  console.log('Connected to MongoDB');

  const gameChangeStream = GameBoard.collection.watch({
    fullDocument: 'updateLookup',
  });
  gameChangeStream.on('change', event => {
    console.log('it changed', event);
    /*
    io.emit('dib changeEvent', {
      type: result.operationType,
      dib: {
        claimed: {},
        ...result.fullDocument,
        id: result.fullDocument._id,
      },
    });
    */
  });
}
exports.connect = connect;
