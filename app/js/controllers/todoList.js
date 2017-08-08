var app=angular.module('todoHome',[ ])
app.controller('todoHomeCtrl', ['$scope',  'todoService', '$window', function($scope, todoService, $window){
	$scope.submitted = false;
	$scope.checkedItem=[];
	$scope.selectAll=false;
	// Get data from service
	$scope.todoList = todoService.getList();
	// Update data todo to list.
	$scope.updateList = function(){
		if($scope.todoForm.$valid){
			$scope.submitted = false;
			$scope.todoList=todoService.updateList($scope.name);
			$scope.name='';
		}
		else
		{
			$scope.submitted = true;
		}

	}
	// Delete Item from list
	$scope.removeItem = function(ind){
		$scope.todoList.splice(ind, 1);
		$scope.checkedItem[ind]=false;     
	};

	// after checkbox selected will marked and done
	$scope.markAsDone = function(ind){
		if($scope.checkedItem[ind])
		{
			$scope.todoList[ind].status=true;	
		}
		else{
			$scope.todoList[ind].status=false;
		}
	};

	// To select all.
	$scope.checkAll = function(){
		if($scope.selectAll){
			angular.forEach($scope.todoList, function(value,key){
				value.status=true;
				$scope.checkedItem[key]=true;
			});
		}else{
			angular.forEach($scope.todoList, function(value,key){
				value.status=false;
				$scope.checkedItem[key]=false;
			});
		}
	};

	// Delete all after selecting select All checkbox and clicking.
	$scope.DeleteAll = function(){
		$window.localStorage.setItem('todoList',JSON.stringify($scope.todoList));
		$scope.todoList=[];
		todoService.clearAll();
	};
	// getting data from LocalStorage and display again.
	$scope.UndoAll = function(){
		$scope.todoList=JSON.parse($window.localStorage.getItem('todoList'));
		$window.localStorage.removeItem('todoList');			
	};
	// reset All
	$scope.ResetAll = function(){
			$scope.selectAll=false;
			angular.forEach($scope.todoList, function(value,key){
				value.status=false;
				$scope.checkedItem[key]=false;
			});
	}

}]);