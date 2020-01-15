const express = require('express')
const router = express.Router();
const membersCtrl = require('../controllers/members')


router.get('/members', membersCtrl.isLoggedIn, membersCtrl.index);

router.get('/:id', membersCtrl.isLoggedIn, membersCtrl.getMember)
router.put('/:id', membersCtrl.isLoggedIn, membersCtrl.updateMember)

module.exports = router;