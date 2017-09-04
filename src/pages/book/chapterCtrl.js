(function (){
    appModule('novel.book')
        .controller('chapterCtrl', chapterCtrl);

    chapterCtrl.$inject = ['$scope', '$state', 'bookService'];

    function chapterCtrl($scope, $state, bookService){
        var vm           = this;
        vm.sourceId      = '';  // 小说源id
        vm.pageIndex     = 0;  // 第几页
        vm.chapters      = []; // 每页显示的章节
        vm.pageSize      = 30; // 每页多少章
        vm.pageTotalSize = 0; // 总页数
        vm.reverse       = false; // 升序
        console.log('chapterCtrl');

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState){
            // console.log(toParams);
            vm.sourceId  = toParams.sourceId;
            vm.pageIndex = toParams.pageIndex || 0;
            vm.reverse   = toParams.reverse;

            if ( fromState.name == 'tabs.chapter' ) { // 同一本小说 已经获取了章节 无需再请求
                var start         = vm.pageIndex * vm.pageSize,
                    end           = (vm.pageIndex + 1) * vm.pageSize,
                    totalChapters = bookService.getChapters();
                if ( vm.reverse ) { // 如果要降序 那么就将数组倒序牌
                    if ( start == 0 ) {
                        vm.chapters = totalChapters.slice(-end);
                    } else {
                        vm.chapters = totalChapters.slice(-end, -start);
                    }
                    vm.chapters.reverse();
                } else {
                    vm.chapters = totalChapters.slice(start, end);
                }
                vm.pageTotalSize = Math.ceil(totalChapters.length / vm.pageSize);
            } else {
                vm.load();
            }
        });

        vm.load = function (){
            bookService.queryChapters(vm.sourceId).then(function (){
                var start         = vm.pageIndex * vm.pageSize,
                    end           = (vm.pageIndex + 1) * vm.pageSize,
                    totalChapters = bookService.getChapters();
                if ( vm.reverse ) { // 如果要降序 那么就将数组倒序牌
                    totalChapters.reverse();
                }
                vm.chapters      = totalChapters.slice(start, end);
                vm.pageTotalSize = Math.ceil(totalChapters.length / vm.pageSize);
                // console.log(vm.chapters);
            });
        };

        // 翻页
        vm.page = function (index){
            $state.go('tabs.chapter', {
                sourceId: vm.sourceId,
                pageIndex: index,
                reverse: vm.reverse
            });
        };

        // 升序 降序
        vm.reverseChapter = function (){
            $state.go('tabs.chapter', {
                sourceId: vm.sourceId,
                pageIndex: 0,
                reverse: !vm.reverse
            });
        };

        // 跳转章节内容
        vm.goChapterInfo = function(link){
            $state.go('tabs.chapterInfo', {
                sourceId: vm.sourceId,
                link: link
            });
        }
    }
})();