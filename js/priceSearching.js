
const puppeteer = require('puppeteer');
const fs = require('fs');

const insertValues = require('../models/processor.js');

const Utils = require('../helpers/helper.js');


function dataSearch(data_json, search_query){

  let obj = {Utils}
  
  
  const loadingData = async () =>{

    console.log('Starting to loading the data...');
    

    obj._browser = await puppeteer.launch({headless:false});
    obj._page = await obj._browser.newPage();
  
  
    await obj._page.setRequestInterception(true);
    
    obj._page.on('request', request => {
      if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet') //Aborts request to a resource of image or stylesheet type
        request.abort();
      else
        request.continue();
    });

    obj.queries = await obj.Utils.jsonReader(data_json); //Parses the path to json and returns a object

    await obj._page.goto(obj.queries['mainUrl']+ search_query.replace("-", " ") + "#D" + "[" + search_query.replace("%20", " ") + "]"); //Computes the string query and goes to page
    await obj._page.waitForSelector(obj.queries['waitFor'], {timeout:10000}); //Waits for the selector mentioned to be loaded

    console.log('Page loaded!');
    
  }

  const closingData = async () =>{

    console.log('Closing the page...');

    await obj._page.close();
    await obj._browser.close();

    console.log('Page closed!');

  }
  
  obj.loadingData = loadingData;
  obj.closingData = closingData;

  const parsingData = async () =>{

    
    await obj.loadingData()
    .then(
      await setTimeout( ()=>{console.log('Querying the data...')}, 2000 )
      )
    .catch(err=>console.log(err));

    
    views = await obj._page.$$(obj.queries['elemAll']);

    specs_new = obj.Utils.separObjects(obj.queries, 3);
    

    let dataAux = {};
    let data = [];

    let counter = 0;

    for(var view in views){

      counter += 1

      for(var spec in specs_new){
        
        let element = await views[view].$(specs_new[spec][0]);

        
        if(element != null ){

           element = await obj._page.evaluate((element, specs_new, spec) => element[ specs_new[spec][1] ], element, specs_new, spec);

          }
          else { element = "Not found";  }
        
        dataAux[spec] =  element;
      };
      
      data.push(dataAux);
      dataAux = {};

      if(counter == 1){
        break;
      }
      
    };

    obj.data = data;
  }

  obj.parsingData = parsingData;

  
  return obj

}

// (async () =>{
//   const searched = dataSearch('../jsons/processors.json', 'Nvidia RTX 3090 ');
//   parsed = await searched.parsingData();
//   await searched.closingData();

//   console.log({queries:searched.queries, data:searched.data});
// })();








module.exports = {dataSearch};
