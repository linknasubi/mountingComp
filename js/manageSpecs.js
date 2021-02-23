

const priceSearching = require('./priceSearching');
const searchSpecs = require('./searchSpecs');


function handlingSpecs(resolve, reject){

    const obj = {results:{}}

    const queries = async ()  => await searchSpecs.proc;
    obj._queries = queries;


    const computQueries = async () =>{

        query = await obj._queries();
        
        for(let i of query){
            
            console.log(i);
            const searched = priceSearching.dataSearch('../jsons/mercadoLivre.json', i);
            parsed = await searched.parsingData();
            await searched.closingData();
            
            obj.results[i] = searched.data[0].price;
            
            console.log(obj.results);
        }


    }
    obj.computQueries = computQueries;


    return obj;

}




teste = handlingSpecs().computQueries();
