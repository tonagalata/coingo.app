const Member = require('../models/member');
require('dotenv').config();
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);



module.exports = {
  index,
  addTransaction,
  delTransaction,
  delMember,
  paymentCharges,
  makePayment,
  postPayment,
  isLoggedIn,
  updateGroupMember
};

function updateGroupMember(req, res) {
  res.render(`groups/index`, {
    groupName: user.group.name,
    id: req.params.id,
    user: req.user,
    name: req.body.name,
    groupMembers: user.group.groupMembers[0]
    })
  Member.findById(req.user.id, function(err, members){
      console.log(req.body)
      console.log(req.body.groupMembers)
      console.log(req.body.name)
  members.group.push(req.body)
  members.save((err) => {
    if(err) res.redirect('/members')
  }); console.log(members)
})
}

function postPayment (req, res) {
    console.log(req.body)
    let amount = req.body.paymentAmount;
    
    stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
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
        res.render('payments/index', {
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
        });//console.log(charge.amount)
  })
  // .then(
  //   Member.findById(req.user._id, function(err, members){
  //     members.transaction.push(req.body)
  //     members.save((err) => {
  //       res.redirect('/payments');
  //     });
  //   }))
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send({error: "Purchase Failed"});
    });
  }

function paymentCharges (req, res) {
  Member.find({}, function(err, members){
  res.render('payments/show', {
    members,
    user: req.user,
    amount: req.body.payAmount
    })
  })
}

function makePayment (req, res) {
  Member.find({}, function(err, members){
    // console.log(req.body)
  res.render('payments/index', {
    members,
    user: req.user,
    groupNo: req.user._id,
    amount: req.body.payAmount || 1000
    })
  })
}

function index(req, res, next) {
  Member.find({}, function(err, members){
   res.render('members/index', {
    members,
    user: req.user,
    amount: req.body.payAmount || 500
    });
 });
}


function addTransaction(req, res, next) {
  req.user.transaction.push(req.body);
  req.user.save(function(err) {
    res.redirect('/members');
  });
}

function delTransaction(req, res) {
  
  console.log(req.params.id);
  console.log(req.user.transaction);
  req.user.transaction.splice(req.params.id, 1);

  req.user.save(function(err) {
    res.redirect('/members');
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