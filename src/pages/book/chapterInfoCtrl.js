(function (){
    appModule('novel.book')
        .controller('chapterInfoCtrl', chapterInfoCtrl);

    chapterInfoCtrl.$inject = ['$scope', '$state', 'bookService', '_'];

    function chapterInfoCtrl($scope, $state, bookService, _){
        var vm = this;
        console.log('chapterInfoCtrl');
        vm.sourceId          = '';
        vm.link              = '';
        vm.chapterInfo       = '';
        vm.bookInfo          = null;
        vm.chapters          = []; // 章节信息
        vm.chapterIndex      = 0; // 章节位置
        vm.chapterTotalIndex = 0; // 章节总数

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromPatams){
            vm.sourceId = toParams.sourceId;
            vm.link     = toParams.link;
            vm.load();
        });

        vm.load = function (){
            if ( !vm.link ) { // 链接不存在 需要调用一下章节接口 获取第一章的连接
                bookService.queryChapters(vm.sourceId).then(function (){
                    var chapters = bookService.getChapters();
                    vm.link      = chapters[0].link;
                }).then(vm.loadChapterInfo);
            } else {
                vm.loadChapterInfo();
            }
            vm.bookInfo = bookService.getBookInfo();
        };

        vm.loadChapterInfo = function (){
            bookService.queryChapterInfo(vm.link).then(function (){
                vm.chapterInfo = bookService.getChapterInfo();
                // console.log(vm.chapterInfo);
                if ( vm.chapterInfo.cpContent ) {
                    vm.chapterInfo.body = vm.chapterInfo.cpContent;
                }
                vm.chapterSection = vm.chapterInfo.body.split('\n');

                // 获取章节位置
                vm.chapters          = bookService.getChapters();
                vm.chapterTotalIndex = vm.chapters.length;
                _.find(vm.chapters, function (value, key){
                    if ( value.link == vm.link ) {
                        vm.chapterIndex = key;
                        return true;
                    }
                });
            });
        };

        // 翻页 寻找下一章或上一章的link
        vm.page = function (action){
            if ( action == 'prev' ) {
                vm.chapterIndex--;
            } else {
                vm.chapterIndex++;
            }
            $state.go('tabs.chapterInfo', {
                sourceId: vm.sourceId,
                link: vm.chapters[vm.chapterIndex].link
            })
        };

        // 目录
        vm.chapter = function(){
            $state.go('tabs.chapter', {
                sourceId: vm.sourceId
            })
        };
    }
})();