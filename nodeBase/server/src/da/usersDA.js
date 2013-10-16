var MDBDataAdapter = require("../db/MDBDataAdapter.js");

///setup collection
var userDA = new MDBDataAdapter('users');
//userDA.getCollection(function (err, col) { if (col) col.ensureIndex({ "email": 1 }, { name: "altKey_Email", unique: true }, function (e) { if (e) debugger; }); });

function UserDoc() {
    this._id = null; // userToken PK
    this.name = null;
    this.password = null;
    this.createdOn = null;
}


module.exports = { Document: UserDoc, dataAdaptor: userDA};