(function () {
    appModule('novel.frame')
        .directive('setFocus', setFocus);

    /**
     * description: 通过setFocus指令设置元素聚焦
     * 只要setFocus对应的属性值发生变化就立即聚焦
     */
    function setFocus() {
        return {
            restrict: 'A',
            scope: {
                setFocus: '='
            },
            link: function (scope, element) {
                scope.$watch("setFocus", function (newValue, oldValue, scope) {
                    if(oldValue==undefined){ //去除第一次
                        scope.setFocus = true;
                        return;
                    }
                    // console.log('检测focus');
                    element[0].focus(); //获取焦点
                }, true);;
            }
        }
    }
})();