
function mainMenu() {

    this.mainMenuConfig = {
        ImageWidget: { pageName: 'Image Widget', pageUrl: 'pages/ImageWidget/SubPage.html', jsFiles: ['pages/ImageWidget/SubPage.js?v1'], cssFiles: ['pages/ImageWidget/SubPage.css?v1'], callback: function () { alert('Image widget loaded'); } }
        , TextWidget: { pageName: 'Text Widget', pageUrl: 'pages/TextWidget/SubPage.html', jsFiles: ['pages/TextWidget/SubPage.js?v1'], cssFiles: ['pages/TextWidget/SubPage.css?v1'] }
        , YouTubeWidget: { pageName: 'YouTube Widget', pageUrl: 'pages/YouTubeWidget/SubPage.html', jsFiles: ['pages/YouTubeWidget/SubPage.js?v1'], cssFiles: ['pages/YouTubeWidget/SubPage.css?v1'] }
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