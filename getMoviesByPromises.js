"use strict";
var https = require('https');
var log = console.log;
var error = console.error;

getMovies("Spiderman");

function getMovies(title){
    let promises = [];
    let movieTitles = [];

    getMovieData(title, 1).then( result => {
        movieTitles.push(...result.titles);
        for(let i = 2; i <= result.totalPages; i++){
            promises.push(getMovieData(title, i));
        }
        Promise.all(promises).then(result => {
            result.forEach( a => {movieTitles.push(...a.titles)});
            log(`Movies list for the title ${title} : ${movieTitles}`);
        }).catch(e => {error(e)});
    }).catch(e => {error(e)});
};

function getMovieData(title, page = 1){
    return new Promise((resolve, reject) => {
        let url = `https://jsonmock.hackerrank.com/api/movies/search/?Title=${encodeURI(title)}&page=${page}`;
        https
            .get(url, resp => {
                let movieTitles = [];
                let body = "";
                resp.setEncoding('utf-8');
                resp.on('data', (data) => {
                    body += data;    
                });
                resp.on('end', () => {
                    let json = JSON.parse(body);
                    let moviesData = json.data;
                    moviesData.map( a => movieTitles.push(a.Title));
                    resolve({
                        titles: movieTitles,
                        totalPages: json.total_pages
                    }); 
                });
            })
            .on('error', (e) => {
                error(e);
                reject(e);
            });
    });
}


