const Member = require('../models/member');
const Transaction = require('../models/transaction');



module.exports = {
  // showTransactions,
  addTransaction,
  delTransaction,
  index
};


    // function showTransactions(req, res){
    //   Member.findById(req.params.id, 
    //     function(err, members){
    //     res.render('transactions/index', {
    //     members,
    //     userName: req.user.name,
    //     avatar: req.user.avatar,
    //     user: req.user,
    //     email: req.user.email
    //     })
    //   })
    // }

    function addTransaction(req, res) {
      Member.findById(req.params.id, {Member})
      const transaction = new Transaction({
        stripeToken: req.body.stripeT,
        paymentAmount: req.body.payAmount,
        payee: req.body.payee,
        payer: req.user,
        name: req.body.name,
      });
      transaction.save({
        stripeToken: req.body.stripeT,
        paymentAmount: req.body.payAmount,
        payee: req.body.payee,
        payer: req.user,
        name: req.body.name,
      }).then(result => {
        console.log(req.body)
        console.log(result)
        res.redirect('/transactions')
      }).catch(err => console.log(err)
      )};


    async function index(req, res){
      let mem = {};
      Member.find({}, function(err,member){
        mem = member
      })
      await Transaction.find({})
      .populate('payee').exec(function(err, transaction) {
        Member.find({_id: {$in: transaction}})
        res.render('transactions/index', {
          user: req.user,
          transaction,
          mem,
         }) 
      }) 
    }

    // Possible Future Functions

    function delTransaction(req, res) {  
      req.user.transaction.splice(req.params.id, 1);
      req.user.save(function(err) {
        res.redirect('/member');
      });
    }

