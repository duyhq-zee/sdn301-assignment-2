const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

const nationsController = require('../controllers/nations.controller');

// router.use('/', (req, res, next) => {
// 	res.statusCode = 202;
// 	res.setHeader('Content-Type', 'text/plain');
// 	next();
// });

router.get('/', nationsController.getNations);

router.post('/add-nation', isAuth, isAdmin, nationsController.postAddNation);

router.get('/add-nation', isAuth, isAdmin, nationsController.getAddNation);

router.get(
	'/edit-nation/:nationId',
	isAuth,
	isAdmin,
	nationsController.getEditNation
);

router.post(
	'/edit-nation/:nationId',
	isAuth,
	isAdmin,
	nationsController.postEditNation
);

router.post(
	'/remove-nation/:nationId',
	isAuth,
	isAdmin,
	nationsController.postRemoveNation
);

router.get('/:nationId', nationsController.getNationById);

module.exports = router;
