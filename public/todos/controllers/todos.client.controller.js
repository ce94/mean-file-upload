angular.module('todos').controller('TodosController', ['$scope', '$routeParams', '$location', 'Authentication', 'Todos', 'Upload',
	function($scope, $routeParams, $location, Authentication, Todos, Upload) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var todo = new Todos({
				title: this.title,
				comment: this.comment,
                photograph: this.photograph
			});

			todo.$save(function(response) {
        if ($scope.file) {
          $scope.uploadImage(response._id);
        }
				else {
          $location.path('todos/' + response._id);
        }
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.todos = Todos.query();
		};

		$scope.findOne = function() {
			$scope.todo = Todos.get({
				todoId: $routeParams.todoId
			});
		};

		$scope.update = function() {
			$scope.todo.$update(function() {
				$location.path('todos/' + $scope.todo._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.delete = function(todo) {
			if (todo) {
				todo.$remove(function() {
					for (var i in $scope.todos) {
						if ($scope.todos[i] === todo) {
							$scope.todos.splice(i, 1);
						}
					}
				});
			} else {
				$scope.todo.$remove(function() {
					$location.path('todos');
				});
			}
		};

    /**
       * Upload
       */
      $scope.uploadImage = function(todoId) {
        Upload.upload({
          url: 'http://localhost:1337/api/todos/' + todoId + '/photo',
          data: {
            photograph: $scope.file
          }
        }).then(function() {
          $location.path('todos/' + todoId);
        });
      };

      /**
       * Selected image
       */
      $scope.selectedImage = function(file) {
        if (!file || !Upload.isFile(file)) {
          return;
        }
        $scope.file = file;
      };
	}
]);
