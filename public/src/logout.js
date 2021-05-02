function logoutListener() {
  if (checkSession() === "") {
    document.getElementsByClassName("logoutcontainer")[0].innerHTML = 
    "";
  } else {
    document.getElementsByClassName("logoutcontainer")[0].innerHTML = 
    `<button id="logoutButton">Logout</button>`;
    let logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", function(event) {
    localStorage.clear();
    location.reload();
    })
  };
}
