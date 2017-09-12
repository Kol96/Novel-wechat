(function (){
    appModule('novel.frame')
        .factory('api', api);

    function api(){
        var bookAPI = 'https://novel.kylen.cc';
        return {
            AUTOCOMPLETE :  bookAPI + '/book/auto-complete',
            FUZZYSEARCH :  bookAPI + '/book/fuzzy-search',
            GETBOOKINFO: bookAPI + '/book/',
            GETBOOKSOURCE: bookAPI + '/atoc/',
            GETCHAPTERS: bookAPI + '/atoc/',
            GETCHAPTERINFO: bookAPI + '/chapter/',

            GETUSERINFO: bookAPI + '/userInfo',
            MODIFYEMAIL: bookAPI + '/email',
            PUSHTOKINDLE: bookAPI + '/kindle',
        };
    }
})();