const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const port = 3000;


const searchMercado = require('./searchMercado');

app.get('/search-market', (req, res) => {
    
    const searchQuery = req.query.searchquery;

    if(searchQuery != null){

        searchMercado(searchQuery)
        .then(results => {
            res.status(200);
            res.json(results);
            console.log(results);
        });

    }

    else{
        res.end();
    }

});

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));