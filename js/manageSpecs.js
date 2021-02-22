

const priceSearching = require('./priceSearching');
const searchSpecs = require('./searchSpecs');


function handlingSpecs(){

    const obj = {}

    const queries = async ()  => await searchSpecs.proc;

    const computQueries = async () =>{

        const results = [];

        for(let i of queries){
    
            const searched = dataSearch('../jsons/processors.json', i);
            parsed = await searched.parsingData();
            await searched.closingData();

            results.push()
            
            console.log({queries:searched.queries, data:searched.data});

    
            searched = priceSearching.dataSearch('../jsons/mercadoLivre.json', i);
        }
    }






}


console.log(searchSpecs);