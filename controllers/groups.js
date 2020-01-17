const Member = require('../models/member');
const Group = require('../models/group');

module.exports = {
  index,
  show,
  newGroup,
  create
};

function index (req, res) {
  Member.findById(req.params.id)
  .populate('group').exec(function(err, group) {
    console.log(group)
    Group.find({_id: {$in: group}})

    res.render('groups/index', {
      user: req.user,
      members,
      group
     }) 
  }) 
}

function show(req, res, next) {
  // console.log(req.params.id)
  Group.findById(req.params.id)
  .populate('member').exec(function(err, group) {
    
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
  
  
  Member.find({}, function(err, members){
    res.render('groups/show', {
     members,
     user: req.user,
     avatar: members.avatar
     // emojiStr
     });
  })
     console.log(req.body)
  }; 
      
function create(req, res) {
  let str = req.headers.referer;
  let ref = str.substring(29, 53);

  Member.find({}, function(members){members})
    Member.group.push(req.body);
    Member.group.save(function(err) {
      res.redirect('/member/'+`${ref}`+'/groups');
    });

}




