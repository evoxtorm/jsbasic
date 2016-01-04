$(document).ready(function() {

    
    var Note = Backbone.Model.extend({
        url: '/notes',
        default: {
            content: ''
        }
    });

    var Notes = Backbone.Collection.extend({
        model: Note,
        url: '/notes'  
    });

    var newNote = new Note({content: 'lol'});
    console.log(newNote.get('content'));
    
    newNote.save({'id' : 1}, {
        success: function() {
            console.log('success in model save');
        },
        error: function() {
            console.log('error in model save');
        }
    });

    var newNotes = new Notes();

    newNotes.fetch({
        success: function() {
            console.log('success in Collection fetch');
        },
        error: function() {
            console.log('error in Collection fetch');
        }
    });

    console.log('in notesAPP');

});




