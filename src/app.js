angular.module('novel', ['ui.router', 'underscore', 'weui', 'novel.frame', 'novel.book', 'novel.bookstore', 'novel.search', 'novel.profile']);

// 加载weui
angular.module('weui', []).factory('weui', ['$window', function ($window){
    return $window.weui;
}]);

// 加载underscore
angular.module('underscore', []).factory('_', ['$window', function ($window){
    return $window._; // assumes underscore has already been loaded on the page
}]);

// 启动
angular.module('novel').run(['$rootScope', '$state', '$stateParams', 'sessionService',
    function ($rootScope, $state, $stateParams, sessionService){
        console.log('novel run');
        sessionService.querySessionUser();

        $rootScope.$state       = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams){
            // to be used for back button //won't work when page is reloaded.
            $rootScope.previousState_name   = fromState.name;
            $rootScope.previousState_params = fromParams;
        });
        // 制作返回按钮
        //back button function called from back button's ng-click="back()"
        $rootScope.back = function (){//实现返回的函数
            if(this.previousState_name){
                $state.go($rootScope.previousState_name, $rootScope.previousState_params);
            }else{
                $state.go('tabs.book');
            }
        };
    }
]);