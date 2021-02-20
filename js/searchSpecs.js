//https://www.intel.com/content/www/us/en/products/processors/core/view-all.html?page=1

const puppeteer = require('puppeteer');
const fs = require('fs');

const insertValues = require('../models/processor.js');

const Utils = require('../helpers/helper.js');


function dataSearch(data_json){

  let obj = {Utils}
  
  
  const loadingData = async () =>{

    console.log('Starting to loading the data...');

    obj._browser = await puppeteer.launch({headless:true});
    obj._page = await obj._browser.newPage();
  
  
    await obj._page.setRequestInterception(true);
    
    obj._page.on('request', request => {
      if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet') //Aborts request to a resource of image or stylesheet type
        request.abort();
      else
        request.continue();
    });

    obj.queries = await obj.Utils.jsonReader(data_json); //Parses the path to json and returns a object

    await obj._page.goto(obj.queries['mainUrl']); //Goes to the page
    await obj._page.waitForSelector(obj.queries['waitFor']); //Waits for the selector mentioned to be loaded

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
      );

    
    views = await obj._page.$$(obj.queries['elemAll']);

    specs_new = obj.Utils.separObjects(obj.queries, 3);
    

    let dataAux = {};
    let data = [];


    for(var view in views){

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

      
    };

    obj.data = data;
  }

  obj.parsingData = parsingData;

  
  return obj

}

(async () =>{
  const searched = dataSearch('../jsons/processors.json');
  parsed = await searched.parsingData()
  await searched.closingData();

  console.log(searched);
})();




//Processor = new Component('./jsons/processors.json');




//module.exports = searchSpecs;