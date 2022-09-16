let username = document.getElementById('username');
let email = document.getElementById('email');
let password =document.getElementById('password');
let errorMsg = document.getElementsByClassName("error");
let succesIcon = document.getElementsByClassName("success-icon");
let fillicon = document.getElementsByClassName("fill-icon");
let confirmPasswordEl = document.getElementById('confirm-password');
let btn1Gmail = document.getElementById('btn1');
let btn2Fb = document.getElementById('btn2');


btn1Gmail.addEventListener("click", function (e) {
    e.preventDefault();
    let url = 'https://accounts.google.com/ServiceLogin/signinchooser?passive=1209600&continue=https%3A%2F%2Faccounts.google.com%2F&followup=https%3A%2F%2Faccounts.google.com%2F&flowName=GlifWebSignIn&flowEntry=ServiceLogin';
    
    window.open(url); 
})
btn2Fb.addEventListener("click", function(e) {
    e.preventDefault();
    let urlFb = 'https://ka-ge.facebook.com/';
    window.open(urlFb);
})

const form = document.querySelector('#form');

 const checkUsername= () => {
     let valid = false;
     const min=3,
               max = 25;
     const usernameEl = username.value.trim();
     if(!isRequired(usernameEl)){
          errorMsg[0].innerHTML = 'UserName Cannot be blank';
          fillicon[0].style.opacity="1";
          succesIcon[0].style.opacity="0";
     }else if(!isBetween(usernameEl.length, min, max)){
          errorMsg[0].innerHTML = `Username must be between ${min} and ${max} characters`;
          fillicon[0].style.opacity="1";
          succesIcon[0].style.opacity="0";
     }else{
          errorMsg[0].innerHTML = "";
          fillicon[0].style.opacity="0";
           succesIcon[0].style.opacity="1";
           valid= true
     }
     return valid;
 }
 const checkEmail = () => {
     let valid = false;
     const emailEl = email.value.trim();
     if (!isRequired(emailEl)) {
        errorMsg[1].innerHTML = 'Email cannot be blank';
         fillicon[1].style.opacity="1";
         succesIcon[1].style.opacity="0";
     } else if (!isEmailValid(emailEl)) {
     errorMsg[1].innerHTML='Email in not Valid.';
         fillicon[1].style.opacity="1";
         succesIcon[1].style.opacity="0";
     } else {
         valid = true;
         errorMsg[1].innerHTML=""
         fillicon[1].style.opacity="0";
         succesIcon[1].style.opacity="1";
     }
     return valid;
 };
 const checkPassword = () => {
     let valid = false;
 
 
     const passwordEl = password.value.trim();
 
     if (!isRequired(passwordEl)) {
          errorMsg[2].innerHTML='Password cannot be blank';
          fillicon[2].style.opacity="1";
          succesIcon[2].style.opacity="0";
     } else if (!isPasswordSecure(passwordEl)) {
          errorMsg[2].innerHTML='Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)';
          fillicon[2].style.opacity="1";
          succesIcon[2].style.opacity="0";
     } else {
         errorMsg[2].innerHTML=" ";
         fillicon[2].style.opacity="0";
         succesIcon[2].style.opacity="1";
         valid = true;
     }
 
     return valid;
 };

 const checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const passwordConfirm = password.value.trim();

    if (!isRequired(confirmPassword)) {
       errorMsg[3].innerHTML =  'Please enter the password again';
        // fillicon[3].style.opacity="1";
        // succesIcon[3].style.opacity="0";
    } else if (passwordConfirm !== confirmPassword) {
        errorMsg[3].innerHTML = 'The password does not match';
        // fillicon[3].style.opacity="1";
        // succesIcon[3].style.opacity="0";
    } else {
        errorMsg[3].innerHTML="";
        // fillicon[3].style.opacity="0";
        // succesIcon[3].style.opacity="1";
        valid = true;
    }

    return valid;
};


 const isEmailValid = (email) => {
     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(email);
 };
 
 const isPasswordSecure = (password) => {
     const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
     return re.test(password);
 };
 
 const isRequired = value => value === '' ? false : true;
 const isBetween = (length, min, max) => length < min || length > max ? false : true;

 form.addEventListener('submit', function (e) {
     // prevent the form from submitting
     e.preventDefault();
 
     // validate fields
     let isUsernameValid = checkUsername(),
         isEmailValid = checkEmail(),
         isPasswordValid = checkPassword(),
         isConfirmPasswordValid = checkConfirmPassword();
 
     let isFormValid = isUsernameValid &&
         isEmailValid &&
         isPasswordValid &&
         isConfirmPasswordValid;
 
     // submit to the server if the form is valid
     if (isFormValid) {
        alert('Thank you, Long In Success')
 
     }
 });
 
 
 const debounce = (fn, delay = 500) => {
     let timeoutId;
     return (...args) => {
         // cancel the previous timer
         if (timeoutId) {
             clearTimeout(timeoutId);
         }
         // setup a new timer
         timeoutId = setTimeout(() => {
             fn.apply(null, args)
         }, delay);
     };
 };
 
 form.addEventListener('input', debounce(function (e) {
     switch (e.target.id) {
         case 'username':
             checkUsername();
             break;
         case 'email':
             checkEmail();
             break;
         case 'password':
             checkPassword();
             break;
         case 'confirm-password':
             checkConfirmPassword();
             break;
     }
 }));

