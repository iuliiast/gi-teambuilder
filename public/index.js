import characters from '/characters.js';

const charactersEl = document.getElementById('characters-el');
const resultsBtn = document.getElementById('resultsBtn');
const chooseAllBtn = document.getElementById('chooseAllBtn');
const loader = document.getElementById('loader');
const list91 = document.getElementById('list9-1');
const list92 = document.getElementById('list9-2');
const list101 = document.getElementById('list10-1');
const list102 = document.getElementById('list10-2');
const list111 = document.getElementById('list11-1');
const list112 = document.getElementById('list11-2');
const list121 = document.getElementById('list12-1');
const list122 = document.getElementById('list12-2');

let userCharactersNames = [];
let selectedCharacters = [];

//Цикл генерации карточек персонажей
for (let i = 0; i < characters.length; i++) {
  charactersEl.innerHTML += `
		<div class="card">
			<img
			src="assets/${characters[i]['name']}.png"
			alt="character-pic"
			class="card-pic"/>
			<p class="card-name">${characters[i]['name']}</p>
		</div>
	`;
}

//Клик на карту персонажа, добавление & удаление карты в массив персонажей пользователя
const cards = document.querySelectorAll('.card');
for (let card of cards) {
  card.addEventListener('click', function (event) {
    card.style.background = 'linear-gradient(#ff7e5f, #feb47b)'; //clicked style
    let name = card.innerText;
    if (!userCharactersNames.includes(name)) {
      userCharactersNames.push(name);
      selectedCharacters = characters.filter((char) =>
        userCharactersNames.includes(char.name)
      );
      //userCharsEl.innerHTML += `${name} `;
    } else {
      userCharactersNames = userCharactersNames.filter((char) => char !== name);
      card.style.background = 'transparent'; //unclick
      selectedCharacters = characters.filter((char) =>
        userCharactersNames.includes(char.name)
      );
    }
  });
}

const makeTeam = (team) => {
  return `<div class='team'>
	${team
    .map((name) => {
      return `<div class="small-card">
		<img src="assets/${name}.png"
		alt="char-pic" />
		</div>
		`;
    })
    .join('')}
	</div>
	`;
};

//Find results (button)
const findResults = async function () {
  if (userCharactersNames.length === 0) {
    alert(`You haven't chosen anyone.`);
  } else {
    loader.classList.replace('hide-loader', 'loader');
    const data = selectedCharacters;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    //Отправка данных с браузера на сервер
    const res = await fetch('/api', options);
    //Получаем данные с сервера на браузера
    const json = await res.json();
    const userTeams = json.userTeams;
    console.log('JSON:', userTeams);
    loader.classList.replace('loader', 'hide-loader');
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
    results.classList.replace('section-hidden', 'section-visible');
    results.scrollIntoView({
      behavior: 'smooth',
    });
  }
};

resultsBtn.addEventListener('click', () => {
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

chooseAllBtn.addEventListener('click', function () {
  for (let card of cards) {
    let name = card.innerText;
    card.style.background = 'linear-gradient(#ff7e5f, #feb47b)'; //clicked style
    userCharactersNames.push(name);
    // selectedCharacters = characters.filter((char) =>
    //   userCharactersNames.includes(char.name)
    // );
    selectedCharacters = [
      {
        id: '8',
        id_appsample: 10000039,
        name: 'Diona',
        main_role: 'Heal',
        element: 'Cryo',
      },
      {
        id: '9',
        id_appsample: 10000031,
        name: 'Fischl',
        main_role: 'SupDD',
        second_role: 'MainDD',
        element: 'Electro',
      },
      {
        id: '10',
        id_appsample: 10000037,
        name: 'Ganyu',
        main_role: 'MainDD',
        second_role: 'SupDD',
        element: 'Cryo',
      },
      {
        id: '11',
        id_appsample: 10000046,
        name: 'Hu Tao',
        main_role: 'MainDD',
        element: 'Pyro',
      },
      {
        id: '17',
        id_appsample: 10000041,
        name: 'Mona',
        main_role: 'SupDD',
        second_role: 'MainDD',
        element: 'Hydro',
      },
      {
        id: '18',
        id_appsample: 10000027,
        name: 'Ningguang',
        main_role: 'MainDD',
        second_role: 'Support',
        element: 'Geo',
      },
      {
        id: '19',
        id_appsample: 10000034,
        name: 'Noelle',
        main_role: 'MainDD',
        second_role: 'Support',
        element: 'Geo',
      },
      {
        id: '26',
        id_appsample: 10000022,
        name: 'Venti',
        main_role: 'SupDD',
        element: 'Anemo',
      },
      {
        id: '27',
        id_appsample: 10000023,
        name: 'Xiangling',
        main_role: 'SupDD',
        second_role: 'MainDD',
        element: 'Pyro',
      },
      {
        id: '28',
        id_appsample: 10000026,
        name: 'Xiao',
        main_role: 'MainDD',
        element: 'Anemo',
      },
    ];
  }
});
