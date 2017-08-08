var app = angular.module('appTodoService', [ ]);
app.service('todoService', ['$http', function($http){
	var todoList = [{id:1,name:'item1',status:false},{id:2,name:'item2',status:false},{id:2,name:'item3',status:false}];
	this.getList = function(){
		return todoList;
	};
	this.updateList = function(name){
		var temp = {id:todoList.length, name:name,status:false};
		todoList.push(temp);
		return todoList;
	};
	this.clearAll = function(){
		todoList = [];
	}

}]);