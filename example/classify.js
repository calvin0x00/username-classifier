//import { classify } from '../index.js'
var classify = require('../index.js').classify

let username = process.argv[2]

classify(username)
  .then(classified => {
  	console.log(classified)//JSON.stringify(info, null, 3))
  })
  .catch(error => {console.log(error)})
