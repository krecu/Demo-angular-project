/**
 * Project factories
 */

myApp
    .factory('Comment', function () {

        /**
         * Comment class
         * @param text
         * @param created
         * @param user
         * @constructor
         */
        function Comment(text, created, user) {
            this.id = new Date().getTime();
            this.text = text;
            this.time = moment.unix(created).format("MM/DD/YYYY hh:mm");
            this.user = user;
            this.status = "published";
        }

        return Comment;
    })

    .factory('Point', function(Comment) {

        /**
         * Point class
         * @param x
         * @param y
         * @constructor
         */
        function Point(x, y) {
            this.id = new Date().getTime();
            this.x = x;
            this.y = y;
            this.r = 30;
            this.show = 0;
            this.comments = [];
        }

        Point.prototype = {

            /**
             * add new comment
             * @param text
             */
            addComment: function (text) {
                var c = new Comment(text, Math.floor(Date.now() / 1000), "Who i am...");
                this.comments.push(c);
            },

            /**
             * remove comment from list
             * @param comment
             */
            removeComment: function (comment) {
                this.comments = this.comments.filter(function (c) {
                    return comment.id != c.id;
                });
            },

            /**
             * start edit comment
             * @param comment
             */
            editComment: function (comment) {
                this.comments.filter(function (c) {
                    return comment.id == c.id;
                })[0].status = "edit";
            },

            /**
             * save comment
             * @param comment
             */
            saveComment: function (comment) {
                this.comments.filter(function (c) {
                    return comment.id == c.id;
                })[0].status = "published";
            }
        };

        return Point;
    });