(function () {
    appModule('novel.frame')
        .config(commonConfig);

    commonConfig.$inject = ['$httpProvider'];

    function commonConfig($httpProvider) {
        // $httpProvider.defaults.headers.post = {'Content-Type': 'application/json;charset=utf-8'};
        // $httpProvider.defaults.headers.put = {'Content-Type': 'application/json;charset=utf-8'};
        // $httpProvider.defaults.headers.delete = {'Content-Type': 'application/json;charset=utf-8'};
        // $httpProvider.defaults.cache = false; // 默认关闭缓存
    }
})();
