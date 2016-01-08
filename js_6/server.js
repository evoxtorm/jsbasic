var express = require('express');
var bodyParser = require('body-parser');
var Notes = require('./Notes');
var notes = new Notes();

var app = express();

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    res.send('Notes API is running');
});

// read a list of notes
app.get('/notes', function(req, res) { 
    notes.gettingNotes(function(allNotes) {
        res.json(allNotes);
    });   
});

// read a single note
app.get('/notes/:id', function(req, res) {
    notes.gettingNoteById(parseInt(req.params.id), function(note) {     
        if(note !== undefined) {
            res.json(note);
        }
    });   
});

// create a single note
app.post('/notes', function(req, res) {
    //var note = createNote(req);
    notes.addNote(req.body.content, function(note) {
        res.json(note);
    });   
});

// update an existing note
app.put('/notes/:id', function(req, res) {
    var note = createNote(req);
    notes.updateNote(note, function() {
        res.json(note);  
    });  
});

// delete existing note
app.delete('/notes/:id', function(req, res) {
    notes.deleteNoteById(parseInt(req.params.id), function(note) {
        if(note !== undefined) {
            res.json(note);
        }
    });   
});

app.listen(8080);
console.log('8080 running');

function createNote(req) {
    var note = {
        id:parseInt(req.body.id),
        content:req.body.content
    };
    return note;
}

