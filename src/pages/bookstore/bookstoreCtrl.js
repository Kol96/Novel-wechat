(function () {
    appModule('novel.bookstore').controller('bookstoreCtrl',bookstoreCtrl);

    bookstoreCtrl.$inject = ['$scope', 'weui'];
    
        function bookstoreCtrl($scope, weui) {
            var vm = this;
            vm.name = 'kol';
    
            console.log('bookstoreCtrl');
        }
})();