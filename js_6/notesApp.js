$(document).ready(function() {

    
    var Note = Backbone.Model.extend({
        url: '/notes',
        default: {
            content: ''
        }
    });

    var NoteList = Backbone.Collection.extend({
        model: Note,
        url: '/notes'  
    });

    var Notes = new NoteList;


//template: _.template($('#note-template').html()),
    var NoteView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'click .deleteButton': 'clearOneNote'
        },
        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        clearOneNote: function() {
            this.model.destroy();
        }
    });

    var AddView = Backbone.View.extend({
        el: '#add',
        events: {
        "click #addButton":  "addOneNote"
        },
        addOneNote: function() {
            var userInput = $('#addname').val();
            console.log(userInput);
            Notes.create({content: userInput});
        }

    });

    var NotesView = Backbone.View.extend({
        el: '#list',

        initialize: function() {
            this.listenTo(Notes, 'add', this.render);
        },

        render: function() {
            console.log('in render');
        }
    });

    

    var av = new NoteView;
    //var nv = new NotesView;
});



