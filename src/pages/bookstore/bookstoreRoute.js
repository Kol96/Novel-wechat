(function () {
    appModule('novel.bookstore').config(bookstoreRoute);

    bookstoreRoute.$inject = ['$stateProvider'];

    function bookstoreRoute($stateProvider) {
        $stateProvider
            .state('tabs.bookstore', {
                url: '/bookstore',
                views: {
                    'tab': {
                        templateUrl: './pages/bookstore/bookstore.html',
                        controller: 'bookstoreCtrl as vm'
                    }
                }
            })
    }
})();