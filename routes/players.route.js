const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

const playerController = require('../controllers/players.controller');

// router.use('/', (req, res, next) => {
// 	res.statusCode = 202;
// 	res.setHeader('Content-Type', 'text/plain');
// 	next();
// });

router.get('/', playerController.getPlayers);

router.get('/add-player', isAuth, isAdmin, playerController.getAddPlayer);

router.post('/add-player', isAuth, isAdmin, playerController.postAddPlayer);

router.get(
	'/edit-player/:playerId',
	isAuth,
	isAdmin,
	playerController.getEditPlayer
);

router.post(
	'/edit-player/:playerId',
	isAuth,
	isAdmin,
	playerController.postEditPlayer
);

router.post(
	'/remove-player/:playerId',
	isAuth,
	isAdmin,
	playerController.postRemovePlayer
);

router.get('/:playerId', playerController.getPlayerById);

module.exports = router;
