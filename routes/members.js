const express = require('express')
const router = express.Router();

router.get('/members', function(req, res) {
  res.render('members/index', function (member){ id: member._id});
});

module.exports = router;