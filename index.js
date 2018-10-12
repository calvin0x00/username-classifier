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
  {label: 'dec_sn', re: /^0$|^[1-9]+/},

  {label: 'hex_sn', re: /^0$|^[1-9a-f]+/},
  {label: 'hex_string', re: /^([0-9a-f]{2})+/},

  {label: 'bin_sn', re: /^0$|^[0-1]+/},  
  {label: 'bin_string', re: /^([0-1]{2})+/},

  {label: 'fb_user_token', re: /^([a-zA-Z0-9]{107,217})$/},
  {label: 'fb_app_token', re: /^[0-9]{15}\|[0-9a-z-A-Z]{27}$/},

  {label: 'g_user_token', re: /^ya29.[0-9a-zA-Z_-]{54,124}$/},
]

async function classify(username){
  return new Promise((resolve, reject) => {
    if((typeof username) != 'string')
      return reject('type of username must be a string')
    else if(username.length == 0)
      return reject('length of username must be greater than 0')

    let classified = Object()
    classified['classified'] = Array()
    classified['username'] = username

    for(i in usernameKinds){
      let kind = usernameKinds[i]
      let match = username.match(kind.re)
      let confidence = 0

      if(match && username.length > 0 )
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

