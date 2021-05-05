let loginuser;

function loginListener() {
  let loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", function (event) {
    event.preventDefault();
    let handle = document.getElementsByName("loginhandle")[0].value;
    let password = document.getElementsByName("loginpassword")[0].value;
    let credentials = {
      "session": {
        "handle": `${handle}`,
        "password": `${password}`
      }
    };
    login(credentials)
  });
}

function loginFormListener() {
  let loginFormButton =  document.getElementById("loginFormButton");
  loginFormButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementsByClassName("logincontainer")[0].innerHTML =
    `
    <button class="backButton">Back</button>
    <form>
      <input class="handle" name="loginhandle" type="text" placeholder="handle">
      <input class="password" name="loginpassword" type="password" placeholder="password">
      <button id="loginButton">Login</button>
    </form>
    `;
    document.getElementsByClassName("signupcontainer")[0].innerHTML = "";
    loginListener();
    backListener();
  })
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
      showPeepForm();
      postPeepListener();
      logoutListener();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function hideForms() {
  document.getElementsByClassName("logincontainer")[0].innerHTML =
    "";
  document.getElementsByClassName("signupcontainer")[0].innerHTML = "";
}

function showPeepForm() {
  document.getElementsByClassName("chitterform")[0].innerHTML =
    `<form>
      <input name="peeptext" class="form" type="text" placeholder="  What's on your mind ${loginuser.handle}?">
      <button id="postButton"><i class="material-icons" style="font-size:13px">add</i></button>
  </form>`
}

function saveSession(user) {
  localStorage.setItem("session", JSON.stringify(user));
}

function checkSession() {
  return localStorage.getItem("session") ?
    JSON.parse(localStorage.getItem("session")) :
    "";
}

function loadSession() {
  let session = checkSession();
  if (session !== "") {
    loginuser = new User(session.user_id, session.handle, session.session_key)
    hideForms();
    showPeepForm();
  }
}