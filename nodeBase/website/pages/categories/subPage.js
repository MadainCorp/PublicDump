

categoriesPage = {
    init: function () {
        console.log('Go get categories from server');
        //api.call(....
        console.log('fake it');
        this._gotCategories([
            { id:1,name: "category 1" }
            , { id:2,name: "category 2" }
            , { id:3,name: "category 3" }
            , { id:4,name: "category 4" }
            , { id:5,name: "category 5" }
            , { id:6,name: "category 6" }
        ]);
    }
    , _gotCategories: function (categories) {

        var $ulCategories = $('#ulCategories:first');
        
        for (var cname in categories) {
            var c = categories[cname];
            var li = document.createElement('li');            
            li.innerHTML = c.name;
            li.onclick = function () { masterPage.load('subCategories', c.id) };
            $ulCategories.append(li);
        }
    }
}

