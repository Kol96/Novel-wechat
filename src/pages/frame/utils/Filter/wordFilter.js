(function (){
    appModule('novel.frame')
        .filter('wordFilter', wordFilter);

    function wordFilter(){
        return function (num){
            if(!num){return num;}
            var num = num.toString();
            if ( num.length > 4 ) {
                return num.slice(0, -4) + '万字';
            }else{
                return num + '字';
            }
        }
    }
})();