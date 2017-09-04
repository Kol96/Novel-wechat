(function(){
    appModule('novel.profile')
        .factory('profileService',profileService );

    profileService.$inject = ['$http','api'];

    function profileService($http, api){
        var service = {};

        service.queryEmail = function(email){
            var body = {
                email: email
            };
            return $http.post(api.MODIFYEMAIL, body);
        };

        service.queryPushToKindle = function(data){
          return $http.post(api.PUSHTOKINDLE, data);
        };

        return service;
    }
})();