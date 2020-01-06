const Member = require('../models/member');
const GroupAdmin = require('../models/groupAdmin')

module.exports = {
  index,
  show
};

// function index(req, res) {
//   Student.find({}, function(err, students) {
//     res.render('students/index', { students });
//   });
// }

function index(req, res) {
  console.log(req.body)
  Member.findById({_id}, function(err, members){
    res.render('groupAdmins/index', {
      members,
      Authorized: members[0].groupAdmin,
      user: req.user
      }); console.log(members[0].groupAdmin)
 });
}

function show(req, res) {
  // Member.find({}, { $set: {"groupAdmin" : true} })
//   .populate('groupAdmin').exec(function(err, member) {
//     GroupAdmin.find(
//      {_id: {$nin: member.groupAdmin}},
//      function(err, groupAdmin) {
//        res.render('groupAdmins/show', {
//         member, groupAdmin
//        });
//      }
//    );console.log(member)
//   });
}