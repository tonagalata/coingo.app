const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

      // Name and Password from the register-form
      let uName = document.getElementById('name');
      let pw = document.getElementById('pw');
      let uEmail = document.getElementById('email');

      // storing input from register-form
      function store() {
          localStorage.setItem('name', uName.value);
          localStorage.setItem('pw', pw.value);
          localStorage.setItem('email', uEmail.value);
      }

      // check if stored data from register-form is equal to entered data in the   login-form
      document.getElementById('login_btn').addEventListener('click', function check(evt) {
          evt.preventDefault();
          // stored data from the register-form
          let storedName = localStorage.getItem('name');
          let storedPw = localStorage.getItem('pw');
          let storedEmail = localStorage.getItem('email');

          // entered data from the login-form
          let userName = document.getElementById('userName');
          let userPw = document.getElementById('userPw');

          // check if stored data from register-form is equal to data from login form
          if(userName.value === storedEmail && userPw.value === storedPw) {
            console.log('You are loged in.');
          }else {
              console.log('ERROR.');
          }
      });