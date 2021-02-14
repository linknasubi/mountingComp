//https://www.intel.com/content/www/us/en/products/processors/core/view-all.html?page=1

const puppeteer = require('puppeteer');
const fs = require('fs');

const insertValues = require('./models/processor.js');

const Utils = require('./helpers/helper.js');


async function searchSpecs(specs){

    

    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    //if the page makes a  request to a resource type of image then abort that request

    page.on('request', request => {
      if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet')
        request.abort();
      else
        request.continue();
    });

    searchQuery = 'computador'; 


    await page.goto(specs['mainUrl']);



    await page.waitForSelector(specs['waitFor']);


    

    
    const result = await page.evaluate((argSpecs) => { //Query and filtering data
      
      
      let dataAux = {};
      let data = [];

      var views = document.querySelectorAll('li.ui-search-layout__item');
      let counter = 0;
      
      for(var view of views){
        
        for(var spec in argSpecs){
          
          
          var value =  view.querySelector(argSpecs[spec][0]) ;
          
          
          if(value != null ){
             value = value[argSpecs[spec][1]];


            }
            else { value = "Not found";  }
          
          dataAux[spec] =  value;
        };
        
        data.push(dataAux);
        dataAux = {};
        
      };

      data = Object.assign({}, data);
      


      return data;
     
    }, specs);
    

    await browser.close();

    return await result;
};


class Component  {

  constructor(filePath){

    this.filePath = filePath;
    

    this.initializer();


  };


  async initializer(){

    insertValues( await this.searchJson() );

  }

  async searchJson(){

    let proc_json = JSON.parse( fs.readFileSync(this.filePath, 'utf8') );

    let values = await searchSpecs(proc_json);

    return values;

  };

}


Processor = new Component('./jsons/processors.json');




//module.exports = searchSpecs;
