import characters from "../../data/characters.js";
const charactersEl = document.getElementById("characters-el");
const resultsBtn = document.getElementById("resultsBtn");
const loader = document.getElementById("loader");
const list91 = document.getElementById("list9-1");
const list92 = document.getElementById("list9-2");
const list101 = document.getElementById("list10-1");
const list102 = document.getElementById("list10-2");
const list111 = document.getElementById("list11-1");
const list112 = document.getElementById("list11-2");
const list121 = document.getElementById("list12-1");
const list122 = document.getElementById("list12-2");

let userCharactersNames = [];
let selectedCharacters = [];

//Generating character cards
for (let i = 0; i < characters.length; i++) {
  charactersEl.innerHTML += `
		<div class="card">
			<img
			src="../../images/${characters[i]["name"]}.png"
			alt="character-pic"
			class="card-pic"/>
			<p class="card-name">${characters[i]["name"]}</p>
		</div>
	`;
}

//Click on card, add & delete card to user data
const cards = document.querySelectorAll(".card");
for (let card of cards) {
  card.addEventListener("click", function (event) {
    card.style.background = "linear-gradient(#ff7e5f, #feb47b)"; //clicked style
    let name = card.textContent.trim();
    if (!userCharactersNames.includes(name)) {
      userCharactersNames.push(name);
    } else {
      userCharactersNames = userCharactersNames.filter((char) => char !== name);
      card.style.background = "transparent"; //unclick
    }
  });
}

const makeTeam = (team) => {
  return `<div class='team'>
	${team
    .map((name) => {
      return `<div class="small-card">
		<img src="../../images/${name}.png"
		alt="char-pic" />
		</div>
		`;
    })
    .join("")}
	</div>
	`;
};

const isEmpty = (obj) => {
  return Object.keys(obj).every((key) => obj[key].length === 0);
};

//Find results (button)
const findResults = async function () {
  selectedCharacters = characters.filter((char) =>
    userCharactersNames.includes(char.name)
  );
  if (userCharactersNames.length === 0) {
    alert(`You haven't chosen anyone.`);
  } else {
    loader.classList.replace("hide-loader", "loader");
    const data = selectedCharacters;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    //Send data from client to the server
    const res = await fetch("/", options);
    //Send data from server to the client
    const json = await res.json();
    const userTeams = json.userTeams;
    console.log("JSON:", userTeams);
    if (isEmpty(userTeams)) {
      alert(`Sorry, there are no teams. Please select more characters.`);
      loader.classList.replace("loader", "hide-loader");
    } else {
      loader.classList.replace("hide-loader", "loader");
      userTeams.floor9_a.map((team) => {
        list91.innerHTML += makeTeam(team);
      });
      userTeams.floor9_b.map((team) => {
        list92.innerHTML += makeTeam(team);
      });
      userTeams.floor10_a.map((team) => {
        list101.innerHTML += makeTeam(team);
      });
      userTeams.floor10_b.map((team) => {
        list102.innerHTML += makeTeam(team);
      });
      userTeams.floor11_a.map((team) => {
        list111.innerHTML += makeTeam(team);
      });
      userTeams.floor11_b.map((team) => {
        list112.innerHTML += makeTeam(team);
      });
      userTeams.floor12_a.map((team) => {
        list121.innerHTML += makeTeam(team);
      });
      userTeams.floor12_b.map((team) => {
        list122.innerHTML += makeTeam(team);
      });
      results.classList.replace("section-hidden", "section-visible");
      results.scrollIntoView({
        behavior: "smooth",
      });
      loader.classList.replace("loader", "hide-loader");
    }
  }
};

resultsBtn.addEventListener("click", () => {
  list91.innerHTML = ``;
  list92.innerHTML = ``;
  list101.innerHTML = ``;
  list102.innerHTML = ``;
  list111.innerHTML = ``;
  list112.innerHTML = ``;
  list121.innerHTML = ``;
  list122.innerHTML = ``;
  findResults();
});
