angular.module('foodController', [])
	.controller('mainController', ['$scope','$http','Food_Items', function($scope, $http, Food_Items) {
		$scope.formData = {};
		$scope.loading = true;
		// GET =====================================================================
		
		Food_Items.get()
			.success(function(data) {
				console.log(data);
				$scope.food_items = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createFood = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
					console.log($scope.formData);
					$scope.loading = true;

				// call the create function from our service (returns a promise object)
						Food_Items.create($scope.formData)
							.success(function(data) {
								$scope.loading = false;
								$scope.formData = {}; // clear the form so our user is ready to enter another
								$scope.food_items = data; 
							});
						
					}
					
			};

		// DELETE ==================================================================
		
		$scope.deleteFood = function(id) {
			$scope.loading = true;

			Food_Items.delete(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.food_items = data; 
				});
		};

		//order total:
		$scope.getTotal = function(){
			Food_Items.getTotal()
			.success(function(data) {
				console.log("angular", data);
				$scope.total = data;
				$scope.loading = false;
			});
    		
			}
	}]);