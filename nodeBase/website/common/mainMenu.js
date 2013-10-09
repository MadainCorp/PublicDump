
function mainMenu() {

    this.dynamicLoader = null;
}

mainMenu.prototype = {
    init: function (menuConfigs) {
        this.dynamicLoader = new dynamicContentLoader('dynamicContentContainer', menuConfigs);

        var $ul = $(document.createElement('ul'));
        $('#pageMenu').append($ul);
        
        for (var config in menuConfigs) {
            if (menuConfigs[config].mainMenuLabel) {
                var li = document.createElement('li');
                li.innerHTML = menuConfigs[config].mainMenuLabel;
                li.onclick = this._createOnClickFunction(this.dynamicLoader, config);
                $ul.append(li);
            }
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
