//https://www.intel.com/content/www/us/en/products/processors/core/view-all.html?page=1

const puppeteer = require('puppeteer');
const fs = require('fs');

const proc_json = JSON.parse(fs.readFileSync('./jsons/processors.json', 'utf8'));






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


    await page.goto('https://lista.mercadolivre.com.br/'+ searchQuery.replace("-", " ") + "#D" + "[" + searchQuery.replace("%20", " ") + "]");



    await page.waitForSelector('li.ui-search-layout__item');

    
    const result = await page.evaluate((argSpecs) => { 
      
      
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
      
      return data;
     
    }, specs);
    
    
    console.log(result);


    await browser.close();

    return result;
};

searchSpecs(proc_json);


//module.exports = searchSpecs;
