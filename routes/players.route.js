const express = require('express');
const router = express.Router();

const playerController = require('../controllers/players.controller');

// router.use('/', (req, res, next) => {
// 	res.statusCode = 202;
// 	res.setHeader('Content-Type', 'text/plain');
// 	next();
// });

router.get('/', playerController.getPlayers);

router.get('/add-player', playerController.getAddPlayer);

router.post('/add-player', playerController.postAddPlayer);

router.get('/edit-player/:playerId', playerController.getEditPlayer);

router.post('/edit-player/:playerId', playerController.postEditPlayer);

router.post('/remove-player/:playerId', playerController.postRemovePlayer);

router.get('/:playerId', playerController.getPlayerById);

module.exports = router;
