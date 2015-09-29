myApp.service('userService',function(){
    var user={};
    this.pushUser=function(userData){//save loged in user`s data
        user=userData;
    }
    this.pullUser=function(){//load loged in user`s data
        return user;
    }
});
