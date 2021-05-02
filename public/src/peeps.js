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
    div.setAttribute("id", peep.id); 
    div.innerHTML = `                                                 
            ${peep.body}
      `;
    peepsContainer = document.querySelector(".peepscontainer");
    peepsContainer.appendChild(div); 
}