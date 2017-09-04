(function (){
    appModule('novel.frame').controller('tabsCtrl', tabsCtrl);

    tabsCtrl.$inject = ['$scope', '$state', 'weui'];

    function tabsCtrl($scope, $state, weui){
        var vm = this;
        // console.log('tabsCtrl');
        // console.log($state.current);
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams){
            // vm.tab = toState.url.match(/^\/([^/]+)/)[1];
            var matches = toState.url.match(/^\/([^/]+)/);
            vm.tab      = matches ? matches[1] : '';
        });

        vm.tabs = function (tab){
            vm.tab = tab;
        }
    }
})();