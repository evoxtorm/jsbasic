function Notes() {
    this.notes = [];
}

Notes.prototype.gettingNotes = function(cb) {
    setTimeout(function() {
        cb(this.notes);
    }.bind(this),1000);

}

Notes.prototype.addNote = function(note,cb) {
    console.log("start to add");
    setTimeout(function() {
        this.notes.push(note);
        cb();
        console.log("added!");
    }.bind(this),1000);
}

Notes.prototype.deleteNote = function(note,cb) {
    console.log("start to delete");
    setTimeout(function() {
        var index = this.notes.findIndex(function (element){
            return note.id === element.id;
        });
        if(index !== -1)
            this.notes.splice(index,1);
        cb();
        console.log("deleted!");
    }.bind(this),1000);
}
module.exports = Notes;

/*
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
*/