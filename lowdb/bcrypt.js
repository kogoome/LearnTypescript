import bcrypt from 'bcrypt'

const salt1 = 10
const salt2 = 1

const str1 = "a"
const str2 = "a"
const hash1 = bcrypt.hashSync(str1, salt1)
const hash2 = bcrypt.hashSync(str2, salt2)
console.log(hash1)
console.log(hash2)

console.log(bcrypt.compareSync(str1, hash2))
console.log(bcrypt.compareSync(str2, hash1))