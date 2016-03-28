/**
 * Project controllers
 *
 * @todo - feature to cached point in $localStorage
 *
 */

myApp
    .controller('mainCtrl', ['$scope', '$localStorage', '$window', 'Point', function ($scope, $localStorage, $window, Point) {

        /**
         * All points scope
         * @type {Array}
         */
        $scope.points = [];

        /**
         * Show or hide list points
         * @type {boolean}
         */
        $scope.display = false;

        /**
         * Create point
         * @param e
         */
        $scope.createPoint = function (e) {
            var p = new Point(e.layerX, e.layerY);
            $scope.points.push(p);
        };

        /**
         * Remove point
         * @param point
         */
        $scope.removePoint = function(point) {
            $scope.points = $scope.points.filter(function(p){
                return p.id !== point.id;
            });
        };

        /**
         * check show or hide points on wrapper
         * @param e
         */
        $scope.showPoints = function(e){
            var
                shape = document.getElementById('shape'),
                rect = shape.getBoundingClientRect(),
                doc = shape.ownerDocument,
                docElem = doc.documentElement,
                x1 = rect.left + $window.pageXOffset - docElem.clientLeft,
                x2 = x1 + shape.offsetWidth,
                y1 = rect.top + $window.pageYOffset - docElem.clientTop,
                y2 = y1 + shape.offsetHeight;

            if ((e.clientX >= x1 && e.clientX <= x2) &&
                (e.clientY >= y1 && e.clientY <= y2)) {
                $scope.display = true;
            }
            else {
                $scope.display = false;
            }
        };

        /**
         * Hide points
         */
        $scope.hidePoints = function(){
            $scope.display = false;
        };

    }]);