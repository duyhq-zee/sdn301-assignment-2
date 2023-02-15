const express = require('express');
const router = express.Router();

const playerController = require('../controllers/players.controller');

router.use('/', (req, res, next) => {
	res.statusCode = 202;
	res.setHeader('Content-Type', 'text/plain');
	next();
});

router.get('/', playerController.getAllPlayers);

router.post('/', playerController.postAddOnePlayer);

// router.put('/', (req, res, next) => {
// 	res.statusCode = 403;
// 	res.end('PUT operation not supported on /players');
// });

router.delete('/', playerController.deleteRemoveOnePlayer);

router.get('/:playerId', playerController.getPlayerById);

// router.post('/:playerId', (req, res, next) => {
// 	res.statusCode = 403;
// 	res.end(`POST operation not supported on /players/${req.params.playerId}`);
// });

router.put('/:playerId', playerController.putUpdateOnePlayer);

router.delete('/:playerId', playerController.deleteRemoveOnePlayer);

module.exports = router;
