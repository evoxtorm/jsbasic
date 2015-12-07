'use strict';

class Notes {

    constructor () {
        this.notes = [];
    }

    addNote (note) {
        this.notes.push(note);
        //console.log(this.notes.length);
    }

    getNoteByIndex (index) {
        if(index >= this.notes.length || index < 0)
            return;
        return this.notes[index];
    }

    getLength () {
        return this.notes.length;
    }

    deleteNotebyIndex (index) {
    	if(index >= this.notes.length || index < 0)
            return;
        this.notes.splice(index,1);
    }
    
       
}