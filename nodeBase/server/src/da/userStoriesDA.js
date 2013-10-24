var MDBDataAdapter = require("../db/MDBDataAdapter.js");

///setup collection
var userStoriesDA = new MDBDataAdapter('userStories');
userStoriesDA.getCollection(function (err, col) { if (col) col.ensureIndex({ "projectID": 1, "sprintID": 2 }, { name: "altKeyProjectSprint", unique: false }, function (e) { if (e) debugger; }); });

function userStoryDoc() {
    this._id = null; // PK
    this.projectID =
    this.sprintID =
    this.title =
    this.description =
    this.comments =
    this.references =
    
    this.owner =
    this.estimatedHours =
    this.percentComplete =
    this.blockers=
    this.historyLog =
    this.createdBy =
        null;
    this.index = 0.0;
}


module.exports = { Document: userStoryDoc, dataAdaptor: userStoriesDA };