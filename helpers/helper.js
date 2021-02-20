const fs = require('fs');


 /**
  * @param obj Object to be separated.
  * @param f_index First index to slice.
  * @param l_index Last index to be sliced to.
  * 
  * @returns {object} Returns the object sliced by its index.
  */

const separObjects = (obj, f_index, l_index) =>{

    const new_obj = {}

    Object.keys(obj).slice(f_index, l_index).forEach( (value, key) => { //Creating a new object with some elements from the previous object that is refered to
        new_obj[value] = obj[value];
      });

    
    return new_obj

}

/**
 * 
 * @param {string} json_path Path to json file.
 * 
 * @returns {object} Json file in object format.
 */

const jsonReader = async (json_path) =>{

  let json = await JSON.parse( fs.readFileSync(json_path, 'utf8') );

  return json;

}


module.exports = {
  separObjects,
  jsonReader
}