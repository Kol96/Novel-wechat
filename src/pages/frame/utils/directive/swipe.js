(function () {
    angular.module('novel.frame')
        .directive('swipe', swipe);

    swipe.$inject = ['$timeout'];

    function swipe($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var preX = 0,
                    preY = 0,
                    nowX = 0,
                    nowY = 0,
                    $ = angular.element;
                element.parent().parent().on('click', function (e) {
                    if (scope.vm.swipeElem) {
                        $(scope.vm.swipeElem).removeClass('swipeLeft');
                        scope.vm.swipeElem = null;
                    }
                });
                element.on('touchstart', function (e) {
                    console.log('touchstart');
                    if (scope.vm.swipeElem) {
                        var swipeElem = scope.vm.swipeElem;
                        $timeout(function () {
                            $(swipeElem).removeClass('swipeLeft');
                        }, 0);
                    }
                    nowX = e.targetTouches[0].clientX;
                });
                element.on('touchmove', function (e) {
                    preX = nowX;
                    nowX = e.targetTouches[0].clientX;
                    if (nowX - preX < -3) { // 向左移动
                        scope.vm.swipeElem = this;
                        $(this).addClass('swipeLeft');
                    } else {
                        scope.vm.swipeElem = null;
                        if ($(this).hasClass('swipeLeft')) {
                            $(this).removeClass('swipeLeft');
                        }
                    }
                });
                element.on('touchend', function () {
                    preX = nowX = 0;
                });
            }
        }
    }
})();