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
  Member.find({}, function(err, members){
   res.render('admins/index', {
    members,
    user: req.user
    });
 });
}