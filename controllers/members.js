const Member = require('../models/member');

module.exports = {
  index,
  addTransaction,
  delTransaction,
  delMember,
  paymentCharges,
  makePayment,
  postPayment,
  isLoggedIn
};

// function index(req, res) {
//   Student.find({}, function(err, students) {
//     res.render('students/index', { students });
//   });
// }

function postPayment (req, res) {
    console.log(req.body)
    let amount = 500;
    
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
    .then(charge => res.render('payments/charge'))
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send({error: "Purchase Failed"});
    });
  }

function paymentCharges (req, res) {
  Member.find({}, function(err, members){
  res.render('payments/show', {
    members,
    user: req.user
    // ,amount: req.body.payAmount
    })
  })
}

function makePayment (req, res) {
  Member.find({}, function(err, members){
    console.log(req.body)
  res.render('payments/index', {
    members,
    user: req.user,
    groupNo: 1
    // ,amount: req.body.payAmount || 500
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