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
<<<<<<< HEAD
        if(index >= this.notes.length || index < 0)
=======
        if(index >= this.notes.length)
>>>>>>> f0c8b13e3e325b01f962c92cd8e2fd89af1f1212
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
