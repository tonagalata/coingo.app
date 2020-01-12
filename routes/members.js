const express = require('express')
const router = express.Router();
const membersCtrl = require('../controllers/members')


router.get('/member', membersCtrl.index);

router.get('/:id', membersCtrl.isLoggedIn, membersCtrl.getMember)
router.post('/:id', membersCtrl.isLoggedIn, membersCtrl.updateMember)

module.exports = router;