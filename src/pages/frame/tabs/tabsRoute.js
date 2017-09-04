(function () {
    appModule('novel.frame').config(tabsRoute);

    tabsRoute.$inject = ['$stateProvider', '$urlRouterProvider'];

    function tabsRoute($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tabs', {
                url: '',
                abstract: true,
                templateUrl: './pages/frame/tabs/tabs.html',
                controller: 'tabsCtrl as vm'
            });

        $urlRouterProvider
            .otherwise('/search')
    }
})();