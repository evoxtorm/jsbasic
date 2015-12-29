var express = require('express');
//var bodyParser = require('body-parser');
var Notes = require('./Notes');
var notes = new Notes();
var id_ = 0;

//var router = express.Router();

var app = express();
/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
*/
app.get('/api', function(req, res) {
    res.send('Notes API is running');
});

// read a list of notes
app.get('/api/notes', function(req, res){ 
    var showAllNotes = '';  
    notes.gettingNotes(function(allNotes) {
        allNotes.forEach(function(note) {
            showAllNotes += ' ' + note.content;
        });
        res.send(showAllNotes);
    });   
});

// read a single note
app.get('/api/notes/:id', function(req, res){
    notes.gettingNotes(function(allNotes) {
        var index = allNotes.findIndex(function (element){
            return req.body === element.id;
        });
        if(index !== -1) {
            res.send(allNotes[index].content);
        }
    });   
});

// create a single note
app.post('/api/notes', function(req, res){
    var note = createNote(req.body);
    notes.addNote(note, function() {
        console.log('new note has been added: ' + req.body);
    });   
});

// update an existing note
app.put('/api/notes/:id', function(req, res){
    notes.updateNote(req.body, function() {
        console.log('updated');  
    });      
});

// delete existing note
app.delete('/api/notes/:id', function(req, res){
    notes.deleteNoteById(req.body, function() {
        console.log('deleted');
    });   
});

app.listen(8080);
console.log('8080 running');

function createNote(context) {
    var note = {
        id:id_++,
        content: context
    };
    return note;
}
