var MDBDataAdapter = require("../db/MDBDataAdapter.js");

function SessionDoc() {
    this._id = null; // userToken PK
    this.createdOn = null;
}


module.exports = { Document : SessionDoc, dataAdaptor :new MDBDataAdapter ('sessions') };