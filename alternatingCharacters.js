function alternatingCharacters(s) {
    let deleteCount = 0;
    let prev;

    s.split('').map(c => {
        if(prev == c){
            deleteCount++;
        }
        prev = c;
    });

    return deleteCount;
}

console.log(alternatingCharacters('AAA')); // 2
console.log(alternatingCharacters('ABABAABB')); // 2
console.log(alternatingCharacters('ABBABBAAB')); // 3
console.log(alternatingCharacters('BBBB')); // 3
