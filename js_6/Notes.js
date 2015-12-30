function Notes() {
    this.notes = [];
}

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
        cb(index);
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

Notes.prototype.addNote = function(note, cb) {
    setTimeout(function() {
        this.notes.push(note);
        cb();
    }.bind(this), 1000);
}

Notes.prototype.deleteNoteById = function(id, cb) {
    setTimeout(function() {
        var index = this.notes.findIndex(function(element) {
            return id === element.id;
        });
        if(index !== -1) {
            this.notes.splice(index, 1);
        }
        cb();
    }.bind(this), 1000);
}

module.exports = Notes;