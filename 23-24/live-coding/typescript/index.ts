import { List, Map } from "immutable"

let l = List([1,2,3,])
let m = Map([[1, "John"], [2, "Jane"], [3, "Влад"], [4, "Влад"]])
let s = m.valueSeq().toSet()
console.log(l.toArray())
console.log(s.toArray())
