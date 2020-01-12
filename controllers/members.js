const Member = require('../models/member');
require('dotenv').config();
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);
const emoji = require('node-emoji')



module.exports = {
  index,
  addTransaction,
  delTransaction,
  delMember,
  paymentCharges,
  makePayment,
  postPayment,
  isLoggedIn,
  updateGroupMember,
  getMember,
  updateMember,
  redirectToLogIn
  // ,afterPay
};

function redirectToLogIn(req, res) {
  res.redirect('index', {user: req.user} );
}

function updateGroupMember(req, res, next) {
  Member.findById(req.user.id, function(err, members){
      // console.log(req.body)
      // console.log(req.body.groupMembers)
      // console.log(req.body.name)
  members.group.push(req.body)
  members.save((err) => {
    if(err) res.render('/group')
  })
  next(res.redirect(`/group/${req.params.id}`)); 
  // console.log(members)
})
}

function postPayment (req, res, next) {
    // console.log(req.body)
    let amount = (req.body.paymentAmount * 100);
    
      stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
      })
      .then(customer =>
        stripe.charges.create({
          amount,
          description: "Sample Charge",
             currency: "usd",
             customer: customer.id
        }))
      .then((charge) => {
        Member.findById(req.user.id, function(err, members){
        res.render('members/index', {
          members,
          user: req.user,
          groupNo: req.user._id,
          amount: charge.amount,
          transactionId: charge.stripeToken
          })
      members.transaction.push(req.body)
      members.save((err) => {
      console.log(err)
      });
        });
      })
    }

    function getMember(req, res){
      Member.findById(req.params.id, function(err, member){
        res.render('members/show', {
        member,
        user: req.user,
        })
      })
    }

    function updateMember(req, res){
      Member.findByIdAndUpdate(req.params.id, {new: true}, function(member){
        res.redirect('members/show', {
          member,
          user: req.user,
          }, 
          function(err){
          console.log(err)
        })
      })
    }



  //   stripe.customers.create({
  //     email: req.body.stripeEmail,
  //     source: req.body.stripeToken,
  //   })
  //   .then(customer =>
  //     stripe.charges.create({
  //       amount,
  //       description: "Sample Charge",
  //       currency: "usd",
  //       customer: customer.id
  //     }))
  //     .then((charge) => {
  //     Member.findById(req.user.id, function(err, members){
  //       res.render('members/index', {
  //         members,
  //         user: req.user,
  //         groupNo: req.user._id,
  //         amount: charge.amount,
  //         transactionId: charge.stripeToken
  //         })
  //     members.transaction.push(req.body)
  //     members.save((err) => {
  //     console.log(err)
  //     });
  //       });
  // })
  // .then(res.redirect('/member'))
  // .catch(err => {
  //     console.log("Error:", err);
  //     res.status(500).send({error: "Purchase Failed"});
  //   })
  // }

function paymentCharges (req, res) {
  console.log(req.body, req.user)
  Member.find({}, function(err, members){
  res.render('payments/show', {
    members,
    user: req.user,
    amount: req.body.payAmount,
    payer: req.memberName,
    payee: req.user
    })
  });
}

function makePayment (req, res) {
  Member.find({}, function(err, members){
  res.render('payments/index', {
    members,
    user: req.user,
    groupNo: req.user._id,
    amount: req.body.payAmount || 10000,
    payer: req.memberName,
    payee: req.user
    })
  })
}

function index(req, res, next) {
  // let emojiStr = emoji.get('pizza')
  Member.findById(req.params.id, function(err, members){
   res.render('members/index', {
    members,
    user: req.user,
    // emojiStr
    });
 });
}


function addTransaction(req, res, next) {
  req.user.transaction.push(req.body);
  req.user.save(function(err) {
    res.redirect('/member');
  });
}

function delTransaction(req, res) {  
  // console.log(req.params.id);
  // console.log(req.user.transaction);
  req.user.transaction.splice(req.params.id, 1);

  req.user.save(function(err) {
    res.redirect('/member');
  });
}

function delMember(req, res) {
  req.user.remove(req.params.id, function(err) {
    res.redirect('/');
  });
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}