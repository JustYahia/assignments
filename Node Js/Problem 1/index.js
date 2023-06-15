const fs = require('fs');


const jsonData = fs.readFileSync('problem1.json', 'utf-8');
const data = JSON.parse(jsonData);


data.height = 10;
data.weight = 5;


data.name = 'Fluffyy';


const fluffyyCatFriends = data.catFriends;
for (const cat of fluffyyCatFriends) {
  console.log('Activities of', cat.name, ':', cat.activities);
}


const catFriendNames = fluffyyCatFriends.map(cat => cat.name);
console.log('CatFriends names:', catFriendNames);


const totalWeight = fluffyyCatFriends.reduce((sum, cat) => sum + (cat.weight || 0), 0);
console.log('Total weight of catFriends:', totalWeight);


let totalActivities = data.activities.length;
for (const cat of fluffyyCatFriends) {
  totalActivities += cat.activities.length;
}
console.log('Total activities of all cats:', totalActivities);


const bar = fluffyyCatFriends.find(cat => cat.name === 'bar');
if (bar) {
  bar.activities.push('play with yarn', 'nap in the sun');
}

const foo = fluffyyCatFriends.find(cat => cat.name === 'foo');
if (foo) {
  foo.activities.push('hunt mice', 'climb trees');
}


if (bar) {
  bar.furcolor = 'gray';
}

const updatedJsonData = JSON.stringify(data, null, 2);
fs.writeFileSync('output.json', updatedJsonData, 'utf-8');

console.log('Updated data saved to output.json');
