class User {
  constructor(id, handle, session) {
    this.id = id;
    this.handle = handle;
    this.session = session;
  }
}

let user;
function eventListeners() {
  document.addEventListener("DOMContentLoaded", getPeeps());
  loadSession();
  if (checkSession() === "") {
    signUpListener();
    loginListener();
  }
  postPeepListener();
  logoutListener();
}

eventListeners();

function signUpListener() {
  let signUpButton = document.getElementById("signupButton");
  signUpButton.addEventListener("click", function (event) {
  event.preventDefault(); 
  let handle = document.getElementsByName("handle")[0].value;
  let password = document.getElementsByName("password")[0].value;
  let data = {"user": {"handle":`${handle}`, "password":`${password}`}}
  console.log(data);
  signup(data)
  });
}

function signup(data) {
  fetch("https://chitter-backend-api-v2.herokuapp.com/users", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    user = new User(data.id, data.handle, "");
    document.getElementsByClassName("signupcontainer")[0].innerHTML = 
    `<h2>Sign up successful! Now try logging in.</h2>`
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

