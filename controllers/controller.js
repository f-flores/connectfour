// =============================================
//
// File name: controller.js
// Description: controller
//
// =============================================

const Player = require("./../models/GameBoard");

// Minimum username length
const UnameMinLength = 2;

// Maximum username length
const UnameMaxLength = 10;

// Minimum password length
const MinPasswordLength = 6;

// Defining database methods for GameBoard model
module.exports = {
  findAll: function (req, res) {
    Player
      .count(req.query)
      // .sort({ playerNum: "ascending" })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // returns list of active players by player num
  findActive: function (req, res) {
    Player
      .find(req.query)
      // .sort({ playerNum: "ascending" })
      .then(dbModel => {
        const playerList = [];
        for (item of dbModel) {
          playerList.push(item.playerNum);
        }
        res.json({activeList: playerList});
      })
      .catch(err => res.status(422).json(err));
  },

  create: function (req, res) {
    const {playerName, playerNum} = req.body;
    let errorText = "error";

    let playerData = {
      playerName: playerName,
      playerNum: playerNum,
    }

    // determine player num by counting current number of players

    //use schema.create to insert data into the db
    if (playerName && playerNum) {
      Player
      .create(playerData, function (err, user) {
        if (err) {console.log(err); res.status(404).send("Username/email exists already.");}

        // Left Hand Side Comes From Sessions and Is Mapped To Our User Table
        req.session.playerId = user._id;
        req.session.playerName = user.playerName;
        req.session.playerNum = user.playerNum;
        res.json({
          isLoggedIn: true,
          playerId: req.session.playerId,
          playerName: req.session.playerName,
          playerNum: req.session.playerNum,
        });
      })
      .catch(err => res.status(422).json(err));
    }
    else {
      res.status(404).send(errorText);
    }
  },

  findOne: function(req, res) {
    if (req.body.username && req.body.password) {
      Player
        .authenticate(req.body.username, req.body.password, function (err, user) {
          if (err) {
            console.log(err);
            res.status(404).send("Incorrect username/password");
          }

          if (!user) {
            res.status(404).send("Incorrect username/password");
          } else {
            req.session.userId = user._id;
            req.session.username = user.username;
            req.session.email = user.email;
            res.json({
              isLoggedIn: true,
              userId: req.session.userId,
              username: req.session.username,
              email: req.session.email
            });
          }
        });
    }
    else {
      res.status(404).send("Incorrect username/password");
    }
  },

  findById: function (req, res) {
    // console.log(`req.session.userId: ${req.session.userId}`);
    // console.log("req.session: ", JSON.stringify(req.session));
    Player
      .findById(req.session.userId)
      .then(dbModel => {
        // if user was not found send back false
        if (!dbModel) return res.status(404).json({isLoggedIn: false});
        // console.log("dbModel in findById: " + dbModel);

        // means user is signed in already send back true
        // session: req.session
        res.json({
          isLoggedIn: true,
          session: req.session,
          userId: req.session.userId,
          username: req.session.username,
          email: req.session.email
        });
      })
      .catch(err => res.json({isLoggedIn: false, err: err}));
  },

  isAdmin: function (req, res) {
    Player
      .findById(req.session.userId)
      .then(dbModel => {
        // if user was not found send back false, status 404 not found
        if (!dbModel) return res.status(404).json({isAdmin: false});

        // check if active session user is an administrator
        if (dbModel.userType === "admin")
          res.json({isAdmin: true});
        else if (dbModel.userType === "user")
          res.json({isAdmin: false});
        else
          // user not of recognized type, possible db breach
          res.status(422).end();
      })
      .catch(err => res.json({isAdmin: false, err: err}));
  },

  update: function (req, res) {
    Player
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function (req, res) {
    Player
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  leave: function(req, res) {
    // remove player from player list
    Player
      .findById({_id: req.params.id})
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

    // destroy session
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) throw err;
        return res.status(200).json({
          playerId: "",
          playerName: "",
          playerNum: null,
        });
        // return res.redirect("/");
      });
    }
  },

};

/*

VALIDATION FUNCTIONS

   // backend validation
    // validate username
    if (req.body.username.length < UnameMinLength ||
      req.body.username.length > UnameMaxLength) {
      isValidEntry = false;
      errorText += `Username must be between ${UnameMinLength} and ${UnameMaxLength} characters.\n`;
    }

       // -----------------------------------------------------------------------
    // validateEmail() checks if an email is valid
    // source code for regular expression:
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript/1373724#1373724
    //
    function validateEmail(email) {
      var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

      return re.test(email);
    }

    // validate email
    if (!validateEmail(req.body.email)) {
      isValidEntry = false;
      errorText += `Invalid email.\n`;
    }

    // validate password
    if (req.body.password.length < MinPasswordLength) {
      isValidEntry = false;
      errorText += `Password must be at least ${MinPasswordLength} characters long.\n`;
    }

    // validate password match
    if (req.body.password !== req.body.pswrdConfirmation) {
      isValidEntry = false;
      errorText += `Password and confirmation do not match.\n`;
    }

*/
