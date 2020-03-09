function *getPrimes(n) {
    if(isNaN(n) || n < 2){
        return `Invalid input: ${n}`;
    }

    var i = 2;
    while(i < n){
        if(isPrime(i)){
            yield i;
        }
        i++;    
    }
}

function isPrime(num){
    for(var i = 2; i < num; i++){
        if(num % i === 0){
            return false;
        }
    }
    return true;
}

let main = () => {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let res = [];
    let gen = getPrimes(n);
    
    for (let i = 0; i < n; i++) {
        let val = gen.next().value;
        if (val == undefined)
            break;
        res.push(val);
    }

    ws.write(res.join("\n") + "\n");

    ws.end();
}