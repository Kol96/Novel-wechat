(function (){
    appModule('novel.search')
        .service('searchService', searchService);

    searchService.$inject = ['$http', 'api'];
    function searchService($http, api){
        var keywords = [], // 关键字
            books    = []; // 书

        return {
            getKeyword: function (){
                return keywords;
            },

            getBook: function(){
              return books;
            },

            /**
             * 搜索自动补全接口
             * @param query
             */
            autoComplete: function (query){
                var config  = {
                    params: {
                        query: query
                    }
                };
                var promise = $http.get(api.AUTOCOMPLETE, config).then(function (response){
                    // console.log('成功');
                    keywords = response.data.keywords;
                }, function (e){
                    console.log('查询失败');
                });
                return promise;
            },

            /**
             * 模糊搜索接口
             * @param query
             */
            fuzzySearch: function (query){
                var config  = {
                    params: {
                        query: query
                    }
                };
                var promise = $http.get(api.FUZZYSEARCH, config).then(function (response){
                    // console.log('成功');
                    books = response.data.books;
                }, function (e){
                    console.log('查询失败');
                });
                return promise;
            }
        }
    }
})();