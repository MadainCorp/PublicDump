

projectsPage = {
    init: function () {
        if (masterPage.kickOutIfNotLoggedIn()) return;

        this.$ulProjects = $('#ulProjects:first');
        if (this.$ulProjects.length == 0) debugger;
        
        this.$frm = $('#frmProject:first');
        if (this.$frm.length == 0) debugger;

        console.log('Go get projects from server');
        api.call(1, 'projects/getAll', {}, this._gotprojects);

    }
    , _gotprojects: function (response) {

        if (response.error) return;
        projectsPage.$ulProjects = $('#ulProjects:first');
        projectsPage.$ulProjects.empty();
        for (var cname in response.result)
            projectsPage._addProjecttoList(response.result[cname]);

    }
    , _addProjecttoList: function (project) {
        var li = document.createElement('li');
        projectsPage._updateListItem(project, li);
        projectsPage.$ulProjects.append(li);
        return li;
    }
    , _updateListItem: function (project, li) {
        li.innerHTML = project.name;
        li.onclick = function () {  masterPage.load('project', project._id) };
        return li;
    }
    , addButton_Click: function () {
        projectsPage.clearForm();
        projectsPage.openDialog();
        
    }
    , openDialog: function () {
        projectsPage.$frm.dialog({
            title: "New Project"
            , modal: true
            , resizable: false
            , width: "350px"
            , buttons: [{ text: "Add", click: projectsPage.addProject }
            , { text: "Cancel", click: function () { $(this).dialog("close"); } }]
        });
    }
    , clearForm: function () {
        projectsPage.$frm.find('*[collect="true"]').each(function (i, e) {
            $(e).val('');
        });
    }
    , addProject: function () {

        if (!projectsPage.$frm.triggerValidationUI()) return;

        var doc = new Object();
        projectsPage.$frm.find('*[collect="true"]').each(function (i, e) {
            doc[e.id] = $(e).val();
        });

        var li = projectsPage._addProjecttoList(doc);
        projectsPage.$frm.dialog('close');

        var t = this;
        api.call(1, 'projects/add', doc
            , function (response) {                
                if (response.error) {
                    alert(response.error.message);                    
                    $(li).remove();
                    projectsPage.openDialog();
                }
                else {
                    projectsPage._updateListItem(doc, li);                    
                }
            }, function (err) {
                $(li).remove();
                projectsPage.openDialog();
                debugger;
            });
        
    }
}

