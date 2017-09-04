(function (){
    appModule('novel.book').controller('bookIntroCtrl', bookIntroCtrl);

    bookIntroCtrl.$inject = ['$scope', '$state', '_', 'bookService', 'weui'];

    function bookIntroCtrl($scope, $state, _, bookService, weui){
        var vm          = this;
        vm.bookInfo     = null; // 小说信息
        vm.bookId       = ''; // 获取小说信息的id
        vm.bookSourceId = ''; // 小说源的id 获取章节 章节内容
        vm.bookSource   = [];
        vm.bookshelfTip = '加入书架';

        console.log('bookIntroCtrl');
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams){
            // console.log(toParams);
            vm.bookId = toParams.bookId;
            if ( !vm.bookId ) {
                $state.go('tabs.book');
                return;
            }
            bookService.queryBookInfo(vm.bookId).then(function (){
                vm.bookInfo = bookService.getBookInfo();
                // console.log(vm.bookInfo);
                if ( localStorage.bookshelf ) {
                    var bookshelf = angular.fromJson(localStorage.bookshelf);
                    if ( bookshelf[vm.bookId] ) {
                        vm.bookshelfTip = '删除小说';
                    }
                }
            });
            bookService.queryBookSource(vm.bookId).then(function (){
                vm.bookSource   = bookService.getBookSource();
                vm.bookSourceId = vm.bookSource[0]._id;
                _.each(vm.bookSource, function (source){
                    source.label = source.name;
                    source.value = source._id;
                });
            });
        });

        // 切换小说源
        vm.changeSource = function (){
            weui.picker(vm.bookSource, {
                defaultValue: [vm.bookSourceId],
                onConfirm: function (bookSource){
                    // 切换的小说源
                    $scope.$apply(function (){
                        vm.bookSourceId = bookSource[0]._id;
                        // 更新localStorage 中的bookSourceId
                        if ( localStorage.bookshelf ) {
                            var bookshelf = angular.fromJson(localStorage.bookshelf);
                            if ( bookshelf[vm.bookInfo._id] ) {
                                bookshelf[vm.bookInfo._id].sourceId = vm.bookSourceId;
                                localStorage.bookshelf              = angular.toJson(bookshelf);
                            }
                        }
                    });
                }
            });
        };

        // 加入书架 存在localStorage bookId为键
        vm.addBookshelf = function (){
            var bookshelf = {};
            if ( localStorage.bookshelf ) {
                bookshelf = angular.fromJson(localStorage.bookshelf);
                // console.log(bookshelf);
            }
            if ( vm.bookshelfTip == '加入书架' ) {
                vm.bookshelfTip            = '删除小说';
                bookshelf[vm.bookInfo._id] = {
                    title: vm.bookInfo.title,
                    cover: vm.bookInfo.cover,
                    bookId: vm.bookInfo._id,
                    sourceId: vm.bookSourceId,
                };
                localStorage.bookshelf     = angular.toJson(bookshelf);
                weui.toast('加入书架成功', 1000);
            } else {
                vm.bookshelfTip = '加入书架';
                delete bookshelf[vm.bookId];
                localStorage.bookshelf = angular.toJson(bookshelf);
                weui.toast('删除小说成功', 1000);
            }

        };

        // 开始阅读
        vm.read = function (){
            $state.go('tabs.chapterInfo', {
                sourceId: vm.bookSourceId
            });
        };

        // 一键推送
        vm.push = function (){
            var book = {
                title: vm.bookInfo.title,
                bookId: vm.bookInfo._id,
                sourceId: vm.bookSourceId
            };
            $state.go('tabs.pushBook', {
                book: book
            });
        };
    }
})();