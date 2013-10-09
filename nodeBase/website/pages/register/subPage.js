

registerPage = {
    init:function(){        
        
    }
    , register: function () {
        var $frm = $('#frmRegister:first');
        if (!$frm[0].checkValidity()) return;
        

        var $confirm = $frm.find('#confirm:first');
        
        if ($frm.find('#password:first').val() != $confirm.val()) {
            $confirm[0].setCustomValidity('The two passwords must match.');
            return;
        } else 
            $confirm[0].setCustomValidity('');
        

        var doc = new Object();
        $frm.find('*[collect="true"]').each(function (i, e) {
            doc[e.id] = $(e).val();
        });

        var t = this;
        api.call(1, 'users/register', doc
            , function (response) {
                
                if (response.error) {
                    /*
                    if (response.error.code == 1300)
                        $frm.find('#email:first')[0].setCustomValidity('email already in use.');
                    else
                    */
                        alert(response.error.message);
                }
                else
                    authManager.login(doc.email, doc.password, t._logInResponseHanlder);
            }, function (err) {
                debugger;
            });
        
    }
    , _logInResponseHanlder: function (result) {        
        if (result.error) {
            debugger;
            alert(result.error.message);
        }
        else
            subPageConfigs.load('home');
    }
   
    
}
var subPageConfigs;