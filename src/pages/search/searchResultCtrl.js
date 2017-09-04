(function (){
    appModule('novel.search').controller('searchResultCtrl', searchResultCtrl);

    searchResultCtrl.$inject = ['$scope','$state', 'searchService'];

    function searchResultCtrl($scope,$state, searchService){
        var vm = this;

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams){
            vm.query = toParams.query;
            searchService.fuzzySearch(vm.query).then(function (){
                vm.books = searchService.getBook();
            });
        });

        vm.readMore = function (bookId){
            $state.go('tabs.bookIntro', { bookId: bookId });
        }
    }
})();