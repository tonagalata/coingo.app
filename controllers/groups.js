const Member = require('../models/member');
const Group = require('../models/group');

module.exports = {
  index,
  show,
  newGroup,
  create
};

function index (req, res) {
  Group.find({})
  .populate('groupMember').exec(function(err, group) {
    console.log(group)
    Member.find({_id: {$in: group.groupMembers}})

    res.render('groups/show', {
      user: req.user,
      members,
      group
     }) 
  }) 
}

function show(req, res, next) {
  // console.log(req.params.id)
  Group.findById(req.params.id)
  .populate('groupMember').exec(function(err, group) {
    
    // console.log(group)
    Member.find(
      {_id: {$in: group}},
      function(err, members) {
        console.log(members)
         res.render('groups/index', {
          user: req.user,
          members,
          group
           
         });
       }
     );
    });
}

function newGroup(req, res) {
  Group.findById(req.params.id, function(err, groups) {groups})
  .populate('member').exec(function(err, groups) { 
    groups
    Member.find({},
     function(err, members) {
       res.render('groups/show', {
        groups,
        members,
        user: req.user,
        // groupName: groups.name,
        // groupMember: groups.groupMembers,
        // payeeAvatar: groups.payeeAvatar,
        // payerAvatar: groups.payerAvatar,

       });
     });

  }); console.log(req.body)

  
//   Group.find({}, function(err, groups) {
//     res.render('groups/show', {
//       user: req.user,
//       groupName: groups.name,
//       avatar: req.user.avatar,
//       groups,
//     })
//   })
// }
  }
      
function create(req, res) {
  let str = req.headers.referer;
  let ref = str.substring(29, 53)
  Member.findById(req.params.id)
  .populate('group').exec(function(err, members) {
    groups: members.group

  Group.create( 
    function(err, groups) {
    req.body,
    members,
    groups,
    res.redirect('/member/'+`${ref}`+'/groups');
  });
})
}




