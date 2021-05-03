function getPeeps() {
  fetch("https://chitter-backend-api-v2.herokuapp.com/peeps")
    .then(response => response.json())
    .then(data => displayPeeps(data))
}

function displayPeeps(peeps) {
  peeps.forEach(peep => {
    createPeep(peep)
  });
}

function createPeep(peep) {
  const div = document.createElement("div");
  div.classList.add("peep-item");
  div.setAttribute("id", `peep-${peep.id}`);
  let date = new Date(peep.created_at);
  date = formatDate(date);
  if (checkSession() !== "" && checkSession().id === peep.user.id) {
  div.innerHTML = `                                                 
           <div class="peepbody">${peep.body}</div>
           <div class="peepdetails" id="${peep.id}">${peep.likes.length} likes | posted by ${peep.user.handle} | ${date} <button type="button" class="delete-peep-btn">Delete</buttton></div> 
           <br>
      `;
  } else {
  div.innerHTML = `                                                 
           <div class="peepbody">${peep.body}</div>
           <div class="peepdetails">${peep.likes.length} likes | posted by ${peep.user.handle} | ${date}</div> 
           <br>
      `;
  }
  peepsContainer = document.querySelector(".peepscontainer");
  peepsContainer.appendChild(div);
}

function postPeepListener() {
  if (checkSession() !== "") {
  let postButton = document.getElementById("postButton");
  postButton.addEventListener("click", function (event) {
    event.preventDefault();
    let peepBody = document.getElementsByName("peeptext")[0].value;
    let currentUser = checkSession();
    let data = {
      "peep": {
        "user_id": `${currentUser.id}`,
        "body": `${peepBody}`
      }
    };
    let token = `Token token=${currentUser.session}`;
    postPeep(data, token);
  });
  }
}

function postPeep(data, token) {
  fetch("https://chitter-backend-api-v2.herokuapp.com/peeps", {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "  " + strTime;
}

function deletePeep(e) {
  if (e.target.classList.contains("delete-peep-btn")) {
    let id = e.target.parentElement.id; 
    let peep = document.getElementById(`peep-${id}`);
    peep.remove();
    let token = checkSession().session;
    fetch('https://chitter-backend-api-v2.herokuapp.com/peeps/' + id, {
    method: 'DELETE',
    headers: {
        'Authorization': `Token token=${token}`,
    },
    })
    .then(res => res.text()) 
    .then(res => {console.log(res);
    });
  }
}


