var MDBDataAdapter = require("../db/MDBDataAdapter.js");

///setup collection
var resourcesDA = new MDBDataAdapter('resources');
resourcesDA.getCollection(function (err, col) { if (col) col.ensureIndex({ "email": 1 }, { name: "altKeyEmail", unique: true }, function (e) { if (e) debugger; }); });

function ResourceDoc() {
    this._id = null; // userToken PK
    this.email = null;
    this.name = null;
}


module.exports = { Document: ResourceDoc, dataAdaptor: resourcesDA };