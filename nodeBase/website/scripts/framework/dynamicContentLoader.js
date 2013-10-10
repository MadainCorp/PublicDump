
///requires jquery, jquery.ba-hashchange (to bind to hashchange)

function dynamicContentLoader(dynamicContentContainerID, configs) {
    this.$dynamicContentContainer = $('#' + dynamicContentContainerID + ':first');
    if (this.$dynamicContentContainer.length == 0 && console.log)
        console.log('dynamicContentLoader couldnt find the container ' + dynamicContentContainerID);
        

    this.configs = configs;

    this._head = null;
    this._xhrObj = null;

    ///keeps track of current header
    this.currentHash;

    ///when the hash tag changes load that content from configs
    var t = this;
    $(window).bind('hashchange', function () {
        var newHash = window.location.hash.substring(1);
        if (t.currentHash != newHash)
        t.loadContentObj(t.configs[newHash]);
    });
}

dynamicContentLoader.prototype = {
    clear: function () {
        this.$dynamicContentContainer.empty();
        $('[dynamicContent=true]').remove();
    }
    /*
    Description:
    injects contect from another page into a container 
    
    PARAMS:
    configObj{
        pageName: is a string that used to tag its resources to remove latter
        pageUrl: is the url where to find the page resource
        jsFiles: is an array of string urls where to find the needed js files
        cssFiles: is an array of string urls where to find the needed css files
        callback: is a function that is called when everything is loaded
    }
    */
    , loadContentObj: function (configObj, segments) {
        if (!configObj) return;
        if (typeof (configObj) == "string")
            configObj = this.configs[configObj];
        this.loadContent(configObj.pageName, configObj.pageUrl, configObj.jsFiles, configObj.cssFiles,segments, configObj.callback);
    }
    /*
    Description:
    injects contect from another page into a container 
    
    PARAMS:
    pageName: is a string that used to tag its resources to remove latter
    pageUrl: is the url where to find the page resource
    jsFiles: is an array of string urls where to find the needed js files
    cssFiles: is an array of string urls where to find the needed css files
    callback: is a function that is called when everything is loaded
    */
    , loadContent: function (pageName, pageUrl, jsFiles, cssFiles, segments, callback) {
        //distroy old content resources
        this.clear();

        if (pageName && !pageUrl && this.configs && this.configs[pageName]) {// load from congig
            this.loadContentObj(this.configs[pageName]);
            return;
        }

        ///fix mistake
        if (segments && !callback && typeof (segments) == 'function') {
            callback = segments;
            segments = null;
        }
        else if (segments) {            
            if (typeof (segments) == 'array')
                segments = segments.join("/");
            else
                segments = '' + segments; /// make sure its a string
            if (segments[0] == '/' || segments[0] == '\\') segments.substring(1);
            pageName = pageName + '/' + segments;
        }
        

        /// change url with hash so the the browser can keep history
        
        this.currentHash = window.location.hash = pageName;
        //load new
        /// loads html file "/home/[widgetName]/SubPage.html"
        var t = this;
        this.$dynamicContentContainer.hide().load(pageUrl //+ " #guts"
            , function () {                
                t._loadCSSFiles(cssFiles);
                t._loadJSFiles(jsFiles);
                t.$dynamicContentContainer.fadeIn();
                if (typeof (callback) == 'function') callback();                
            }
        );

        
    }
    /// Get document head element
    , getHead: function () {
        if (this._head == null)
            this._head = document.getElementsByTagName("head")[0];
        return this._head;
    }
   /// loop and load all js Files
    , _loadJSFiles: function (jsFiles) {
        if (jsFiles == undefined || jsFiles == null || jsFiles.length == 0) return;
        if (typeof (jsFiles) == "string") jsFiles = [jsFiles];

        for (var i = 0; i < jsFiles.length ; i++) 
            this._loadFileSync(jsFiles[i], 'js');
    }
    /// loop and load all css Files
    , _loadCSSFiles: function (cssFiles) {
        if (cssFiles == undefined || cssFiles == null || cssFiles.length == 0) return;
        
        if (typeof (cssFiles) == "string") cssFiles = [cssFiles];

        for (var i = 0; i < cssFiles.length ; i++) 
            this._loadFileASync(cssFiles[i], 'css');
        
    }
    /// load file async -- not used
    , _loadFileASync: function (url, type) {
        
        // add the returned content to a newly created script tag
        switch (type) {
            case 'js':
                var fileref = document.createElement('script');
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", url);
                fileref.setAttribute("dynamicContent", true);
                this.getHead().appendChild(fileref);
                break;
            case 'css':
                var fileref = document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", url);
                fileref.setAttribute("dynamicContent", true);
                this.getHead().appendChild(fileref);
                break;
        }
    }
    /// load file synchronously 
    , _loadFileSync: function (url, type,tag) {
        // get some kind of XMLHttpRequest
        if (this._xhrObj == null) this._xhrObj = this._getXHR();

        // open and send a synchronous request
        this._xhrObj.open('GET', url, false);
        this._xhrObj.send('');
        // add the returned content to a newly created script tag
        var e;
        switch (type) {
            case 'js':
                e = document.createElement('script');
                e.type = "text/javascript";
                break;
            case 'css':
                e = document.createElement('link');
                e.type = "text/css";
                e.rel = "stylesheet";
                e.href = url;
                break;
        }

        if (e) {
            e.setAttribute('dynamicContent', true);
            e.text = this._xhrObj.responseText;
            this.getHead().appendChild(e);

        }

    }
    /// get XMLHttpRequest object for sync load
     , _getXHR: function () {
         var xmlhttp;
         if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
             xmlhttp = new XMLHttpRequest();
         }
         else {// code for IE6, IE5
             xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
         }
         return xmlhttp;
     }
}

