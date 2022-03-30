const Obj2 = {
  description: "a",
  hashName: "@obj2",
  relation: {
    superset: ["@Obj1"],
  }
};

const Obj1 = {
  description: "A",
  hashName: "@Obj1",
  relation: {
    subset: ["@Obj2"],
  }
};

const hashLinkTable = {
  "@Obj1": Obj1,
  "@Obj2": Obj2
}

console.log(Obj1);
// function isIncluding(a, A) {
//   return A.a == null ? "no" : "yes"
// }
