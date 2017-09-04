(function (){
    appModule('novel.search').controller('searchCtrl', searchCtrl);

    searchCtrl.$inject = ['$scope', '$state', 'weui', 'searchService'];

    function searchCtrl($scope, $state, weui, searchService){
        var vm      = this;
        vm.query    = ''; // 搜索参数
        vm.keywords = []; // 搜索关键字

        // 回车搜索
        vm.search = function (e){
            e.preventDefault();
            $state.go('tabs.searchResult', { query: vm.query });
        };

        // 点击搜索推荐关键词
        vm.searchKeyword = function (keyword){
            $state.go('tabs.searchResult', { query: keyword });
        };

        // 点击上层搜索框，隐藏浮层
        vm.showSearchInput = function (){
            vm.hideSearchText = true;
            vm.setFocus       = !vm.setFocus;
        };

        // 失去焦点时
        vm.searchBlur = function (){
            if ( !vm.query.length ) {
                vm.query          = '';
                vm.hideSearchText = false;
                vm.showResult     = false;
            }
        };

        // 输入值改变时
        vm.searchInput = function (){
            if ( vm.query.length ) {
                vm.showResult = true;
                searchService.autoComplete(vm.query).then(function (){
                    vm.keywords = searchService.getKeyword();
                    console.log(vm.keywords.length);
                });
            } else {
                vm.showResult = false;
                vm.keywords   = [];
            }
        };

        // 清空输入
        vm.clear = function (){
            vm.query      = '';
            vm.showResult = false;
            vm.setFocus   = !vm.setFocus;
        }

        // 取消搜索
        vm.cancel = function (){
            vm.query          = '';
            vm.hideSearchText = false;
            vm.showResult     = false;
        }

    }
})();