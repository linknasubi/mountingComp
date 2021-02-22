obj = {}

async function sum (a,b) {

    for(let i = 0; i<1000000000; i++){
        
    }

    obj.sum = a+b;
    console.log('sum');
    return a+b;
}

async function mult (c) {



    obj.mult = c*2;
    console.log(c);
    return c * 2;
}

const prom = new Promise( (resolve, reject) =>{});

prom
.then(sum(1,2))
.then(mult(obj.sum));


console.log(obj)


