const Member = require('../models/member');
const Group = require('../models/group');
const Transaction = require('../models/transaction')

const express = require('express')
const router = express.Router();
const membersCtrl = require('../controllers/members')
const transactionsCtrl = require('../controllers/transactions')


router.get('/transactions', membersCtrl.isLoggedIn, transactionsCtrl.showTransactions);
router.post('/payments', membersCtrl.isLoggedIn,  (req, res) => {

  Member.findById(req.params.id, {Member})
  const transaction = new Transaction({
    stripeToken: req.body.stripeT,
    paymentAmount: req.body.payAmount,
    payee: req.body.payee,
    payer: req.body.payer,
    name: req.body.name,
    // groupMembers: req.body.groupMembers,
    // groupAvatar: req.body.groupAvatar
  });
  // let str = req.headers.referer;
  // let ref = str.substring(29, 53)
  transaction.save().then(result => {
    console.log(result)
    res.redirect('/members')
  })
  .catch(err => console.log(err))

});//transactionsCtrl.addTransaction);

router.delete('/transactions/:id', membersCtrl.isLoggedIn, transactionsCtrl.delTransaction);

module.exports = router;