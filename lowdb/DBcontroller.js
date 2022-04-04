import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'propositionDB.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Read data from JSON file, this will set db.data content
await db.read()
const {ConceptTable, Path} = db.data

function isSubset(subset, set) {
  if (subset in ConceptTable && set in ConceptTable) {
    Path.subset.forEach
  } else {
    console.log(false)
  }
}
isSubset("fruit", "food")
// await db.write()