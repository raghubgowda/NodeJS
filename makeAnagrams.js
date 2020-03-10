let log = console.log;

function makeAnagram(a, b) {
    const aChars = getCharArray(a), bChars = getCharArray(b);
    let deleteCount = 0;
    const chars = 'abcdefghijklmnopqrstuvwxyz';

    for(let c in getCharArray(chars)){
        deleteCount += Math.abs((aChars[c] || 0)  - (bChars[c] || 0));
    }

    return deleteCount;
}


function getCharArray(a){
    const aChars = {};
    a.split('').map(c => {
        if(aChars[c] != undefined){
            aChars[c]++;
        }
        else{
            aChars[c] = 1;
        }
    });
    return aChars;
}

log(makeAnagram('cde','abc'));

