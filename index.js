const usernameKinds = [
	{label: 'username', re: /^@[a-z0-9._-]+/},
	{
		label: 'email',
		// Ref: https://emailregex.com/
		re: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/,
	},
	{
		label: 'mobile',
		// Ref: https://stackoverflow.com/a/22378975
		re: /^(\+\d{1,3}[- ]?)?\d{10}/,
	},
	{
		label: 'uuid',
		// Ref: https://stackoverflow.com/a/6640851
		re: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
	},
	{label: 'dec s/n', re: /^0$|^[1-9]+/},

	{label: 'hex s/n', re: /^0$|^[1-9a-f]+/},
	{label: 'hex string', re: /^([0-9a-f]{2})+/},

	{label: 'binary s/n', re: /^0$|^[0-1]+/},	
	{label: 'binary string', re: /^([0-1]{2})+/},
]

async function classify(username){
  return new Promise((resolve, reject) => {
  	let classified = Object()
  	classified['classified'] = Array()
		classified['username'] = username

		for(i in usernameKinds){
			let kind = usernameKinds[i]
			let match = username.match(kind.re)
			let confidence = 0

			if(match)
			    confidence = parseInt((match[0].length/username.length) * 100)

			classified['classified'].push({
				label: kind.label,
				confidence: confidence
			})
		}
		return resolve(classified)
  })
}

module.exports = {
	classify
}

