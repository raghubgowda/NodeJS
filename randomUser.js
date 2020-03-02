var https = require('https');
var log = console.log;
var error = console.error;
const url = 'https://randomuser.me/api/?results=1000&seed=abc';
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
                let mappedResult;
                users.map( a => {
                    results.push({
                        title: a.name.title,
                        name: `${a.name.first} ${a.name.last}` ,
                        email: a.email,
                        gender: a.gender
                    });
                    
                    //Sort based on locale
                    results.sort((a, b) => {
                        return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
                    });
                    
                    mappedResult = results.reduce((prev, curr) => {
                        if(prev[curr.name[0]] == undefined){
                            prev[curr.name[0]] = [];
                        }

                        prev[curr.name[0]].push(curr);
                        return prev;
                   }, []);
                });
                resolve(mappedResult);
            }),
            res.on('error', e => {
                reject(e);
            })
        });
    });
};

getData().then( data => {log(data)}).catch(e => {error(e)});
