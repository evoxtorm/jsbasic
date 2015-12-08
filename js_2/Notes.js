function Notes () {
    this.notes = [];
}

Notes.prototype.addNote = function (note) {
    this.notes.push(note);
}

Notes.prototype.getNoteByIndex = function (index) {
    if(index >= this.notes.length || index < 0)
            return;
    return this.notes[index];
}

Notes.prototype.getLength = function () {
    return this.notes.length;
}

Notes.prototype.deleteNote = function (note) {
    var index = this.notes.findIndex(function (element){
            return note === element;
    });
    if(index !== -1)
        this.notes.splice(index,1);
}


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