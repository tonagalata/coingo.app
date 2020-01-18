const Member = require('../models/member');
const Group = require('../models/group');
const Transaction = require('../models/transaction')


const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);
const emoji = require('node-emoji')



module.exports = {
  index,
  delMember,
  paymentCharges,
  makePayment,
  postPayment,
  isLoggedIn,
  updateGroupMember,
  getMember,
  updateMember,
  redirectToLogIn,
  login,
  loggingOut,
};

async function index(req, res, next) {
  let members = {};
  Member.find({}, function(err,member){
    members = member
  })
  await Transaction.find({})
  .populate('payee').exec(function(err, transaction) {
    Member.find({_id: {$in: transaction}})
    res.render('members/index', {
      user: req.user,
      transaction,
      members,
  // Member.find({}, function(err, members){
  //  res.render('members/index', {
  //   members,
      user: req.user,
      avatar: members.avatar
    });
 });
}

function login(req, res) {
  res.render('index', {
	  user: req.user
  });
}

function redirectToLogIn(req, res) {
  res.redirect('index', {user: req.user} );
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

function loggingOut(req, res){
  req.logout();
  res.redirect('/login');
}



function postPayment (req, res, next) {
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
        // Member.findById(req.user.id, function(err, members){
          Member.findById(req.params.id, {Member})
          const transaction = new Transaction({
            stripeToken: req.body.stripeToken,
            paymentAmount: req.body.paymentAmount,
            payee: req.body.payee,
            payer: req.user,
            name: req.body.name,
          });
         transaction.save({
          stripeToken: req.body.stripeToken,
          paymentAmount: req.body.paymentAmount,
          payee: req.body.payee,
          payer: req.user,
          name: req.body.name
         })
          res.redirect('/transactions')
      })
    }

  async function getMember(req, res){
    let mem = {};
    Member.find({}, function(err,member){
      mem = member
    })
    await Transaction.find({})
    .populate('payee').exec(function(err, transaction) {
      Member.find({_id: {$in: transaction}})
      res.render('members/show', {
        user: req.user,
        transaction,
        mem,
        userName: req.user.name,
        avatar: req.user.avatar,
        user: req.user,
        email: req.user.email
      })
    })
  }


  function updateMember(req, res){
    Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
      (err) => {
          if (err) return res.status(500).send(err);
          res.redirect(`/${req.user._id}`)
      });
  }

function paymentCharges (req, res) {
  let mem = {};
  Member.find({}, function(err,members){
    mem = members
  })
  Transaction.find({})
  .populate('payer', 'payee').exec(function(err, transaction) {
    Member.find({_id: {$in: transaction}}, Member.find({}))
  res.render('payments/show', {
    mem,
    user: req.user,
    avatar: req.user.avatar,
    amount: req.body.payAmount,
    payer: req.payer,
    payee: req.user
    })
  });
}

function makePayment(req, res){
  let mem = {};
  Member.find({}, function(err,members){
    mem = members
  })
  Transaction.find({})
  .populate('payer', 'payee').exec(function(err, transaction) {
    Member.find({_id: {$in: transaction}}, Member.find({}))
  res.render('payments/index', {
    mem,
    user: req.user,
    avatar: req.user.avatar,
    groupNo: req.user._id,
    amount: req.body.payAmount || 10000,
    payer: req.payer,
    payee: req.user
    })
  })
}

//Future Features
// Deleting Users for Site Admin
function delMember(req, res) {
  req.user.remove(req.params.id, function(err) {
    res.redirect('/');
  });
}

function updateGroupMember(req, res, next) {
  Member.findById(req.user.id, function(err, members){

  members.group.push(req.body)
  members.save((err) => {
    if(err) res.render('/group')
  })
  next(res.redirect(`/group/${req.params.id}`)); 
})
}