import data from './data.json' assert { type: 'json' };

//Arrays of all existed teams
const floor9_a = [];
const floor9_b = [];
const floor10_a = [];
const floor10_b = [];
const floor11_a = [];
const floor11_b = [];
const floor12_a = [];
const floor12_b = [];

//Obj with arrays of all teams
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

//Sort teams by floor (with duplicates)
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

//A function that removes duplicate commands
const removeDublicates = (data) => {
  const arr = [];
  return data.filter((arr, (item) => !(arr[item] = item in arr)));
};

//Result of module - Remove duplicates from the sortedData object
export const dataByFloor = {};
for (const [key, value] of Object.entries(sortedData)) {
  dataByFloor[key] = removeDublicates(value);
}

data.filter((value, index, array) => array[array.indexOf(value)] === index);
