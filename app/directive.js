/**
 * Project directives
 */

myApp
    .directive("pointHTML", function() {
        return {
            templateUrl: '/themes/DemoApp/point.html',
            replace: false,
            controller: ['$scope', function($scope){

                $scope.point = $scope.point === undefined ? {} : $scope.point;

                /**
                 * empty new comment model
                 * @type {string}
                 */
                $scope.comment = "";

                /**
                 * pre add comment trigger
                 */
                $scope.preAddComment = function () {
                    $scope.point.addComment($scope.comment);
                    $scope.comment = "";
                };

                /**
                 * pre remove comment trigger
                 */
                $scope.preRemoveComment = function (comment) {
                    $scope.point.removeComment(comment);
                };

                /**
                 * pre edit comment trigger
                 */
                $scope.preEditComment = function (comment) {
                    $scope.point.editComment(comment);
                };

                /**
                 * pre save comment trigger
                 */
                $scope.preSaveComment = function (comment) {
                    $scope.point.saveComment(comment);
                };

            }]
        };
    });