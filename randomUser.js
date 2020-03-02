var https = require('https');
var log = console.log;
var error = console.error;
const url = 'https://randomuser.me/api/?results=10&seed=abc';
const getData = function(){
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let body = '';
            res.on('data', chunk => {
                body += chunk;
            }),
            res.on('end', () => {
                let json = JSON.parse(body);
                let results = [];
                let users = json.results;
                users.map( a => {
                    results.push({
                        title: a.name.title,
                        name: `${a.name.first} ${a.name.last}` ,
                        email: a.email,
                        gender: a.gender
                    });
                    results.sort((a,b) => {
                        if(a.name > b.name)
                            return 1;
                        else if(a.name < b.name)
                            return -1;
                        else
                            return 0;    
                            
                    });
                    // results.sort((a, b) => {
                    //     return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
                    // });
                });
                resolve(results);
            }),
            res.on('error', e => {
                reject(e);
            })
        });
    });
};

getData().then( data => {log(data)}).catch(e => {error(e)});
