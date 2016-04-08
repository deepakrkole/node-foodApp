angular.module('foodService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Food_Items', ['$http',function($http) {
		return {
			get: function() {
				return $http.get('/api/food_items');
			},
			getTotal : function(){
				return $http.get('/api/total');
			},
			create : function(foodData) {
				console.log('in service')
				return $http.post('/api/food_items', foodData);
			},
			delete : function(id) {
				return $http.delete('/api/food_items/' + id);
			}
		}
	}]);
