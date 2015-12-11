var Notes = require('./srcspec.js');


describe('Note test: ', function() {
    var notes;
    beforeEach(function() {
        notes = new Notes();
        notes.notes.push({id:1,content:'first'},{id:2,content:'second'});
    });

    it('to test the gettingNotes function: same length',function(done) {
        notes.gettingNotes(function(array) {             
            expect(array.length).toBe(2);
            done();                                
        });       
    });

    it('to test the gettingNotes function: same element',function(done) {
        notes.gettingNotes(function(array) { 
            var index = getRandomInt(-1,array.length);            
            expect(array[index]).toBe(notes.notes[index]);
            done();                                
        });       
    });

    it('to test the addNote function: add the same element',function(done) {
        notes.addNote({id:3,content:'third'},function(){
            expect(notes.notes[2]).toEqual({id:3,content:'third'});           
        });              
        done();
    });

    it('to test the addNote function: no more element be added',function(done) {
        notes.addNote({id:3,content:'third'},function(){
            expect(notes.notes[3]).toEqual(undefined);          
        });               
        done();
    });

    it('to test the deleteNote function: one element is deleted', function(done) {
        notes.deleteNote({id:1,content:'first'},function() {
            expect(notes.notes.length).toEqual(1);
        });
        done();
    });

    it('to test the deleteNote function: the specific element is deleted', function(done) {
        notes.deleteNote({id:1,content:'first'},function() {
            expect(notes.notes[0]).toEqual({id:2,content:'second'});
        });
        done();
    });

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

});

