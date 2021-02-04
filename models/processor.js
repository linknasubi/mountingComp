const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, (err, db) => {

    if(err) throw err;

    var dbo = db.db('mydb');

    var obj = {name:'i5', preco:'1000'};

    dbo.collection('Processors').insertOne(obj, (err, res) => {


        if(err) throw err;



    });


    db.close();
});