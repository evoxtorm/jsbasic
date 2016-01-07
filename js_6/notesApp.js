$(document).ready(function() {
   
    var Note = Backbone.Model.extend({
        default: {
            content: ''
        }
    });

    var NoteList = Backbone.Collection.extend({
        model: Note,
        url: '/notes'  
    });

    var Notes = new NoteList;

    var NoteView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#note-template').html()),
        events: {
            'click .deleteButton': 'clearOneNote'
        },
        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        clearOneNote: function() {
            this.model.destroy();
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });


    var AppView = Backbone.View.extend({
        el: '#app',
        events: {
            'click #addButton':  'creatNote',
            'click #searchButton': 'search'
        },
        initialize: function() {
            this.listenTo(Notes, 'add', this.showAllNotes);
            Notes.fetch({reset: true});
        },       
        creatNote: function() {
            var userInput = $('#addname').val().trim();
            if(userInput !== ''){
                Notes.create({content: userInput});
            }
            $('#addname').val('');     
        },
        addOneNote: function(note) {
            var view = new NoteView({model: note});
            $('#list').append(view.render().el);
        },
        search: function() {
            $('#list').empty();
            var userInput = $('#searchname').val().trim();
            if(userInput === '') {
                this.addAllNotes();
            }
            else {
                var reg = new RegExp(userInput, 'i');
                this.collection.each(function(note) {
                    if(reg.test(note.attributes.content)){
                        this.addOneNote(note);
                    }
                }, this);               
            }
            $('#searchname').val('');
        },
        addAllNotes: function() {
            Notes.each(this.addOneNote, this);
        },
        showAllNotes: function() {
            $('#list').empty();
            this.addAllNotes();
        }
    });

    var appview = new AppView({collection: Notes});

});



