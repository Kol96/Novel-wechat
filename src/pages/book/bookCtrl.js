(function (){
    appModule('novel.book').controller('bookCtrl', bookCtrl);

    bookCtrl.$inject = ['$scope', '$state'];

    function bookCtrl($scope, $state){
        var vm = this;

        console.log('bookCtrl');

        vm.books = angular.fromJson(localStorage.bookshelf);

        vm.bookIntro = function (bookId){
            $state.go('tabs.bookIntro', { bookId: bookId });
        }
    }
})();