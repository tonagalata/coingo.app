const Member = require('../models/member');
const Group = require('../models/group');

const express = require('express')
const router = express.Router();
const groupsCtrl = require('../controllers/groups')
const membersCtrl = require('../controllers/members')


// router.get('/group/:id', membersCtrl.isLoggedIn, groupsCtrl.index, membersCtrl.updateGroupMember);
// router.post('/group/:id', membersCtrl.isLoggedIn, membersCtrl.updateGroupMember, membersCtrl.index);

router.get('/member/:id/groups', membersCtrl.isLoggedIn, 
(req, res) => {
  Member.findById(req.params.id)
  Group.find({})
  .populate('groupMembers').exec(function(err, group) {
    Member.find({_id: {$in: group}}, Member.find({})
      )
    res.render('groups/index', {
      user: req.user,
      group,
     }) 
  }) 
});


//groupsCtrl.show);
router.get('/member/:id/groups/new', membersCtrl.isLoggedIn,
(req, res) => { 
  let mem = {};
  Member.find({}, function(err,members){mem = members})

  Member.find({}, function (member){ 
    res.render('groups/show', {
     mem, 
     member,
     groups: req.body.groups,
     groupAvatar: req.body.groupAvatar, 
     user: req.user,
    });
  });

})//groupsCtrl.newGroup)
router.post('/member/:id/groups', membersCtrl.isLoggedIn, (req, res) => {
  Member.findById(req.params.id, {Member})
  const group = new Group({
    name: req.body.groupName,
    groupMembers: req.body.groupMembers,
    groupAvatar: req.body.groupAvatar
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