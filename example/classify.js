var classify = require('../index.js').classify

let username = process.argv[2]

classify(username)
  .then(classified => {
  	console.log(classified)
  })
  .catch(error => {console.log(error)})
