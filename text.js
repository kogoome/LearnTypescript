var color = {
    node: "color",
    hash: 1116
};
var apple = {
    node: "apple",
    hash: 1063,
    edge: {
        subset: [],
        superset: [1127,],
        color: ["@red", "@green"]
    }
};
var fruit = {
    node: "fruit",
    hash: 1127,
    edge: {
        subset: [1063],
        superset: [],
        color: []
    }
};
var hashTable = {
    1063: apple,
    1127: fruit
};
function isSubset(subset, superset) {
    return superset.edge.subset.filter(function (obj) { return obj == subset.hash; }) ?
        "".concat(subset.node, " is ").concat(superset.node) :
        "".concat(subset.node, " is not ").concat(superset.node);
}
console.log(isSubset(apple, fruit));
