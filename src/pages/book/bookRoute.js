(function (){
    appModule('novel.book').config(bookRoute);

    bookRoute.$inject = ['$stateProvider'];

    function bookRoute($stateProvider){
        $stateProvider
            .state('tabs.book', {
                url: '/book',
                views: {
                    'tab': {
                        templateUrl: './pages/book/book.html',
                        controller: 'bookCtrl as vm'
                    }
                }
            })
            .state('tabs.bookIntro', {
                url: '/book/bookIntro/:bookId',
                // params: {bookId: null},
                views: {
                    'tab': {
                        templateUrl: './pages/book/bookIntro.html',
                        controller: 'bookIntroCtrl as vm'
                    }
                }
            })
            .state('tabs.chapter', {
                url: '/book/chapter/:sourceId',
                params: { pageIndex: null, reverse: false },
                views: {
                    'tab': {
                        templateUrl: './pages/book/chapter.html',
                        controller: 'chapterCtrl as vm'
                    }
                }
            })
            .state('tabs.chapterInfo', {
                url: '/book/chapterInfo/:sourceId',
                params: { link: null },
                views: {
                    'tab': {
                        templateUrl: './pages/book/chapterInfo.html',
                        controller: 'chapterInfoCtrl as vm'
                    }
                }
            })
    }
})();