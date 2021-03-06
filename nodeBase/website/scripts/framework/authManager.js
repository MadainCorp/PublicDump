﻿/*
    Keeps state of logged in user and caches login token in a cookie for 3 hours

    to-do:: add timer interval to keep cookie exp moving to expire 3 hours after last call


*/
function AuthManager() {
    this._currentUser = null;
    this._tmrCheckSession = null;
    Cookies.defaults = {
        path: '/',
        secure: false
    };
}

AuthManager.prototype = {
    getCurrentUser: function () {
        
        if (this._currentUser == null)             
            this._currentUser = this.getUserTokenFromCookie();        
        return this._currentUser;
    }
    , getUserTokenFromCookie: function () {
        
        var user = Cookies.get('user');
        
        if (user) {
            user = JSON.parse(Cookies.get('user'));
            this.startSessionTimeout();
        }
        return user;
    }
    , setCurrentUser: function (user) {
        this._currentUser = user;
        if (user == null) {
            this.stopSessionTimeout();
            null;
        }
        ///update cookie
        var expDate = new Date();
        expDate.setHours(expDate.getHours() + 3);

        if (this._cookieManager == null) {
            this._cookieManager = new Cookies();
            //this._cookieManager.secure(true);
        }
        
        Cookies.set('user', JSON.stringify(user), { expires: '1/1/2014'}); 
       
       if (this._tmrCheckSession)
            this.stopSessionTimeout();
        
        if (user) {            
            //authManager.isSessionAlive();
            this.startSessionTimeout();
        }

    }
    , startSessionTimeout: function () {
        if (authManager._tmrCheckSession == null)
            authManager._tmrCheckSession = setInterval(authManager.isSessionAlive, 10000);
    }
    , stopSessionTimeout: function () {
        if (authManager._tmrCheckSession != null) clearInterval(authManager._tmrCheckSession);
    }
    , isSessionAlive: function () {        
        if (authManager._currentUser == null)
            authManager.logout();
        else
            api.call(null, 'users/isSessionAlive', { userToken: authManager._currentUser.userToken }, function (response) { if (response.error || !response.result.LoggedIn) { authManager.logout(); } }, authManager.logout);
    }
    , keepSessionAlive: function () {
        api.call(null, 'users/keepSessionAlive', { userToken: authManager._currentUser.userToken }, function (response) { if (response.error || !response.result) authManager.logout(); });
    }
     , isUserLoggedIn: function () {
         return (this.getCurrentUser() != null);
     }
    , login: function (email, password, callback) {
        var t = this;
        api.call(1, 'users/login', { email: email, password: password }, function (result) { t._loggedIn(result); callback(result); }, function (e) { callback({ error: { code: -1, message: "faild to communicate with the server" } }) });
    }
    , _loggedIn: function (response) {        
        if (response.error)
            this.setCurrentUser(null);
        else {
            this.setCurrentUser(response.result);
            this.loginHandler(this._currentUser);
        }
    }
     , loginHandler: function (user) {
     }
    , logout: function () {        
        if (this._currentUser != null) {            
            api.call(1, 'users/logout', { token: authManager._currentUser.userToken });
            authManager.setCurrentUser(null);
        }
        authManager.stopSessionTimeout();
        authManager.logoutHandler();
    }
    , logoutHandler: function () {
    }

    , resetPassword: function (UserTokenname, callback) {
    }
}

authManager = new AuthManager();


if (console.log) console.log("authManager loaded");