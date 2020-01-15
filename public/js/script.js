document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, options);
});

// Or with jQuery

$('.dropdown-trigger').dropdown();

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('#dropdown-trigger');
  var instances = M.Dropdown.init(elems, options);
});

$(document).ready(function(){
  $('select').formSelect();
});

// $(document).ready(function() {
 
//             $('#paymentInput').focusout((e) => {
//               let fundingAmount = $('#paymentInput')[0].value
//               if(fundingAmount <= 0) {
//                 $('#paymentInput')[0].defaultValue = 100
//                 fundingAmount = $('#paymentInput')[0].defaultValue * 100
//               }
//               let convertedAmount = (fundingAmount*100)
//               $('#paymentBtn')[0].dataset.amount = convertedAmount
//               $('#paymentBtn')[0].dataset.description = "Stripe Payment for " + "$" + (convertedAmount)
//              })

//           $('#paymentBtn:submit').on('click', function(event) {
            
//             event.preventDefault();
//             // let charged = document.getElementById('paymentInput').value
//             // $('paymentBtn').attr("data-amount", chargedValue)
//               var $button = $(this),
//                   $form = $button.parents('form');
//               var opts = $.extend({}, $button.data(), {
//                   token: function(result) {
//                       $form.append($('<input>').attr({ type: 'hidden', name: 'stripeToken', value: result.id})).submit(); //, data-amount: chargedValue
//                   }
//               });
//               StripeCheckout.open(opts);
//           });
//       });



      // // check if stored data from register-form is equal to entered data in the   login-form
      // document.getElementById('login_btn').addEventListener('click', function check(evt) {
      //     evt.preventDefault();
      //     // stored data from the register-form
      //     let storedName = localStorage.getItem('name');
      //     let storedPw = localStorage.getItem('pw');
      //     let storedEmail = localStorage.getItem('email');

      //     // entered data from the login-form
      //     let userName = document.getElementById('userName');
      //     let userPw = document.getElementById('userPw');

      //     // check if stored data from register-form is equal to data from login form
      //     if(userName.value === storedEmail && userPw.value === storedPw) {
      //       console.log('You are loged in.');
      //     }else {
      //         console.log('ERROR.');
      //     }
      // });

      var handler = StripeCheckout.configure({
        key: 'pk_test_bxWBtKKtZqxBNXPxKzE8BLU8001CMawzKx',
        image: '/images/coingo_logo.png',
        token: function(token) {
          $("#stripeToken").val(token.id);
          $("#stripeEmail").val(token.email);
          $("#amountInCents").val(Math.floor($("#amountInDollars").val() * 100));
          $("#stripMyForm").submit();
        }
      });
      
      $('#customButton').on('click', function(e) {
        var amountInCents = Math.floor($("#amountInDollars").val() * 100);
        var displayAmount = parseFloat(Math.floor($("#amountInDollars").val() * 100) / 100).toFixed(2);
        // Open Checkout with further options
        handler.open({
          name: 'CoinGo',
          description: 'Amount | $' + displayAmount,
          amount: amountInCents,
        });
        e.preventDefault();
      });
      
      // Close Checkout on page navigation
      $(window).on('popstate', function() {
        handler.close();
      });