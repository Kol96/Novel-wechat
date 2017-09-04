(function (){
    appModule('novel.search').config(searchRoute);

    searchRoute.$inject = ['$stateProvider'];

    function searchRoute($stateProvider){
        $stateProvider
            .state('tabs.search', {
                url: '/search',
                views: {
                    'tab': {
                        templateUrl: './pages/search/search.html',
                        controller: 'searchCtrl as vm'
                    }
                }
            })
            .state('tabs.searchResult', {
                url: '/search/result/:query',
                views: {
                    'tab': {
                        templateUrl: './pages/search/searchResult.html',
                        controller: 'searchResultCtrl as vm'
                    }
                }
            })
    }
})();