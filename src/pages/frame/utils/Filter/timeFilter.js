(function(){
    appModule('novel.frame')
    .filter('timeFilter', timeFilter);

    function timeFilter(){
        return function (str){
            var date = new Date(str);
            var timeFormat = date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日';
            return '更新时间: ' + timeFormat;
        }
    }
})();