'use strict';

const fs = require('fs');
let inputString = '';

fs.readFile('./input.txt', function (err, data) {
    if (err) throw err;
    inputString += data;

    processData(inputString);
});

function processData(inputString) {
    inputString = inputString.replace(/\s+$/g, ' ').split('\n');
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

function dynamicArray(N, queries) {
    // Write your code here
    const seqList = [], result = [];
    let lastAnswer = 0;

    for (let i = 0; i < N; i++) {
        seqList[i] = [];
    }

    queries
        .forEach(query => {
            const [q, x, y] = query.map(Number);
            const seq = ((x ^ lastAnswer) % N);

            switch (q) {
                case 1:
                    seqList[seq].push(y);
                    break;
                case 2:
                    const size = seqList[seq].length;
                    const index = y % size;
                    lastAnswer = seqList[seq][index];
                    result.push(lastAnswer);
                    break;
            };
        });

    return result;
}

function main() {
    const ws = process.stdout;

    const data = inputString.split('\n');

    const firstMultipleInput = data[0];

    const n = Number(firstMultipleInput[0], 10);

    const q = Number(firstMultipleInput[1], 10);

    let queries = Array(q);

    for (let i = 1; i < data.length; i++) {
        queries.push(data[i].split(' '));
    }

    const result = dynamicArray(n, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
