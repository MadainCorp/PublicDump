
function mainMenu() {

    this.mainMenuConfig = {
        ImageWidget: { pageName: 'Home', pageUrl: 'pages/home/SubPage.html', jsFiles: ['pages/home/SubPage.js?v1'], cssFiles: [], callback: function () {  } }        
    }
    
    this.dynamicLoader = new dynamicContentLoader('dynamicContentContainer', this.mainMenuConfig);
}

mainMenu.prototype = {
    init: function () {        
        var $ul = $(document.createElement('ul'));
        $('#pageMenu').append($ul);

        for (var config in this.mainMenuConfig) {
            var li = document.createElement('li');
            li.innerHTML = this.mainMenuConfig[config].pageName;
            li.onclick = this._createOnClickFunction(this.dynamicLoader,config);
            $ul.append(li);
        }
    }
    , _createOnClickFunction: function (dynamicLoader,config) {
        return function () { dynamicLoader.loadContent(config); };
    }
    , load: function (item) {
        this.dynamicLoader.loadContent(item);
    }
}

var MainMenu = new mainMenu();
$(document).ready(function () { MainMenu.init(); });