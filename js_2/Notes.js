'use strict';

class Notes {

    constructor () {
        this.notes = [];
    }

    addNote (note) {
        this.notes.push(note);
        console.log(this.notes);
    }

    getNoteByIndex (index) {
        if(index >= this.notes.length || index < 0)
            return;
        return this.notes[index];
    }

    getLength () {
        return this.notes.length;
    }

    deleteNote (note) {
        var index = this.notes.findIndex(function (element){
            return note === element;
        });
        if(index !== -1)
            this.notes.splice(index,1);
              
    }
    
       
}
