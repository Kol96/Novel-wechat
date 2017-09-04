(function () {
    appModule('novel.profile').config(profileRoute);

    profileRoute.$inject = ['$stateProvider'];

    function profileRoute($stateProvider) {
        $stateProvider
            .state('tabs.profile', {
                url: '/profile',
                views: {
                    'tab': {
                        templateUrl: './pages/profile/profile.html',
                        controller: 'profileCtrl as vm'
                    }
                }
            })
            .state('tabs.email', {
                url: '/profile/email',
                views: {
                    'tab': {
                        templateUrl: './pages/profile/email.html',
                        controller: 'emailCtrl as vm'
                    }
                }
            })
            .state('tabs.pushBook', {
                url: '/profile/pushBook',
                params: {book: null},
                views: {
                    'tab': {
                        templateUrl: './pages/profile/pushBook.html',
                        controller: 'pushBookCtrl as vm'
                    }
                }
            })
    }
})();