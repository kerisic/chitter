let loginuser;

function loginListener() {
  let loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", function (event) {
  event.preventDefault(); 
  let handle = document.getElementsByName("loginhandle")[0].value;
  let password = document.getElementsByName("loginpassword")[0].value;
  let credentials = {"session": {"handle":`${handle}`, "password":`${password}`}};
  login(credentials)
  });
}

function login(credentials) {
  fetch("https://chitter-backend-api-v2.herokuapp.com/sessions", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(credentials),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    console.log(credentials);
    loginuser = new User(data.user_id, credentials.session.handle, data.session_key);
    saveSession(loginuser);
    hideForms();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function hideForms() {
  document.getElementsByClassName("logincontainer")[0].innerHTML = 
    `<h2>Hi ${loginuser.handle} :) Start chatting!</h2>`;
  document.getElementsByClassName("signupcontainer")[0].innerHTML = "";
}

function saveSession(user) {
  localStorage.setItem("session", JSON.stringify(user));
}

function checkSession() {
  return localStorage.getItem("session")
    ? JSON.parse(localStorage.getItem("session"))
    : "";
}

function loadSession() {
  let session = checkSession();
  if (session !== "") {
    loginuser = new User(session.user_id, session.handle, session.session_key)
    hideForms();
  }
}