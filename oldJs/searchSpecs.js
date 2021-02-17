//https://www.intel.com/content/www/us/en/products/processors/core/view-all.html?page=1

const puppeteer = require('puppeteer');
const fs = require('fs');

const insertValues = require('../models/processor.js');

const Utils = require('./helpers/helper.js.js');


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
      
      
      const separObjects = (obj, f_index, l_index) =>{

        const new_obj = {}
    
        Object.keys(obj).slice(f_index, l_index).forEach( (value, key) => { //Creating a new object with some elements from the previous object that is refered to
            new_obj[value] = obj[value];
          });
    
        
        return new_obj
    
    
    }
    
      let dataAux = {};
      let data = [];

      var views = document.querySelectorAll(argSpecs['elemAll']);
      
      var specs_new = separObjects(argSpecs, 3);

      
      for(var view of views){
        
        for(var spec in specs_new){ 
          
          var value = view.querySelector(argSpecs[spec][0]) ;
          
          
          if(value != null ){
             value = value[ argSpecs[spec][1] ];
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
    
    
    console.log(result)

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
