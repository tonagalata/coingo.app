const Member = require('../models/member');

module.exports = {
  index
};

// function index(req, res) {
//   Student.find({}, function(err, students) {
//     res.render('students/index', { students });
//   });
// }

function index(req, res, next) {
  console.log(req.params.id)
  Member.find({}, function(err, members){
   res.render('groups/index', {
    members,
    user: req.user,
    id: req.params.id
    });
 });
}

// function index(req, res, next) {
//   Member.find({}, function(err, members){
//    res.render('members/index', {
//     members,
//     user: req.user
//     });
//  });
// }





