const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://127.0.0.1:27017";


const Insertion = (json) => {MongoClient.connect(url, (err, db) => {
 
        if(err) throw err;

        var dbo = db.db('mydb');
        


        dbo.collection('Processors').insertOne(json, (err, res) => {
         if(err) throw err;

         console.log('Successful');
    

     });


    // dbo.collection("Processors").findOne({}, function(err, result) {
    //     if (err) throw err;
    //     console.log(result['name']);
    //     db.close();
    //   });

         db.close();
     })
    }





module.exports = Insertion;

