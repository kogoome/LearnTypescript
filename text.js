const color = {
  node: "color",
  hash: "@color",

}

const apple = {
  node: "apple",
  hash: "@apple",
  edge: {
    subset:[],
    superset: ["@fruits"],
    color: ["@red", "@green"],
  }
};

const fruit = {
  node: "fruit",
  hash: "@fruits",
  color: "not defined",
  edge: {
    subset: ["@apple"],
    superset:[],
  }
};

const hashTable = {

}



function isSubset(subset, superset) {
  return superset.edge.subset.filter(obj=>obj == subset.hash ) ?
    `${subset.node} is ${superset.node}` :
    `${subset.node} is not ${superset.node}`
}

console.log(isSubset(apple, fruit));

function strHashing (str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i) * i;
  }
  return hash;
}

console.log(strHashing("apple"));
