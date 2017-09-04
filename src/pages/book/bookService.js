(function (){
    appModule('novel.book')
        .factory('bookService', bookService);

    bookService.$inject = ['$http', 'api', 'weui'];

    function bookService($http, api, weui){
        var bookInfo   = null,  // 小说信息
            bookSource = [], // 小说源
            chapters   = [], // 小说章节
            chapterInfo = ''; // 章节内容

        return {
            getBookInfo: function (){
                return bookInfo;
            },

            getBookSource: function (){
                return bookSource;
            },

            getChapters: function(){
                return chapters;
            },

            getChapterInfo: function(){
                return chapterInfo;
            },

            /**
             * 小说信息接口
             * @param bookId
             */
            queryBookInfo: function (bookId){
                var url     = api.GETBOOKINFO + bookId;
                var promise = $http.get(url).then(function (response){
                    bookInfo = response.data;
                }, function (e){
                    weui.alert('小说信息查询失败');
                });
                return promise;
            },

            /**
             * 小说源接口
             * @param bookId
             */
            queryBookSource: function (bookId){
                var config  = {
                    params: {
                        view: 'summary',
                        book: bookId
                    }
                };
                var promise = $http.get(api.GETBOOKSOURCE, config).then(function (response){
                    bookSource = response.data;
                }, function (e){
                    weui.alert('小说源查询失败');
                });
                return promise;
            },

            /**
             * 章节接口
             * @param sourceId
             */
            queryChapters: function (sourceId){
                var url     = api.GETCHAPTERS + sourceId + '?view=chapters';
                var promise = $http.get(url).then(function (response){
                    chapters = response.data.chapters;
                }, function (e){
                    weui.alert('章节查询失败');
                });
                return promise;
            },

            /**
             * 章节内容接口
             * @param link
             */
            queryChapterInfo: function(link){
                var url = api.GETCHAPTERINFO + '?chapterUrl=' + link;
                var promise = $http.get(url).then(function (response){
                    chapterInfo = response.data.chapter;
                }, function (e){
                    weui.alert('章节内容查询失败');
                });
                return promise;
            }
        }
    }
})();