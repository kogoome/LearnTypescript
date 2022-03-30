const Obj2 = {
  description: "a",
  relation: {
    superset: ["1"],
  }
};

const Obj1 = {
  description: "A",
  relation: {
    subset: [Obj2],
  }
};



console.log(Obj1);
// function isIncluding(a, A) {
//   return A.a == null ? "no" : "yes"
// }
