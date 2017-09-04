(function () {
    appModule('novel.profile').controller('profileCtrl',profileCtrl);

    profileCtrl.$inject = ['$scope', 'weui', 'sessionService'];
    
        function profileCtrl($scope, weui, sessionService) {
            var vm = this;

            vm.sessionUser = sessionService.getSessionUser();
        }
})();