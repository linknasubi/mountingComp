/*

Fazer a leitura, em seguida lidar com os dados e prepará-los para a busca no mercado livre, inicialmente


Através da leitura de json já existente adaptar o código para tabelar os preços e talvez outras informações necessárias


Adicionar todos valores ao banco de dados e lidar com as informações de forma adequada

*/


xlsx = require('node-xlsx').default;


class Excel{

    constructor(data){
        this.data = data;
    }

    readingFile(){
        return xlsx.parse(this.data)[0];
    }

}


class Processors extends Excel{

    constructor(data){
        super(data);
        this.file = this.readingFile();
    }
}


const proc = new Processors('../assets/css/example.xlsx');


console.log(proc['file']);

