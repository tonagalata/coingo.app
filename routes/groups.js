const Member = require('../models/member');
const Group = require('../models/group');

const express = require('express')
const router = express.Router();
const groupsCtrl = require('../controllers/groups')
const membersCtrl = require('../controllers/members')


router.get('/member/:id/groups', membersCtrl.isLoggedIn, groupsCtrl.show);
router.get('/member/:id/groups/new', membersCtrl.isLoggedIn, groupsCtrl.newGroup)
router.post('/member/:id/groups', membersCtrl.isLoggedIn, (req, res) => {
  Member.findById(req.params.id)
  const group = new Group({
    name: req.body.groupName,
    groupMembers: req.body.groupMembers,
  });
  let str = req.headers.referer;
  let ref = str.substring(29, 53)
  group.save().then(result => {
    console.log(result)
    res.redirect(`/member/${ref}/groups`)
  })
  .catch(err => console.log(err))

})

// router.get('/:id', membersCtrl.isLoggedIn, membersCtrl.getMember)

module.exports = router;