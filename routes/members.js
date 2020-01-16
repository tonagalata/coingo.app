const express = require('express')
const router = express.Router();
const membersCtrl = require('../controllers/members')


router.get('/members', membersCtrl.isLoggedIn, membersCtrl.index);
router.post('/member', membersCtrl.isLoggedIn, membersCtrl.postPayment, membersCtrl.makePayment)
router.delete('/member/:id', membersCtrl.isLoggedIn, membersCtrl.delMember);
router.get('/:id', membersCtrl.isLoggedIn, membersCtrl.getMember)
router.put('/:id', membersCtrl.isLoggedIn, membersCtrl.updateMember)

module.exports = router;