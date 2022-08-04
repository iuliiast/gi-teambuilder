import _ from 'lodash';
import data from './data.json' assert { type: 'json' };

//Массивы всех существующих команд по этажам бездны
const floor9_a = [];
const floor9_b = [];
const floor10_a = [];
const floor10_b = [];
const floor11_a = [];
const floor11_b = [];
const floor12_a = [];
const floor12_b = [];

//Объект с массивами всех команд
const sortedData = {
  floor9_a: floor9_a,
  floor9_b: floor9_b,
  floor10_a: floor10_a,
  floor10_b: floor10_b,
  floor11_a: floor11_a,
  floor11_b: floor11_b,
  floor12_a: floor12_a,
  floor12_b: floor12_b,
};

//Сортировка команд по этажам (все данные с дубликатами)
data.map((el) => {
  for (const [key, value] of Object.entries(el)) {
    switch (key) {
      case 'f9_1_a':
        floor9_a.push(value);
      case 'f9_1_b':
        floor9_b.push(value);
      case 'f10_1_a':
        floor10_a.push(value);
      case 'f10_1_b':
        floor10_b.push(value);
      case 'f11_1_a':
        floor11_a.push(value);
      case 'f11_1_b':
        floor11_b.push(value);
      case 'f12_1_a':
        floor12_a.push(value);
      case 'f12_1_b':
        floor12_b.push(value);
    }
  }
});

//Функция, убирающая дубликаты команд
const removeDublicates = (data) => {
  const arr = [];
  return data.filter((arr, (item) => !(arr[item] = item in arr)));
};

//Результат модуля - Убрать дубликаты у объекта sortedData
export const dataByFloor = {};
for (const [key, value] of Object.entries(sortedData)) {
  dataByFloor[key] = removeDublicates(value);
}
