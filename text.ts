type Concept = {
  node: string,
  hash: number,
  edge: {
    subset: number[],
    superset: number[],
    color: string[],
}

const color = {
  node: "color",
  hash: 1116,
}

const apple:Concept = {
  node: "apple",
  hash: 1063,
  edge: {
    subset:[],
    superset: [1127,],
    color: ["@red", "@green"],
  }
};

const fruit:Concept = {
  node: "fruit",
  hash: 1127,
  edge: {
    subset: [1063],
    superset:[],
    color:[]
  }
};

const hashTable = {
  1063: apple,
  1127: fruit,
}



function isSubset(subset:Concept, superset:Concept) {
  return superset.edge.subset.filter(obj=>obj == subset.hash ) ?
    `${subset.node} is ${superset.node}` :
    `${subset.node} is not ${superset.node}`
}

console.log(isSubset(apple, fruit));


