import server from "express";
import { dataByFloor } from "../service/dataFilter.js";
import characters from "../data/characters.js";
//Get data from the client to the server
export const routerIndex = server.Router();
routerIndex.post("/", function (req, res) {
  const selectedCharacters = req.body;
  const userTeams = findTeams(dataByFloor, selectedCharacters);
  res.json({
    status: "success",
    selectedCharacters: selectedCharacters,
    userTeams: userTeams,
  });
});

//Функция, которая находит команды
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
  return getNames(result);
}

//Функция, которая меняет ID на имена (исп. в findTeams)
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
  return result;
}
