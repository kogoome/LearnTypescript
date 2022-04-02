export function strHashing(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i) * i;
  }
  return hash;
}

