myApp.controller('successCtrl',function($scope,userService){
    init();
    function init(){//load the loged in user`s data
        $scope.user=userService.pullUser();
    }

    $scope.showExpand=false;//show/hide expand info field
    $scope.expFrofile=function(){
        $scope.showExpand=!$scope.showExpand;
    }

    $scope.saveExpand=function(){//save expand info
        $scope.user.bio=$scope.temp.bio;
        $scope.user.interests=$scope.temp.interests;
    }
});
