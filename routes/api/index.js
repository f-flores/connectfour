// =============================================
//
// File name: index.js
// Description: index of api routes
//
// =============================================

const router = require("express").Router();
const playerRoutes = require("./player/playerRoutes");

router.use("/player", playerRoutes);

module.exports = router;
