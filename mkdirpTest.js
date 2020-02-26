const mkdirp = require('mkdirp');
mkdirp('testFolder').then(data => console.log(`created a directory ${data}`));
