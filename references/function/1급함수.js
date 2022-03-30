// container
function ul(child) {
    return "<ul>" + child + "</ul>";
}
function ol(child) {
    return "<ol>" + child + "</ol>";
}
function div(child) {
    return "<div>" + child + "</div>";
}
// list into container 
function makeLI(container, contents) {
    var liList = [];
    for (var _i = 0, contents_1 = contents; _i < contents_1.length; _i++) {
        var content = contents_1[_i];
        liList.push("<li>" + content + "</li>");
    }
    return container(liList.join(''));
}
var htmlUL = makeLI(ul, ['월', '화', '수', '목', '금', '토', '일']);
var htmlOL = makeLI(ol, ['봄', '여름', '가을', '겨울']);
var htmlDIV = makeLI(div, ['김', '나', '박', '이']);
console.log(htmlUL);
console.log(htmlOL);
console.log(htmlDIV);
