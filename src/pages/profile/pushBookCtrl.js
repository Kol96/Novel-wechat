(function (){
    appModule('novel.profile')
        .controller('pushBookCtrl', pushBookCtrl);

    pushBookCtrl.$inject = ['$rootScope', '$scope', '$state', 'sessionService', 'bookService', 'profileService', 'weui', '_'];

    function pushBookCtrl($rootScope, $scope, $state, sessionService, bookService, profileService, weui, _){
        var vm = this;

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams){
            vm.book = toParams.book;
            if ( !vm.book ) {
                $rootScope.back();
                return;
            }
            console.log(vm.book);
            // 获取章节
            bookService.queryChapters(vm.book.sourceId).then(function (){
                vm.chapters = bookService.getChapters();
                // console.log(vm.chapters);
            });
            // 获取小说源
            bookService.queryBookSource(vm.book.bookId).then(function (){
                vm.bookSource = bookService.getBookSource();
                console.log(vm.bookSource);
                vm.source = _.find(vm.bookSource, function (source){
                    if ( source._id == vm.book.sourceId ) {
                        return true;
                    }
                })
            });
        });

        vm.sessionUser = sessionService.getSessionUser();
        if ( !vm.sessionUser.email ) {
            weui.alert('请先去绑定邮箱', function (){
                $state.go('tabs.email');
            });
        }

        // 推送 校验
        vm.push = function (){
            console.log(vm.start, vm.end);
            if ( vm.start > vm.end ) {
                weui.alert('开始章节大于结束章节');
                return;
            }
            if ( vm.start < 1 || vm.start > vm.chapters.length ) {
                weui.alert('开始章节填写超出范围');
                return;
            }
            if ( vm.end < 1 || vm.end > vm.chapters.length ) {
                weui.alert('结束章节填写超出范围');
                return;
            }
            var data = angular.extend(vm.book,{
                start: vm.start-1,
                end: vm.end-1,
            });
            // console.log(data);
            profileService.queryPushToKindle(data).then(function(){
                weui.alert('小说稍后会推送到kindle,请耐心等待');
            });
        };
    }
})();