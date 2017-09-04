(function (){
    appModule('novel.frame')
        .factory('sessionService', sessionService);

    sessionService.$inject = ['$http', 'api'];

    function sessionService($http, api){
        var service = {};
        var sessionUser = {
            openid: '',
            nickname: '',
            headimgurl: '',
            email: '',
        };

        service.getSessionUser = function (){
            return sessionUser;
        };

        service.querySessionUser = function (){
            return $http.get(api.GETUSERINFO).then(function (response){
                console.log(response);
                sessionUser = angular.extend(sessionUser,response.data);
            });
        };

        return service;
    }
})();