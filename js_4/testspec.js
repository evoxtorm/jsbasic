var Notes = require('./Notespec.js');


describe('Notes', function() {
    
    var notes;
    var newNoteOne;
    var newNoteTwo;
    var newNoteThree;

    beforeEach(function() {
        notes = new Notes();
        newNoteOne = {id:1,content:'first'};
        newNoteTwo = {id:2,content:'second'};
        newNoteThree = {id:3,content:'third'};
        notes.notes.push(newNoteOne,newNoteTwo);
    });

    it('should test the gettingNotes function: same length',function(done) {
        notes.gettingNotes(function(returnedNotes) {             
            expect(returnedNotes.length).toBe(2);
            done();                                
        });       
    });

    it('should test the gettingNotes function: same element',function(done) {
        notes.gettingNotes(function(returnedNotes) {             
            expect(returnedNotes[1]).toBe(notes.notes[1]);
            done();                                
        });       
    });

    it('should test the addNote function: add the same element',function(done) {
        notes.addNote(newNoteThree,function(){
            expect(notes.notes[2]).toEqual(newNoteThree);
            done();           
        });                      
    });

    it('should test the addNote function: no more element be added',function(done) {
        notes.addNote(newNoteThree,function(){
            expect(notes.notes[3]).toEqual(undefined);
            done();          
        });                      
    });

    it('should test the deleteNote function: one element is deleted', function(done) {
        notes.deleteNote(newNoteOne,function() {
            expect(notes.notes.length).toEqual(1);
            done();
        });        
    });

    it('should test the deleteNote function: the specific element is deleted', function(done) {
        notes.deleteNote(newNoteOne,function() {
            expect(notes.notes[0]).toEqual(newNoteTwo);
            done();
        });       
    });
});

