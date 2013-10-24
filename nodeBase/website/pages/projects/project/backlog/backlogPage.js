
backlogPage = {
    $template: $('.template:first')
    ,$UserStoriesContainer: $('#divUserStories:first')
    , init: function (args) {
        if (masterPage.kickOutIfNotLoggedIn()) return;        

        args = args.split(',');        
        this.projectID = args[0];
        this.projectName = args[1];

        this.initSort();

        masterPage.$dynamicContentContainer.find('h1:first').html(this.projectName);


        api.call(1, 'resources/getAll', {}, function (response) {
            backlogPage._gotrecources(response);

            api.call(1, 'projects/project/userStories/getBacklog'
              , { projectID: backlogPage.projectID, pageIndex: 1, pageSize: 100 }
             , function (response) {
                 if (response.error) {
                     debugger;
                     masterPage.load('projects');
                 }
                 else
                     backlogPage.loadBacklog(response.result);
             }, function (err) {
                 debugger;
                 masterPage.load('projects');
             });

        });

    }
    ,initSort:function(){
        this.$UserStoriesContainer.sortable({
            update: function (event, ui) {                
                var $item = $(ui.item);
                
                var pDoc = $item.prev().data('doc');                
                var nDoc = $item.next().data('doc');                                
                var doc = $item.data('doc');

                doc.index = pDoc?pDoc.index:0;
                if (nDoc)
                    doc.index = ((nDoc.index == 0 ? -100 : nDoc.index) - doc.index) / 2;
                else
                    doc.index += 100.00;

                $item.data('doc', doc);
                $item.attr('index', doc.index);
                
                backlogPage.updateStory(doc);
            }
        });
    }
    , _gotrecources: function (response) {
        
        if (response.error) return;
        var $owners = $('.template .owner:first');
        $owners.empty().append('<option value="">(owner)</option>');
        
        for (var i = 0 ; i < response.result.length; i++) {
            var option = document.createElement('option');
            option.innerHTML = response.result[i].name;
            option.value = response.result[i]._id;
            $owners.append(option);
        }

    }


    , loadBacklog: function (userStories) {
        //debugger;
        masterPage.$dynamicContentContainer.find('h1:first').html(backlogPage.projectName);
        var elements = new Array();
        
        for (var i = 0 ; i < userStories.length ; i++) 
            elements.push(backlogPage.createStoryElement(userStories[i]));
        backlogPage.$UserStoriesContainer.empty();
        backlogPage.$UserStoriesContainer.append(elements);
    }
    , createStoryElement: function (doc) {
        var $container = backlogPage.$template.clone();
        $container.removeClass('template');        
        backlogPage.fillStoryElement(doc, $container);
        return $container;
    }
    , fillStoryElement: function (doc, $container) {
        if (!$container) return;
        $container.data('doc', doc);
        $container.find('*[databind]').each(function (i, e) {
            var $e = $(e);            
            var field = $e.attr('databind');
            $e.val(doc[field]);
            $e.change(backlogPage._createUpdateHandler(doc));            
        });

        return $container;
    }
    , _createUpdateHandler: function (doc) {
        return function (e) {            
            var $e = $(e.target);
            var field = $e.attr('databind');
            doc[field] = $e.val();
            backlogPage.updateStory(doc);
        };
    }
    
    , addClick: function () {

        backlogPage.$template.dialog({
            title: "New Story"
            , width: "800px"
            , modal: true
            , buttons: [{ text: "Create Story", click: this.addStory }]
        });
    }
    , addStory: function () {
        
        var $frm = $('#frmStory:first');
        if (!$frm.triggerValidationUI())
            return;

        backlogPage.$template.dialog('close');
        
        var doc = backlogPage.compileStoryDoc(backlogPage.$template);
        doc.projectID = backlogPage.projectID;
        
        doc.index = (backlogPage.$UserStoriesContainer[0].childNodes.length + 1) * 100.00;

        var $e = backlogPage.createStoryElement(doc);
        $e.hide();
        backlogPage.$UserStoriesContainer.append($e.fadeIn());

        
       
        api.call(1, 'projects/project/userStories/add' , doc
            , function (response) {
                if (response.error || !response.result || response.result.length < 1) {
                    debugger;
                    $e.remove();
                }
                else {                    
                    backlogPage.fillStoryElement(response.result[0]);
                }
            }, function (err) {
                debugger;
                $e.remove();
            });
            
    }
    , updateStory: function (doc) {
        api.call(1, 'projects/project/userStories/update', doc
            , function (response) {
                if (response.error || !response.result || response.result.length < 1) {
                    debugger;
                    $e.remove();
                }
                else                     
                    backlogPage.fillStoryElement(response.result[0]);                
            }, function (err) {
                debugger;
                $e.remove();
            });
    }
    , compileStoryDoc: function ($template) {
        var doc = new Object();
        
        backlogPage.$template.find('*[databind]').each(function (i, e) {
            
            var $e = $(e);
            var field = $e.attr('databind');
            if (field) doc[field] = $e.val();
        });
        return doc;
    }
    , deleteElement: function (e) {
        var $e = $(e).parents('.story:first');
        
        $e.slideUp('fast');
        var doc = $e.data('doc');
        api.call(1, 'projects/project/userStories/delete', {_id:doc._id,projectID:doc.projectID }
           , function (response) {
               if (response.error || !response.result || response.result.length < 1) {
                   debugger;
                   $e.slideDown();
               }
               else
                   $e.remove();
           }, function (err) {
               debugger;
               $e.slideDown();
           });
    }
    

}