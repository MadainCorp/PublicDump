

projectPage = {
    init: function (args) {
        if (masterPage.kickOutIfNotLoggedIn()) return;
        this._id = args;        
        this.doc = null;        
        api.call(1, 'projects/project/get', {_id:this._id}
            , function (response) {                                
                if (response.error || response.result.length == 0)
                    masterPage.load('projects');
                else                    
                    projectPage.displayProject(projectPage.doc = response.result[0]);
            }, function (err) {
                debugger;
                masterPage.load('projects');
            });
    }
    , displayProject: function (projectDoc) {
        
        masterPage.$dynamicContentContainer.find('h1:first').html(projectDoc.name);
    }
    , loadBackLog: function () {        
        masterPage.load('backlog',[ projectPage._id, projectPage.doc.name]);
    }
}

