const express = require('express')
const router = express.Router();

router.get('/members', function(req, res) {
  res.render('members/index');
});

module.exports = router;