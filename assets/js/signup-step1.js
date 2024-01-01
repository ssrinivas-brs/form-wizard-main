window.onload = function () {
  let root = document.forms[0].elements
  let elementNumber
  for (elementNumber = 0; elementNumber < root.length; elementNumber++) {
    if (root[elementNumber].type == 'text') {
      root[elementNumber].onfocus = function () {
        myFocus(this)
      }
      root[elementNumber].onkeyup = function () {
        text(this)
      }
    }
    if (root[elementNumber].type == 'email') {
      root[elementNumber].onfocus = function () {
        myFocus(this)
      }
      root[elementNumber].onkeyup = function () {
        email(this)
      }
    } else if (root[elementNumber].type == 'submit') {
      root[elementNumber].onclick = function () {
        return validation(root[elementNumber])
      }
    }
    if (root[elementNumber].type == 'password') {
      root[elementNumber].onfocus = function () {
        myFocus(this)
      }
      root[elementNumber].onkeyup = function () {
          password(this)
        strengthChecker(this)
        password(this)

      }
    }
    if (root[elementNumber].type == 'textarea') {
      root[elementNumber].onfocus = function () {
        myFocus(this)
      }
      root[elementNumber].onkeyup = function () {
        textarea(this)
      }
    } else if(root[elementNumber].type=="submit")
     {
       root[elementNumber].onclick = function()
       {
        return validation(root);
       }
     }
  }
}

function myFocus(field) {
  let err = field.name + 'error'
  if (field.value.length == 0 && !document.getElementById(err)) {
    let errorMsg = document.createElement('span')
    errorMsg.id = err
    errorMsg.textContent = ''
    errorMsg.style.color = ''
    field.parentNode.appendChild(errorMsg)
  }
}

function text(textValid) {
  let type = textValid.getAttribute('type')
  let show = textValid.name + 'error'
  let minLength = textValid.getAttribute('min')
  let maxLength = textValid.getAttribute('max')
  if (minLength == null) minLength = 2
  if (maxLength == null) maxLength = 50
  if (type == 'text') {
    let textValue = textValid.value.length
    if (textValue == 1) {
      document.getElementById(show).innerHTML = '&#10008; minimum 2 chars'
      document.getElementById(show).style.color = 'red'
      return false
    } else if (textValue >= minLength && textValue <= maxLength) {
      document.getElementById(show).innerHTML = '&#10004; ok'
      document.getElementById(show).style.color = '#1758c1'
      document.getElementById('firstname').style.border = '1px solid #1758c1'
      document.getElementById('lastname').style.border = '1px solid #1758c1'
      return true
    }
  }
}

function email(emailValid) {
  let type = emailValid.getAttribute('type')
  let show = emailValid.name + 'error'
  if (type == 'email') {
    let match = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let emailValue = emailValid.value.length
    if (emailValue == 0) {
      document.getElementById(show).innerHTML = '&#10008; Not Empty'
      document.getElementById(show).style.color = 'balck'
      return false
    }
    if (emailValue > 0 && match.test(emailValid.value) == false) {
      document.getElementById(show).innerHTML =
        '&#10008; Enter a valid email address'
      document.getElementById(show).style.color = 'red'
      return false
    }
    if (emailValue > 0 && match.test(emailValid.value) == true) {
      document.getElementById(show).innerHTML = '&#10004; ok'
      document.getElementById(show).style.color = '#1758c1'
      document.getElementById('email').style.border = '1px solid #1758c1'
      return true
    }
  }
}
function textarea(textareaValid) {
  let type = textareaValid.getAttribute('name');
  let show = textareaValid.name + 'error';

  if (type == 'address') {
      let textareaValue = textareaValid.value.trim();
      if (textareaValue.length === 0) {
          document.getElementById(show).innerHTML = '&#10008; Message cannot be empty';
          document.getElementById(show).style.color = 'red';
          textareaValid.style.border = '1px solid red';
          return false;
      } else {
          document.getElementById(show).style.color = '#1758c1';
          textareaValid.style.border = '1px solid #1758c1';
          return true;
      }
  }
}
var selectElement = document.getElementById('city');

selectElement.addEventListener('change', function () {

  var selectedOption = selectElement.options[selectElement.selectedIndex];

  var selectedValue = selectedOption.value;

  if (selectedValue.trim() === '') {
    selectElement.style.border = '1px solid red';
  } else {
    selectElement.style.border = '1px solid blue';
  }
});




let parameters = {
  count: false,
  letters: false,
  numbers: false,
  special: false,
}
let strengthBar = document.getElementById('strength-bar')
let msg = document.getElementById('msg')
function strengthChecker() {
    
  let password = document.getElementById('password').value
  parameters.letters = /[A-Za-z]+/.test(password) ? true : false
  parameters.numbers = /[0-9]+/.test(password) ? true : false
  parameters.special = /[!\"$%&/()=?@~`\\.\';:+=^*_-]+/.test(password)
    ? true
    : false
  parameters.count = password.length > 4 ? true : false
  let barLength = Object.values(parameters).filter((value) => value)
  strengthBar.innerHTML = ''
  for (let i in barLength) {
    let span = document.createElement('span')
    span.classList.add('strength')
    strengthBar.appendChild(span)
  }
  let spanRef = document.getElementsByClassName('strength')
  let link = document.getElementById('passworderror');

  for (let i = 0; i < spanRef.length; i++) {
    switch (spanRef.length - 1) {
      case 0:
        spanRef[i].style.background = '#ff3e36'
        msg.textContent = 'Your password is very weak. Use atleast 5 characters'
        break
      case 1:
        spanRef[i].style.background = '#ff691f'
        msg.textContent = 'Your password is weak.Use (0-9) digits'
        break
      case 2:
        spanRef[i].style.background = '#ffda36'
        msg.textContent = 'Your password is good. Use special characters (@, !, #, $)'
        document.getElementById('password').style.border = '1px solid #1758c1'
        link.style.visibility = 'hidden';

        break
      case 3:
        spanRef[i].style.background = '#0be881'
        msg.textContent = 'Your password is strong'
        document.getElementById('password').style.border = '1px solid #1758c1'
        link.style.visibility = 'hidden';

        break
    }
  }
  return barLength.length > 2
}
function password(pwdValid) {
  let type = pwdValid.getAttribute('type')
  let show = pwdValid.name + 'error'
  if (type == 'password') {
    
    let pwdValue = pwdValid.value.length
    if (pwdValue == 0) {
      document.getElementById(show).innerHTML = '&#10008; enter minimum 4 characters'
      document.getElementById(show).style.color = 'red'
      document.getElementById('password').style.border = '1px solid red'
      return false
    } 
    if (pwdValue == 21) {
      document.getElementById(show).innerHTML = '&#10008; enter maximum 20 characters'
      document.getElementById(show).style.color = 'red'
      document.getElementById('password').style.border = '1px solid red'
      return false
    }
    if (pwdValue >=5 && pwdValue<=20) {
      document.getElementById(show).innerHTML = '&#10004; ok'
      document.getElementById(show).style.color = '#1758c1'
      document.getElementById('email').style.border = '1px solid #1758c1'
      return true
    }
  }
}
 
function validation(form) {
  const mail = document.getElementById('email')
  const mailID = mail.value
  localStorage.setItem('email', `${mailID}`)
  let x = document.forms[0].elements
  let radioCheck = 0,
    radioButton = 0
  for (let i = 0; i < x.length; i++) {
    let funRegex = /^[A-Za-z0-9 ]/
    let match = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let type = x[i].type
    let minLength = x[i].getAttribute('min')
    let maxLength = x[i].getAttribute('max')
    if (type == 'text') {
      if (minLength == null) minLength = 2
      if (maxLength == null) maxLength = 50
      if (x[i].value.length < minLength || x[i].value.length > maxLength) {
        x[i].focus()
        x[i].style.border="1px solid red";
        return false
      } else if (
        x[i].value.length > minLength &&
        x[i].value.length < maxLength &&
        funRegex.test(x[i]).value == false
      ) {
        x[i].focus()
        x[i].style.border="1px solid red";
        return false
      }
    } else if (type == 'email') {
      if (x[i].value.length == 0) {
        x[i].focus()
        x[i].style.border="1px solid red";
        return false
      }
      if (match.test(x[i].value) != true) {
        x[i].focus()
        x[i].style.border="1px solid red";
        return false
      }
    } else if (type == 'password') {
      if (minLength == null) minLength = 4
      if (maxLength == null) maxLength = 20
      if (
        x[i].value.length < minLength ||
        x[i].value.length > maxLength ||
        x[i].value.length == 0
      ) {
        x[i].focus()
        x[i].style.border="1px solid red";
        return false
      } else if (
        strengthChecker() == false
      ) {
        x[i].focus()
        x[i].style.border="1px solid red";
        return false
      }
    } else if (type == 'textarea') {
      if (x[i].value.length == 0) {
        x[i].focus();
        x[i].style.border = '1px solid red';
        return false;
      }
    } else if (type == 'select-one') {
      if (x[i].value.length == 0) {
        x[i].focus();
        x[i].style.border = '1px solid red';
        return false;
      }
    } else if (type == 'radio') {
      let l = x[i].parentNode.children.length
      for (let j = 0; j < l; j++) {
        if (x[i].parentNode.children[j].type == 'radio') {
          radioButton++
        }
        if (x[i].parentNode.children[j].checked == true) {
          radioCheck++
          x[i].style.outline = '0px'
        }
      }
      if (radioButton > 0 && radioCheck == 0) {
        x[i].focus()
        x[i].style.outline = '1px solid red'
        return false
      } else {
        radioButton = 0
        radioCheck = 0
      }
    }
  }
}

function toggle() {
  let showPwd = document.getElementById('password')
  if (showPwd.type !== 'password') {
    showPwd.type = 'password'
    return true
  } else {
    showPwd.type = 'text'
    return true
  }
}
var cities = ["Hyderabad", "Bengalore", "kakinada", "Rajahmundry", "Chennai"];

    function populateCities() {
      var citySelect = document.getElementById('city');
      for (var i = 0; i < cities.length; i++) {
        var option = document.createElement('option');
        option.value = cities[i];
        option.text = cities[i];
        citySelect.add(option);
      }
    }

   
    populateCities();