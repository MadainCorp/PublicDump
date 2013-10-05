
function responseObject(id, result) {

    if (id)
        this.id = id;
    else
        this.id = null; 

    if (result)
        this.result = result; //object properties name:value
    else
        this.result = null
}

module.exports = responseObject;