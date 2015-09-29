var myApp=angular.module('myApp',['ngRoute','ui.bootstrap']);

myApp.directive('ngEnter', function () {//this directive used in inputs to enable "enter key submition"
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

myApp.config(['$routeProvider',//config the routes
    function($routeProvider) {
        $routeProvider.
        when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'signUpCtrl'
        }).
        when('/success', {
            templateUrl: 'views/success.html',
            controller: 'successCtrl'
        }).
        otherwise({
            redirectTo: '/signup'
        });
    }
]);