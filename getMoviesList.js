var https = require('https');
const log = console.log;
function fetchData(substr) {
    pageNum = 1;
    let url = 'https://jsonmock.hackerrank.com/api/movies/search/?Title=' + substr + "&page=" + pageNum;
    https.get(url, (res) => {
        res.setEncoding('utf8');
        res.on('data', function(body) {
            let dataRec = JSON.parse(body);
            let movies = dataRec.data;
            let totPages = dataRec.total_pages;
            let sortArray = [];
            movies.map((a) => {
              sortArray.push(a.Title)
            });
            for (let i = 2; i <= totPages; i++) {
                let newPage = i;
                let url1 = 'https://jsonmock.hackerrank.com/api/movies/search/?Title=' + substr + "&page=" + newPage;
                https.get(url1, (res) => {
                    res.setEncoding('utf8');
                    res.on('data', function(body) {
                        let newData = JSON.parse(body);
                        let newMovies = newData.data;
                        newMovies.map(a => sortArray.push(a.Title));
                    })
                })
            }
            log(sortArray);
        })
    })
}

//primary function 
function getMovieTitles(substr) {
    fetchData(substr);
}

getMovieTitles("Spiderman");

