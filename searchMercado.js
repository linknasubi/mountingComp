

const puppeteer = require('puppeteer');


// function stringManager(value){

//     f_value = String();
//     s_value = String();

//     if(value.includes(' ')){
//         f_value = value.split(' ');
//         return f_value;
//     }
// };


//console.log(stringManager('computador gamer'));

//https://lista.mercadolivre.com.br/computador-gamer#D[A:computador%20gamer]

const searchMercado = async(searchQuery) => {


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


    await page.goto('https://lista.mercadolivre.com.br/'+ searchQuery.replace("-", " ") + "#D" + "[" + searchQuery.replace("%20", " ") + "]");

    // await page.type('input[name = "q"]', searchQuery);
    // await page.$eval('input[name=btnK]', button =>button.click());

    await page.waitForSelector('li.ui-search-layout__item');



      const result = await page.evaluate(() => {

          let data = [];
          let views = document.querySelectorAll('li.ui-search-layout__item');
          let counter = 0;


          for(let view of views){

              title = view.querySelector('div.ui-search-result__wrapper > div.andes-card > a');

              url = view.querySelector('div.ui-search-result__wrapper > div.andes-card > a');

              price = 'R$ ' +view.querySelector('div.ui-search-result__wrapper > div.andes-card > a > div.ui-search-result__content-wrapper > \
              div.ui-search-item__group > div.ui-search-price > div.ui-search-price__second-line > span.price-tag > span.price-tag-fraction');


              if(title == null ){title = "Not found";} else {title = title.title;}
              if(url == null ){url = "Not found";} else {url = url.href;}
              if(price == null ){price = "Not found";} else {price = price.innerText;}
  
              data.push({title, url, price})


              };

          

          
          return data;
          
        });
        
        console.log(result);
  


    await page.screenshot({path: 'example.png'});

    await browser.close();

    return result;
};

module.exports = searchMercado;

searchMercado('computador gamer');