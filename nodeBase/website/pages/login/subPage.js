

loginPage = {
    login: function () {        
        authManager.login($('#txtUserName').val(), $('#txtPassword').val(), this._logInResponseHanlder);
    }
    , _logInResponseHanlder: function (result) {        
        if (result.error) {
            debugger;
            alert(result.error.message);
        }
        else
            subPageConfigs.load('home');
    }
   
    ,resetPassword: function (username,callback) {
    }
}
