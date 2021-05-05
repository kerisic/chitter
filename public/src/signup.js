class User {
  constructor(id, handle, session) {
    this.id = id;
    this.handle = handle;
    this.session = session;
  }
}

let user;
let peepContainer = document.querySelector(".peepscontainer");

function eventListeners() {
  document.addEventListener("DOMContentLoaded", getPeeps());
  loadSession();
  if (checkSession() === "") {
    loginFormListener();
    signupFormListener();
  }
  peepContainer.addEventListener("click", deletePeep);
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
    let data = {
      "user": {
        "handle": `${handle}`,
        "password": `${password}`
      }
    }
    console.log(data);
    signup(data)
    
  });
}

function signupFormListener() {
  let signupFormButton =  document.getElementById("signupFormButton");
  signupFormButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementsByClassName("signupcontainer")[0].innerHTML =
    `
    <button class="backButton">Back</button>
    <form>
      <input name="handle" class="handle" type="text" placeholder="handle">
      <input name="password" class="password" type="password" placeholder="password">
      <button id="signupButton">Signup</button>
    </form>
    `;
    document.getElementsByClassName("logincontainer")[0].innerHTML = "";
    signUpListener();
    backListener();
  })
}

function signup(data) {
  let password = data.user.password;
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
      let credentials = {
        "session": {
          "handle": `${data.handle}`,
          "password": `${password}`
        }
      };
      login(credentials);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function backListener() {
  let backButton = document.getElementsByClassName("backButton")[0];
  backButton.addEventListener("click", function (event) {
    event.preventDefault();
    location.reload();
  });
}