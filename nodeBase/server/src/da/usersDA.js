var MDBDataAdapter = require("../db/MDBDataAdapter.js");

function UserDoc() {
    this._id = null; // userToken PK
    this.name = null;
    this.password = null;
    this.createdOn = null;
}


module.exports = { Document: UserDoc, dataAdaptor: new MDBDataAdapter('users') };