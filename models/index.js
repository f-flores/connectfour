// Export All Models
const mongoose = require('mongoose');

module.exports = {
  GameBoard: require("./GameBoard.js"),
};

const MONGODB_LOCATION = process.env.MONGODB_URI || "mongodb://localhost/connectfour";
console.log(`right before connect(io) in ./models/index.js`);

// connect to db
async function connect(io) {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/connectfour", { useNewUrlParser: true });
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
