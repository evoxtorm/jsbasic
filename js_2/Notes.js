'use strict';

class Notes {

    constructor () {
        this.notes = [];
    }

    addNote (note) {
        this.notes.push(note);
        console.log(this.notes.length);
    }

    getNoteByIndex (index) {
        if(index > this.notes.length)
            return;
        return this.notes[index];
    }

    getLength () {
        return this.notes.length;
    }

    deleteNote () {}
    
       
}