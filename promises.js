"use strict";
const https = require("https");

getMovieTitlesData = (title, page = 1) => {
  const url = `https://jsonmock.hackerrank.com/api/movies/search/?Title=${encodeURI(
    title
  )}&page=${page}`;

  const titles = [];
  return new Promise((resolve, reject) => {
    https
      .get(url, function(res) {
        let body = "";
        res.setEncoding("utf-8");
        res.on("data", function(chunk) {
          body += chunk;
        });
        res.on("end", function() {
          let json = JSON.parse(body);
          for (let i = 0; i < json.data.length; i++) {
            titles.push(json.data[i].Title);
          }
          // console.log(json);
          resolve({
            titles: titles,
            page: page,
            total_pages: json.total_pages
          });
        });
      })
      .on("error", function(e) {
        console.error("Got an error: ", e);
        reject(e);
      });
  });
};

function getMovieTitles(substr) {
  const promises = [];
  const titles = [];
  getMovieTitlesData(substr).then(result => {
    titles.push(...result.titles);
    for (let i = result.page + 1; i <= result.total_pages; i++) {
      promises.push(getMovieTitlesData(substr, i));
    }
    Promise.all(promises).then(datas => {
      datas.forEach(data => {
        titles.push(...data.titles);
      });
      console.log(titles.sort());
    });
  });
}

getMovieTitles("spiderman");