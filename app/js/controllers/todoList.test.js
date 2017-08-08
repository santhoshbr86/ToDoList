'use strict';
describe('VMS.todoHome', function() {
	var $scope,
		$scope,
        $window,
        $controller,
        todoService,
        getController

        beforeEach(module('todoHome'));
        beforeEach(inject(function($injector, _$rootScope_, _$controller_) {
        $scope = _$rootScope_.$new();
        $controller = _$controller_;
        $scope.todoForm ={
            $valid:true
        };
       
        todoService = {
            getList:function(){
                return '';
            },
            updateList:function(a){
                return [];
            },
            clearAll:function(){

            }
        }
        spyOn(todoService, 'getList');
        spyOn(todoService, 'updateList');
        spyOn(todoService, 'clearAll');
        $window = {
            localStorage: {
                getItem: function(a) {
                    return '{}';
                },
                setItem:function(a){
                    return;
                },
                removeItem:function(){
                    return 0;
                }
            }
        };
        spyOn($window.localStorage, 'getItem').and.callThrough();
        spyOn($window.localStorage, 'setItem').and.callThrough();
         getController = function() {
            return $controller('todoHomeCtrl', {
                $scope: $scope,
                todoService:todoService,
                $window:$window
             });
        };

    	}));

    it('Should have a controller', function() {
        var controller = getController();
        expect(controller).toBeDefined();
    });
    it('Should have list intialsed', function() {
        var controller = getController();
        expect(todoService.getList).toHaveBeenCalled();
    });
    
    it('Should update the list', function() {
        var controller = getController();
        $scope.updateList();
        expect(todoService.updateList).toHaveBeenCalled();
    });
    it('Should mark List has done', function() {
        var controller = getController();
        $scope.todoList=[{id:1,name:'item1',status:false},{id:2,name:'item2',status:false},{id:2,name:'item3',status:false}];
        $scope.checkedItem={2:true};
        $scope.markAsDone(2);
        expect($scope.todoList[2].status).toBe(true);
    });
    it('Should delete item from the list', function() {
        var controller = getController();
        $scope.todoList=[{id:1,name:'item1',status:false},{id:2,name:'item2',status:false},{id:2,name:'item3',status:false}];
        $scope.removeItem(2);
        expect($scope.todoList.length).toBe(2);
    });
     it('Should delete all list Items from the list', function() {
        var controller = getController();
        $scope.todoList=[{id:1,name:'item1',status:false},{id:2,name:'item2',status:false},{id:2,name:'item3',status:false}];
        $scope.DeleteAll();
        expect($window.localStorage.setItem).toHaveBeenCalled();
        expect(todoService.clearAll).toHaveBeenCalled();
        expect($scope.todoList.length).toBe(0);
    });
     it('Should Undo all list Items ', function() {
        var controller = getController();
        $scope.todoList=[{id:1,name:'item1',status:false},{id:2,name:'item2',status:false},{id:2,name:'item3',status:false}];
        $scope.UndoAll();
        expect($window.localStorage.getItem).toHaveBeenCalled();
        
    });
     it('Should Reset all list Items ', function() {
        var controller = getController();
        $scope.todoList=[{id:1,name:'item1',status:true},{id:2,name:'item2',status:true},{id:2,name:'item3',status:true}];
        $scope.ResetAll();
        expect($scope.selectAll).toBeFalsy();
        expect($scope.todoList[1].status).toBeFalsy();
    });


});