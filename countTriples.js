"use strict";
var log = console.log;

function countTriplets(arr, r) {
    let triplesCount = 0;
    let mapForStart = new Map();
    let mapForMiddle = new Map();
    /*
        Sorting is a must if not sorted.
    */
    arr.sort((x,y) => {
        if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
    });
    //log(arr);

    arr.forEach( num => {
        if(num % r == 0){
            let prev = num / r;

            let countForEnd = mapForMiddle.get(prev);
            if(countForEnd != undefined){
                triplesCount += countForEnd;
            }

            let countForMiddle = mapForStart.get(prev);
            if(countForMiddle != undefined){
                mapForMiddle.set(num, (mapForMiddle.get(num) || 0 ) + countForMiddle);
            }
        }   
        mapForStart.set(num, (mapForStart.get(num) || 0) + 1); 
    });

    return triplesCount;
}

log(countTriplets([1, 25, 5, 125, 5], 5));
log(countTriplets([1, 2, 1, 2, 4], 2));
log(countTriplets([1, 2, 2, 4], 2));
log(countTriplets([1, 3, 9, 9, 27, 81], 3));
log(countTriplets([1, 1, 1, 1], 1));

