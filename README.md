# username-classifier

This package provides user name (ID) classifying and confidence level of classified results (ex. mobile number, email, UUID, serial number, username).  It could be used in App' login page for "multi kinds of ID login/key-in by one input box" design.


## Installation
**Install by npm**
```
npm install username-classifier
```

**Import package**
```javascript=
var classify = require('username-classifier').classify
```

## Supported type of usernames and formats

| Kind of username | Label | Example  |
| ---------------- | ----- | -------- |
| username | username | @user_name.001-abc |
| email | email | example@example.com |
| mobile | mobile | +886910123456 |
| uuid | uuid | 123e4567-e89b-12d3-a456-426655440000|
| serial number | dec_sn | 0, 1, 2, ... |
| hex serial number | hex_sn | 0, 1, 2, aa, bb, ...  |
| hex_string | hex_string | 00, 01, 1001, 00ff, ...  |
| binary serial number | bin_sn |  0,  1, 10, 11,  100,  101, ... |
| bin_string | bin_string | 00, 01, 10, 11, 0100, 0101, ...|


### On testing types

| Kind of username | Label | Example  |
| ---------------- | ----- | -------- |
| Facebook user' OAut2 access token | fb_user_token | EAAGBVsxNIksBA***  |
| Facebook app' OAut2 access token | fb_app_token | 845823***  |
| Google user' OAut2 access token | g_user_token | ya29.Glsv***  |



## Methods
### classify
Get the result of username classifying with confidence levels (0~100)% of each kind (label)

#### Example: Get classified results of usernames

**Sample code** 
```javascript=
let username = process.argv[2]

classify(username)
  .then(classified => {
    console.log(classified)
  })
  .catch(error => {console.log(error)})
```


**Result of username "+886910123456"** 
```javascript
{ classified:
   [ { label: 'username', confidence: 0 },
     { label: 'email', confidence: 0 },
     { label: 'mobile', confidence: 100 },
     { label: 'uuid', confidence: 0 },
     { label: 'dec_sn', confidence: 0 },
     { label: 'hex_sn', confidence: 0 },
     { label: 'hex_string', confidence: 0 },
     { label: 'bin_sn', confidence: 0 },
     { label: 'bin_string', confidence: 0 } ],
  username: '+886910123456' }
```

**Result of username "0011aabb@allen"** 

*The "0 confidence" labes have been dropped on following results.*
```javascript
{ classified:
   [ { label: 'hex_string', confidence: 57 },
     { label: 'bin_sn', confidence: 28 },
     { label: 'bin_string', confidence: 28 } ],
  username: '0011aabb@allen' }
```

**Result of username "0011aabb"** 

*The "0 confidence" labes have been dropped on following results.*
```javascript
{ classified:
   [ { label: 'hex_string', confidence: 100 },
     { label: 'bin_sn', confidence: 50 },
     { label: 'bin_string', confidence: 50 } ],
  username: '0011aabb' }
```
