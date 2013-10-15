

homePage = {
    init:function(){
        masterPage.kickOutIfNotLoggedIn();
    }
    ,projectsClick: function () {
        masterPage.load('projects');
    }
    , resourcesClick: function () {
        masterPage.load('resources');
    }
}

