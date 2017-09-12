(function () {
    appModule('novel.book').controller('bookCtrl', bookCtrl);

    bookCtrl.$inject = ['$scope', '$state', '_', 'bookService'];

    function bookCtrl($scope, $state, _, bookService) {
        var vm = this;

        console.log('bookCtrl');

        vm.swipeElem = null; // 是否有滑动的项

        vm.books = angular.fromJson(localStorage.bookshelf);

        _.each(vm.books, function (value, bookId, obj) {
            bookService.queryBookInfo(bookId).then(function(){
                var bookInfo = bookService.getBookInfo();
                obj[bookId].author = bookInfo.author;
                obj[bookId].updated = bookInfo.updated;
                obj[bookId].lastChapter = bookInfo.lastChapter;
            });
        });

        vm.bookIntro = function (bookId) {
            if (vm.swipeElem) {
                // $(vm.swipeElem).removeClass('swipeLeft');
                vm.swipeElem = null;
                return;
            }
            $state.go('tabs.bookIntro', {
                bookId: bookId
            });
        }

        // 一键推送
        vm.push = function (book) {
            console.log(book);
            var data = {
                title: book.title,
                bookId: book.bookId,
                sourceId: book.sourceId
            };
            $state.go('tabs.pushBook', {
                book: data
            });
        };

        // 删除小说
        vm.del = function (bookId) {
            console.log('删除')
            delete vm.books[bookId];
            localStorage.bookshelf = angular.toJson(vm.books);
            weui.toast('删除小说成功', 1000);
        }
    }
})();