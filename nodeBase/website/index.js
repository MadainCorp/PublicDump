/**************************************************************************************/
var profileControl = {
    setUser: function (user) {
        var $profileControlContainer = $('#profileControlContainer:first');
        var $profileControlContainerLoggedIn = $profileControlContainer.find('#profileControlContainerLoggedIn:first')
        var $profileControlContainerLoggedOut = $profileControlContainer.find('#profileControlContainerLoggedOut:first')
        
        if (user) {
            $profileControlContainerLoggedOut.hide();
            $profileControlContainerLoggedIn.fadeIn(); 
            $profileControlContainerLoggedIn.find('fast', '#profileControlContainerLoggedInUserName:first').val(user.userName);
        }
        else {
            $profileControlContainerLoggedIn.hide();
            $profileControlContainerLoggedOut.fadeIn();
        }

    }
        , clear: function () {
            this.setUser(null);
        }
}

/**************************************************************************************/


/**************************************************************************************/
function SubPageConfigs() {

    this.dynamicLoader = new dynamicContentLoader('dynamicContentContainer');
    this.register = { pageUrl: '/pages/register/subPage.html', jsFiles: ['pages/register/subPage.js?v1'], cssFiles: [], callback: function () { registerPage.init() } };
    this.login = {  pageUrl: '/pages/login/subPage.html', jsFiles: ['pages/login/subPage.js?v1'], cssFiles: [], callback: null };
    this.home = { mainMenuLabel: 'Home', pageUrl: '/pages/home/subPage.html', jsFiles: ['pages/home/subPage.js?v1'], cssFiles: [], callback: null };
    this.categories = { mainMenuLabel: 'Categories', pageUrl: '/pages/categories/subPage.html', jsFiles: ['pages/categories/subPage.js?v1'], cssFiles: ['/pages/categories/subPage.css'], callback: null };
    this.subCategories = { mainMenuLabel: 'Sub Categories', pageUrl: '/pages/subCategories/subPage.html', jsFiles: ['pages/subCategories/subPage.js?v1'], cssFiles: [], callback: null };
}

SubPageConfigs.prototype = {
    load: function (configName) {        
        for (var config in this)
            if (this[config].pageUrl)
                this[config].pageName = config;
        this.dynamicLoader.loadContentObj(this[configName]);
    }
}


/**************************************************************************************/

masterPage = {
    init: function () {

        authManager.logoutHandler = masterPage._logOutHandler;
        authManager.loginHandler = masterPage._loginHandler;
        
        if (authManager.isUserLoggedIn())
            authManager.loginHandler(authManager.getCurrentUser());
        else
            masterPage._logOutHandler();
    }
    , load: function (configName) {
        subPageConfigs.load(configName);
    }
    , _logOutHandler: function () {
        masterPage.load('login'); profileControl.clear();
    }
    , _loginHandler: function (user) {
        var hash = window.location.hash.substring(1);        
        if (hash && subPageConfigs[hash])
            masterPage.load(hash);
        else
            masterPage.load('home');
        profileControl.setUser(user)
    }

}
$(document).ready(function () {
    if (console.log) console.log("document ready");
    subPageConfigs = new SubPageConfigs();
    masterPage.init()
    if (MainMenu)
        MainMenu.init(subPageConfigs);
    else
        debugger;
});
if (console.log) console.log("index.js loaded");