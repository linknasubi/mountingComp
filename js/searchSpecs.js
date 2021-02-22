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
        this.parsedData = []

    }


    /**
     * @param {number} table Table index.
     * @returns {object} Returns the value parsed by xlsx.
     */

    readingFile(table){

        this.parsedData = this.separateComma(table); 

        return this.parsedData;
    }

    /**
     * 
     * @param {number} table Table index.
     * 
     * @returns {object} Returns the data object separated by its commas.
     * 
     */

    separateComma(table){

        var commaData = [...this._data][table];
        
        for( let row = 0; row < commaData['data'].length; row++ ){
            
            commaData['data'][row] = commaData['data'][row][0].split(',');

        }

        return commaData;
    }




    /** 
     * @param {number} table Table starts at 0. 
     * @param {number} row Row starts at 1.
     * @param {number} column Column starts at 0.
     * 
     * @returns {array} Returns the value specified by its indexes.
    */

    queryResult(table, row, column){
        
        let parsedData = [...this.parsedData];

        return parsedData[table]['data'][row][column];
    }

    /**
     * @param {array} arr Values to be searched inside the parsed data.
     * @param {number} table Table starts at 0.
     * 
     * @returns {object} Returns indexes associated with its key values in the parsed data.
     * 
     */


    fetchValues(arr){ 

        var parsedData = {...this.parsedData}['data'];
        var obj = {};

        for(let i of arr){
            
            let val = parsedData[0].indexOf(i);


            if(val != -1){
                obj[i] = val;
            }

            else{ return NaN; }
        
        }

        return obj

    }

    /**
     * @param {array} search_arr Columns to be searched in the parsed data.
     * @returns {array} Strings to be queried.
    */

    computeString(search_arr){

        var string = '';
        var str_arr = [];

        var columns = this.fetchValues(search_arr);

        for(let i = 1; i < this.parsedData['data'].length; i++){
            for( let j of Object.values(columns) ){

                string += this.parsedData['data'][i][j] + ' '
    
            }
            
            str_arr.push( string );
            string = '';
        }

        return str_arr;

    }



}


class Processors extends Excel{

    /**
     * 
     * @param {string} data Path to be readed. 
     * @param {number} table Table index.
     */

    constructor(data, table){
        super(data);
        this.table = this.readingFile(table)['data'];
    }

    /**
     * 
     * @param {array} search_arr String array to query values in the parsed data column.
     * 
     * @returns {array} Array with all values to be queried.
     */

    queryValues(search_arr){

        return this.computeString(search_arr);

    }


}


class Graphics extends Excel{

    /**
     * 
     * @param {string} data Path to be readed. 
     * @param {number} table Table index.
     */

    constructor(data, table){
        super(data);
        this.table = this.readingFile(table)['data'];
    }

    /**
     * 
     * @param {array} search_arr String array to query values in the parsed data column.
     * 
     * @returns {array} Array with all values to be queried.
     */

    queryValues(search_arr){

        return this.computeString(search_arr);

    }


}



const proc = new Processors('../assets/xlsx/cpu.xlsx', 0).queryValues(['Brand', 'Model']);
// const grap = new Graphics('../assets/xlsx/gpu.xlsx', 0).queryValues(['Brand', 'Model']);


module.exports = {
    proc
};

