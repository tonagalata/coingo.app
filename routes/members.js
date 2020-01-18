const express = require('express')
const router = express.Router();
const membersCtrl = require('../controllers/members')
const transactionsCtrl = require('../controllers/transactions')


router.get('/members', membersCtrl.isLoggedIn, membersCtrl.index);
router.post('/member', membersCtrl.isLoggedIn, membersCtrl.postPayment, membersCtrl.makePayment)
router.get('/:id', membersCtrl.isLoggedIn, membersCtrl.getMember)
router.put('/:id', membersCtrl.isLoggedIn, membersCtrl.updateMember)
router.delete('/member/:id', membersCtrl.isLoggedIn, membersCtrl.deleteMember);

module.exports = router;