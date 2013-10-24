

recourcesPage = {
    init: function () {
        if (masterPage.kickOutIfNotLoggedIn()) return;

        this.$ulResources = $('#ulResources:first');
        if (this.$ulResources.length == 0) debugger;

        this.$frm = $('#frmResource:first');
        if (this.$frm.length == 0) debugger;

        console.log('Go get resources from server');
        api.call(1, 'resources/getAll', {}, this._gotrecources);

    }
    , _gotrecources: function (response) {

        if (response.error) return;
        recourcesPage.$ulResources = $('#ulResources:first');
        recourcesPage.$ulResources.empty();
        for (var cname in response.result)
            recourcesPage._addResourcetoList(response.result[cname]);

    }
    , _addResourcetoList: function (resource) {
        var li = document.createElement('li');
        recourcesPage._updateListItem(resource,li);
        recourcesPage.$ulResources.append(li);
        return li;
    }
    , _updateListItem: function (resource,li) {
        li.innerHTML = resource.name;
        li.onclick = function () { debugger; masterPage.load('reource', resource._id) };
        return li;
    }
    , addButton_Click: function () {
        recourcesPage.clearForm();
        recourcesPage.openDialog();

    }
    , openDialog: function () {
        recourcesPage.$frm.dialog({
            title: "New Resource"
            , modal: true
            , resizable: false
            , width: "350px"
            , buttons: [{ text: "Add", click: projectsPage.addProject }
            , { text: "Cancel", click: function () { $(this).dialog("close"); } }]
        });
    }
    , clearForm: function () {
        recourcesPage.$frm.find('*[collect="true"]').each(function (i, e) {
            $(e).val('');
        });
    }
    , addResource: function () {

        if (!recourcesPage.$frm.triggerValidationUI()) return;

        var doc = new Object();
        recourcesPage.$frm.find('*[collect="true"]').each(function (i, e) {
            doc[e.id] = $(e).val();
        });

        var li = recourcesPage._addResourcetoList(doc);
        var t = this;
        api.call(1, 'resources/add', doc
            , function (response) {
                if (response.error) {
                    alert(response.error.message);
                    $(li).remove();
                    recourcesPage.openDialog();
                }
                else {
                    recourcesPage._updateListItem(doc, li);
                }
            }, function (err) {
                $(li).remove();
                recourcesPage.openDialog();
                debugger;
            });


    }
}

