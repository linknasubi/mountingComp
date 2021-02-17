function sum(a, b, callback){
    let c = callback();
    return a+b+c;

};


function sub(a,b){
    return a-b
};

var sum_a = 1;
var sum_b = 2;


function testing(num_a, num_b) {

    var d = sum(num_a,num_b, ()=>{
        return sub(num_a, num_b);
    })

    return d

}


obj = {'a':1, 'b':2}

for(let i in obj){
    console.log(i)
}