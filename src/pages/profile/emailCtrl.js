(function (){
    appModule('novel.profile')
        .controller('emailCtrl', emailCtrl);

    emailCtrl.$inject = ['$rootScope', '$state', 'sessionService', 'profileService', 'weui'];

    function emailCtrl($rootScope, $state, sessionService, profileService, weui){
        var vm = this;

        vm.sessionUser = sessionService.getSessionUser();
        vm.email       = vm.sessionUser.email;

        vm.save = function (){
            if ( !vm.email ) {
                weui.alert('邮箱不能为空');
                return;
            }
            if ( vm.email == vm.sessionUser.email ) {
                weui.alert('邮箱未修改');
                return;
            }
            profileService.queryEmail(vm.email).then(function (response){
                if ( response.data == 'success' ) {
                    vm.sessionUser.email = vm.email;
                    weui.toast('邮箱保存成功', {
                        duration: 1000,
                        callback: function(){ $rootScope.back(); }
                    });
                }
            }, function (error){
                weui.alert('邮箱修改失败');
            });
        }
    }
})();