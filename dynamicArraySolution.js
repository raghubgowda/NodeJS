'use strict';

const fs = require('fs');
let inputString = '';

fs.readFile('./input.txt', function (err, data) {
    if (err) throw err;
    inputString += data;

    processData(inputString);
});

function processData(inputString){
    inputString = inputString.replace(/\s+$/g, '').split('\n');
    main();    
}

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'dynamicArray' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY queries
 */

function dynamicArray(n, queries) {
    // Write your code here
    let lastAnswer = 0;
    let seqList = [];
    let result = [];

    for(let i = 0; i <n ; i++){
        seqList[i] = [];
    }

    queries.slice(1).forEach( query => {
        const [q,x,y] = query.split(' ').map(i => parseInt(i, 10));
        const seq = ((x ^ lastAnswer) % n);
        switch(q){
            case 1:
                if(seqList[seq]){
                    seqList[seq].push(y);
                }
                break;
            case 2:
                if(seqList[seq] != undefined){
                    let size = seqList[seq].length;
                    lastAnswer = seqList[seq][parseInt(y % size, 10)];
                    result.push(lastAnswer);
                    break; 
                }   
        }
    });

    return result;
}

function main() {
    const ws = process.stdout;

    const data = inputString.split('\n');

    const firstMultipleInput = data[0];

    const n = parseInt(firstMultipleInput[0], 10);

    const q = parseInt(firstMultipleInput[1], 10);

    let queries = Array(q);

    for (let i = 1; i < data.length; i++) {
        queries.push(data[i]);
    }

    const result = dynamicArray(n, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
