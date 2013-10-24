var MDBDataAdapter = require("../db/MDBDataAdapter.js");

///setup collection
var projectsDA = new MDBDataAdapter('projects');
projectsDA.getCollection(function (err, col) { if (col) col.ensureIndex({ "name": 1 }, { name: "altKeyName", unique: true }, function (e) { if (e) debugger; }); });

function projectDoc() {
    this._id = null; // userToken PK
    this.name = null;
}


module.exports = { Document: projectDoc, dataAdaptor: projectsDA };