type Concept = {
  name: string,
  hash: number,
}

type HashTable = {
  [hash: Concept['hash']]: Concept,
}
