const Member = require('../models/member');

const express = require('express')
const router = express.Router();
const groupsCtrl = require('../controllers/groups')
const membersCtrl = require('../controllers/members')


// router.get('/group/:id', membersCtrl.isLoggedIn, groupsCtrl.index, membersCtrl.updateGroupMember);
// router.post('/group/:id', membersCtrl.isLoggedIn, membersCtrl.updateGroupMember, membersCtrl.index);

router.get('/member/:id/groups', membersCtrl.isLoggedIn, 
(req, res) => {
group = Member.group
Member.findById(req.params.id)
Member.find({}, function (members){ 
  res.render('groups/index', {
   members,
   group,
   groups: req.body.groups,
   groupAvatar: req.body.groupAvatar, 
   user: req.user,
  });
})
}
)


// (req, res) => {
//   Member.findById(req.params.id)
//   Group.find({})
//   .populate('groupMembers').exec(function(err, group) {
//     Member.find({_id: {$in: group}}, Member.find({})
//       )
//     res.render('groups/index', {
//       user: req.user,
//       group,
//      }) 
//   }) 
// });


//groupsCtrl.show);
router.get('/member/:id/groups/new', membersCtrl.isLoggedIn,
(req, res) => { 
  // member = {}
  // Member.findById(req.params.id, function(err,member){
  //   member = member
  // })
  Member.find({}, function (members){ 
    res.render('groups/show', {
    member,
     members,
     groups: req.body.groups,
     groupAvatar: req.body.groupAvatar, 
     user: req.user,
    });
  });

})//groupsCtrl.newGroup)

router.post('/member/:id/groups', membersCtrl.isLoggedIn, (req, res) => {
  Member.findById({}, (member) => member)
  Member.group.save({
    name: req.body.groupName,
    groupMembers: req.body.groupMembers,
    groupAvatar: req.body.groupAvatar
  });
  let str = req.headers.referer;
  let ref = str.substring(29, 53)
    .then(result => {
    console.log(result)
    res.redirect(`/member/${ref}/groups`)
  })
  .catch(err => console.log(err))

})

// router.get('/:id', membersCtrl.isLoggedIn, membersCtrl.getMember)

module.exports = router;