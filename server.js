import express from 'express';
import server from 'express';
import { dataByFloor } from './public/dataFilter.js';
import characters from './public/characters.js';

const app = express();
const port = process.env.PORT || 443;

//Серверная часть
const routerIndex = server.Router();
app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
//Получаем данные с браузера на сервер.
routerIndex.post('/', function (req, res) {
  console.log('I got the request!');
  //req - получили запрос(данные)
  console.log(req.body);
  //Завершение: или заканчиваем или отправляем ответ
  //res.end(); - закончить post
  //res.json(); - отправляем данные (объект) обратно
  const selectedCharacters = req.body;
  const userTeams = findTeams(dataByFloor, selectedCharacters);
  res.json({
    status: 'success',
    selectedCharacters: selectedCharacters,
    userTeams: userTeams,
  });
});
app.use('/', routerIndex);
//Функция, кот. находит команды
function findTeams(obj, chars) {
  const mappedId = chars.map((char) => char.id_appsample);
  let result = {};
  let filteredTeams;
  for (const floor in obj) {
    filteredTeams = obj[floor].filter((arr) =>
      arr.every((id) => mappedId.includes(id))
    );
    result[floor] = filteredTeams;
  }
  console.log('I got result!');
  return getNames(result);
}
//Функция, кот. меняет айди на имена (исп. в findTeams)
function getNames(data) {
  let result = {};
  for (const [key, value] of Object.entries(data)) {
    const changeNumToName = value.map((team) => {
      return team.map((id) => {
        for (const char of characters) {
          if (id === char.id_appsample) {
            return (id = char.name);
          }
        }
      });
    });
    result[key] = changeNumToName;
  }
  console.log('result:', result);
  return result;
}
