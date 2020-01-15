const Member = require('../models/member');
require('dotenv').config();
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);
const emoji = require('node-emoji')



module.exports = {
  showTransactions,
  addTransaction,
  delTransaction
};


    function showTransactions(req, res){
      Member.findById(req.params.id, function(err, members){
        res.render('transactions/index', {
        members,
        userName: req.user.name,
        avatar: req.user.avatar,
        user: req.user,
        email: req.user.email
        })
      })
    }

    function addTransaction(req, res, next) {
      req.user.transaction.push(req.body);
      req.user.save(function(err) {
        res.redirect('/member');
      });
    }

    function delTransaction(req, res) {  

      req.user.transaction.splice(req.params.id, 1);
    
      req.user.save(function(err) {
        res.redirect('/member');
      });
    }