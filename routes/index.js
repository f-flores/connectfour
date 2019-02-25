// =============================================
//
// File name: index.js
// Description: index of routes
//
// =============================================

const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

module.exports = router;
