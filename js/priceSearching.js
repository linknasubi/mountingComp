/*
*
*   Fazer a leitura, em seguida lidar com os dados e prepará-los para a busca no mercado livre, inicialmente
*
*
*   Através da leitura de json já existente adaptar o código para tabelar os preços e talvez outras informações necessárias
*
*
*   Adicionar todos valores ao banco de dados e lidar com as informações de forma adequada
*
*/


xlsx = require('node-xlsx').default;


class Excel{

    /**
     * 
     * @param {String} data Path to be readed.
     *  
     */

    constructor(data){

        this._data = xlsx.parse(data);

    }

    separateComma(table){
        commaData = this.data;

        for( let row of commaData[table]['data'] ){

            commaData[table]['data'] = row.split(',');

        }

        return commaData;
    }

    /**
     * Returns the value parsed by xlsx and changes parsedData property.
     */

    readingFile(){

        this.parsedData = xlsx.parse(this.data);

        return xlsx.parse(this.data);
    }


    /** 
     * @param {number} table Table starts at 0. 
     * @param {number} row Row starts at 1.
     * @param {number} column Column starts at 0.
     * 
     * @returns {array} Returns the value specified by its indexes.
    */

    queryResult(table, row, column){
        
        let parsedData = readingFile();
        let parsedData = parsedData[table]['data'][row].split(',');

        return parsedData[table]['data'][row][column];
    }

    /**
     * @param {array} arr Values to be searched inside the parsed data.
     * @param {number} table Table starts at 0.
     * 
     * @returns {object} Returns indexes associated with its key values in the parsed data.
     * 
     */


    fetchValues(table, arr){ 


        var parsedData = this.readingFile();
        var obj = {};

        for(let i of arr){

            let val = parsedData[table]['data'][0].indexOf(i);
            console.log(i)
            console.log(parsedData[table]['data'][0])

            if(val != -1){
                obj[i] = val;
            }

            else{ return NaN; }
        
        }

        return obj

    }



}


class Processors extends Excel{

    constructor(data){
        super(data);
        this.table_1 = this.readingFile()[0]['data'];
    }


    /**
     * @param {array} search_arr Columns to be searched in the parsed data.
     * @returns {array} Strings to be queried.
     */

    computeString(search_arr){

        var string = '';
        var str_arr = [];

        var columns = this.fetchValues(0, search_arr);

        console.log(columns)
        
        for(let i = 1; i < this.table_1.length; i++){
            for( let j of Object.values(columns) ){

                string += this.table_1[i][j]
    
            }
            
            str_arr.push( string );
            string = '';
        }

        return str_arr;

    }





}


const proc = new Processors('../assets/css/example.xlsx');

console.log(proc.computeString(['Brand', 'Model']))

