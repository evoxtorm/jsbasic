function Notes() {
    this.notes = [];
}

var _id = 0;

Notes.prototype.gettingNotes = function(cb) {
    setTimeout(function() {
        cb(this.notes);
    }.bind(this), 1000);
}

Notes.prototype.gettingNoteById = function(id, cb) {
    setTimeout(function() {
        var index = this.notes.findIndex(function(element) {
            return id === element.id;
        });
        var note = index === -1 ? undefined : this.notes[index];
        cb(note);
    }.bind(this), 1000);
}

Notes.prototype.updateNote = function(note, cb) {
    setTimeout(function() {
        var index = this.notes.findIndex(function(element) {
            return note.id === element.id;
        });
        if(index !== -1) {
            this.notes[index].content = note.content;
        }
        cb();
    }.bind(this), 1000);
}

Notes.prototype.addNote = function(userInput, cb) {
    setTimeout(function() {
        var note = {
            id:_id++,
            content: userInput
        }
        this.notes.push(note);
        cb(note);
    }.bind(this), 1000);
}

Notes.prototype.deleteNoteById = function(id, cb) {
    setTimeout(function() {
        var index = this.notes.findIndex(function(element) {
            return id === element.id;
        });
        var note = undefined;
        if(index !== -1) {
            note = this.notes.splice(index, 1);
        }
        cb(note);
    }.bind(this), 1000);
}

module.exports = Notes;