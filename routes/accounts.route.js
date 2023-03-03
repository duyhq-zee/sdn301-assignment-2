const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

const accountsController = require('../controllers/accounts.controller');

// router.use('/', (req, res, next) => {
// 	res.statusCode = 202;
// 	res.setHeader('Content-Type', 'text/plain');
// 	next();
// });

router.get('/', accountsController.getAccounts);

router.get(
	'/edit-account/:accountId',
	isAuth,
	isAdmin,
	accountsController.getEditAccount
);

router.post(
	'/edit-account/:accountId',
	isAuth,
	accountsController.postEditAccount
);

router.get('/:accountId', accountsController.getAccountById);

module.exports = router;
