const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');

const nationsController = require('../controllers/nations.controller');

// router.use('/', (req, res, next) => {
// 	res.statusCode = 202;
// 	res.setHeader('Content-Type', 'text/plain');
// 	next();
// });

router.get('/', nationsController.getNations);

router.post('/add-nation', isAuth, nationsController.postAddNation);

router.get('/add-nation', isAuth, nationsController.getAddNation);

router.get('/edit-nation/:nationId', isAuth, nationsController.getEditNation);

router.post('/edit-nation/:nationId', isAuth, nationsController.postEditNation);

router.post(
	'/remove-nation/:nationId',
	isAuth,
	nationsController.postRemoveNation
);

router.get('/:nationId', nationsController.getNationById);

module.exports = router;
