import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import { strHashing } from './hashing';


const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'propositionDB.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Read data from JSON file, this will set db.data content
await db.read()
const Data = db.data
Data = [
  "hashTable" = {},
  "ConceptTable" = {},
  "Concept" = {},
  "hashPath" = {
    subset: [],
    include: []
  }
]

Data.hashTable = {
  619: tree,
  633: food,
  1063: apple,
  1127: fruit,
}
Data.Concept = {}


console.log(Data);





// await db.write()