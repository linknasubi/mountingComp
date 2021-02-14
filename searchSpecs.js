//https://www.intel.com/content/www/us/en/products/processors/core/view-all.html?page=1

const puppeteer = require('puppeteer');
const fs = require('fs');

const insertValues = require('./models/processor.js');

const Utils = require('./helpers/helper.js');


async function searchSpecs(specs){
  
  
  
  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();

  await page.exposeFunction("separObjects", Utils.separObjects); //Used to acess the function inside page.evaluate

    await page.setRequestInterception(true);

    //if the page makes a  request to a resource type of image then abort that request

    page.on('request', request => {
      if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet')
        request.abort();
      else
        request.continue();
    });


    await page.goto(specs['mainUrl']);
    await page.waitForSelector(specs['waitFor']);
    
    const views = await page.evaluate((argSpecs) => { //Query and filtering data

      var views = document.querySelectorAll(argSpecs['elemAll']);

      views = Object.assign([], views);
       
      return views;
     
    }, specs);


    const queryingValues = () =>{

      const specs_new = Utils.separObjects(specs, 3);

      let dataAux = {};
      let data = [];

      
      for(var view of views){
        
        view = view[Object.keys(view)[0] ]
        console.log(view);
        
        for(var spec in specs_new){ //ESSE FOR NÃO TA FUNCIONANDO QUANDO COLOCO O SPECS_NEW
          
          var value =  view.querySelector(specs_new[spec][0]) ;
          
          if(value != null ){
             value = value[ specs_new[spec][1] ];
            }
            else { value = "Not found";  }
          
          dataAux[spec] =  value;
        };
        
        data.push(dataAux);
        dataAux = {};
        
      };

      data = Object.assign({}, data);


      return data;
    }
    
    console.log(queryingValues())

    await browser.close();

    return await queryingValues;
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
