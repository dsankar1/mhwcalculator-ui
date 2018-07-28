const fs = require("fs");
const skills = require("./data/skills");
//const weapons = require("./old_data/weapons");
//const motionValues = require("./old_data/motionValues");

function filterFile() {
  let filtered = [];
  for (let skill of skills) {
    const levels = [];
    for (let rank of skill.ranks) {
      levels.push(rank.modifiers);
    }       
    filtered.push({
      name: skill.name,
      description: skill.description,
      levels
    });
  }
  fs.writeFileSync('./skills.min.json', JSON.stringify(filtered));
  fs.writeFileSync('./skills.json', JSON.stringify(filtered, null, 4));
}

function getSharpness(sharpness) {
  if (sharpness["white"] > 0) {
    return "white";
  } else if (sharpness["blue"] > 0) {
    return "blue";
  } else if (sharpness["green"] > 0) {
    return "green";
  } else if (sharpness["yellow"] > 0) {
    return "yellow";
  } else if (sharpness["orange"] > 0) {
    return "orange";
  } else {
    return "red";
  }
}

Array.prototype.removeIf = function(callback) {
    var i = this.length;
    while (i--) {
        if (callback(this[i], i)) {
            this.splice(i, 1);
        }
    }
};

function filterWeapons() {
  let filtered = [];
  for (let weapon of weapons) {
    if (weapon.rarity >= 6) {
      let sharpness = weapon.sharpness ? getSharpness(weapon.sharpness) : undefined;
      let elements = weapon.elements;
      elements.removeIf(element => {
         return (element.type === "blast" || element.type === "paralysis" || element.type === "sleep" || element.type === "poison" || element.type === "stun");
      });
      console.log(elements);
      filtered.push({
        name: weapon.name,
        type: weapon.type,
        attack: weapon.attack.display,
        affinity: weapon.attributes.affinity ? parseInt(weapon.attributes.affinity, 10) : 0,
        element: elements.length > 0 ? elements[0].damage : 0,
        sharpness
      });
    }
  }
  fs.writeFileSync('./weapons.json', JSON.stringify(filtered, null, 4));
}

function attacks() {
  let filtered = [];
  for (let value of motionValues) {
    filtered.push({
      name: value.name,
      weapon: value.weaponType,
      type: value.damageType,
      hits: value.hits
    });
  }
  fs.writeFileSync('./attacks.json', JSON.stringify(filtered, null, 4));
}

//attacks();
filterFile();
//filterWeapons();
