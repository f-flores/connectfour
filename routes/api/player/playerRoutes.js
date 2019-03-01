// =============================================
//
// File name: playerRoutes.js
// Description: player's api routes. CRUD
//  operations done through routes.
//
// =============================================


const router = require("express").Router();
const dbController = require("../../../controllers/controller");
// const player = require("../../../models/GameBoard");

// For "/api/player"
router
  .route("/")
  .get(function(req, res) {dbController.findAll(req, res);})
  .post(function(req, res) {dbController.create(req, res);});

// For "/api/player/activelist"
router
  .route("/activelist")
  .get(function(req, res) {dbController.findActive(req, res);})
  .put(function(req, res) {dbController.update(req, res);})
  .delete(function(req, res) {dbController.remove(req, res);});

// for "/api/player/leave/:pnum"
router
  .route("/leave/:pnum")
  .delete(function(req, res) {dbController.exitGame(req,res);})

module.exports = router;
