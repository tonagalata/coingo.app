const express = require('express')
const router = express.Router();
const membersCtrl = require('../controllers/members')
const transactionsCtrl = require('../controllers/transactions')


router.get('/transactions', membersCtrl.isLoggedIn, transactionsCtrl.index)

router.post('/payments', membersCtrl.isLoggedIn, transactionsCtrl.addTransaction);

router.delete('/transactions/:id', membersCtrl.isLoggedIn, transactionsCtrl.delTransaction);

module.exports = router;