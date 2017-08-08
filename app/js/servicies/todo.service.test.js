describe('todoService', function() {
    var todoService;
       

    beforeEach(module("appTodoService"));
    beforeEach(inject(function(_todoService_) {
    todoService = _todoService_;
    }));
    it('Should have a service', function() {
        expect(todoService).toBeDefined();
    });
    it('Should have default  To do List', function() {
        expect(todoService.getList().length).toBe(3);
    });
    it('Should be able to add to do list', function(){
    	todoService.updateList('item4');
    	expect(todoService.getList().length).toBe(4);
    });
     it('Should clear the list', function(){
    	todoService.clearAll();
    	expect(todoService.getList().length).toBe(0);
    });

});