const Member = require('../models/member');
const Transaction = require('../models/transaction');
require('dotenv').config();
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);
const emoji = require('node-emoji')



module.exports = {
  showTransactions,
  addTransaction,
  delTransaction,
  index
};


    function showTransactions(req, res){
      Member.findById(req.params.id, 
        function(err, members){
        res.render('transactions/index', {
        members,
        userName: req.user.name,
        avatar: req.user.avatar,
        user: req.user,
        email: req.user.email
        })
      })
    }

    function addTransaction(req, res) {

      Member.findById(req.params.id, {Member})
      const transaction = new Transaction({
        stripeToken: req.body.stripeT,
        paymentAmount: req.body.payAmount,
        payee: req.body.payee,
        payer: req.user,
        name: req.body.name,
        
      });
      
      
      // let str = req.headers.referer;
      // let ref = str.substring(29, 53)
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

    // function addTransaction(req, res, next) {
    //   req.user.transaction.push(req.body);
    //   req.user.save(function(err) {
    //     res.redirect('/member');
    //   });
    // }

    function delTransaction(req, res) {  

      req.user.transaction.splice(req.params.id, 1);
    
      req.user.save(function(err) {
        res.redirect('/member');
      });
    }

    async function index(req, res){
      let mem = {};
      Member.find({}, function(err,members){
        mem = members
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