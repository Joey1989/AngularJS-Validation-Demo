myApp.controller('signUpCtrl',function($scope,$http,$location,userService){
    init();
    function init(){//initialize the field
        $scope.user={};
        $scope.user.uName='';
        $scope.user.psd='';
        $scope.user.fName='';
        $scope.user.lName='';
        $scope.user.birthday='';
    }

    (function getData(){//get user data from psw.json
        $http.get("psw.json").success(function(res){
            $scope.jsonData=res.Data;
        })
    })();

    function checkAge(age){//check whether the age is >14
        //console.log("age is:"+age);
        if(typeof age!="string" || age.length!=10) return false;
        var ageArr=age.split("/");
        var date=new Date();
        var curDate=date.getDate();
        var curMonth=date.getMonth();
        curMonth++;
        var curYear=date.getYear();
        curYear+=1900;   
        var over14=false;
        var below150=false;        
        if(curYear-Number(ageArr[2])<14) return false; //check year
        else if(curYear-ageArr[2]>14) over14=true;
        else{
            if(curMonth>Number(ageArr[0])) over14=true;//check month
            else if(curMonth<Number(ageArr[0])) return false;
            else{
                if(curDate>=Number(ageArr[1])) over14=true;//check date
                else if(curMonth<Number(ageArr[1])) return false;
            }
        }

        if(curYear-Number(ageArr[2])>150) return false;//check year
        else if(curYear-ageArr[2]<150) below150=true;
        else{
            if(curMonth<Number(ageArr[0])) below150=true;//check month
            else if(curMonth>Number(ageArr[0])) return false;
            else{
                if(curDate<=Number(ageArr[1])) below150=true;//check date
                else if(curMonth>Number(ageArr[1])) return false;
            }
        }
        return over14 && below150;
    }   

    $scope.ageFail=true;
    $scope.$watch('user.birthday',function() {//watch the birthday input field
        if(!checkAge($scope.user.birthday)) {
            $scope.ageFail=true;
            //console.log($scope.ageFail);
        }
        else $scope.ageFail=false;
    });
     
    function checkPsd(user){//check whether input password matches user`s data
        for(i in $scope.jsonData){
            if($scope.jsonData[i].userName==user.uName &&
               $scope.jsonData[i].passWord==user.psd)
                return true;
        }
        return false;
    }

    function successSubmit(){//submit
            userService.pushUser($scope.user);
            $location.path("success");
    }

    function checkSubmit(){//check the validation of every field
        if ($scope.frm.email.$valid && 
            $scope.frm.password.$valid && 
            $scope.frm.fName.$valid && 
            $scope.frm.lName.$valid && 
            $scope.frm.birthday.$valid &&
            !$scope.ageFail)
            {
                if(checkPsd($scope.user)) return true;
                else{
                    alert("Fail to authenticate.");
                    return false;
               }
            }
    }
    
    function dateToISO(){
        var dateISO=$scope.user.birthday.split("/");
        $scope.user.birthday=dateISO[2]+"-"+dateISO[0]+"-"+dateISO[1];
    }

    $scope.frmSubmit=function(){//submit the form by button or 'enter key'
        if(checkSubmit()){
            dateToISO();
            successSubmit();
        }
    }
    
    $scope.clearInput=function(){//clear the field and warnings
        var confirmClear=confirm("Are you sure to clear all fields?");
        if(confirmClear){
            init();
            $scope.frm.$setPristine();
        }
    }
});