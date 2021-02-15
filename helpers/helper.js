
 /**
  * @param obj Object to be separated.
  * @param f_index First index to slice.
  * @param l_index Last index to be sliced to.
  */

const separObjects = (obj, f_index, l_index) =>{

    const new_obj = {}

    Object.keys(obj).slice(f_index, l_index).forEach( (value, key) => { //Creating a new object with some elements from the previous object that is refered to
        new_obj[value] = obj[value];
      });

    
    return new_obj


}


module.exports = {separObjects}