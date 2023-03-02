const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');

const playerController = require('../controllers/players.controller');

// router.use('/', (req, res, next) => {
// 	res.statusCode = 202;
// 	res.setHeader('Content-Type', 'text/plain');
// 	next();
// });

router.get('/', playerController.getPlayers);

router.get('/add-player', isAuth, playerController.getAddPlayer);

router.post('/add-player', isAuth, playerController.postAddPlayer);

router.get('/edit-player/:playerId', isAuth, playerController.getEditPlayer);

router.post('/edit-player/:playerId', isAuth, playerController.postEditPlayer);

router.post(
	'/remove-player/:playerId',
	isAuth,
	playerController.postRemovePlayer
);

router.get('/:playerId', playerController.getPlayerById);

module.exports = router;
