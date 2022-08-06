import cors from 'cors';
import helmet from 'helmet';
import express, { response } from 'express';
import { dataByFloor } from './public/dataFilter.js';
import characters from './public/characters.js';
const app = express();
const port = process.env.PORT || 443;
app.use(cors());
app.use(helmet());

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
//Получаем данные с браузера на сервер.
app.post('/api', (req, res) => {
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
