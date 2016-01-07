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
            console.log('in clearOneNote');
            this.model.destroy();
        },
        render: function() {
            console.log('note view render');
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
            this.listenTo(Notes, 'add', this.addOneNote);
            Notes.fetch({reset: true});
        },       
        creatNote: function() {
            var userInput = $('#addname').val().trim();
            if(userInput !== ''){
                Notes.create({content: userInput});
            }      
        },
        addOneNote: function(note) {
            console.log('in add one');
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
                console.log('in else');
                var reg = new RegExp(userInput, 'i');
                this.collection.models.forEach(function(note) {
                    console.log(note.attributes.content);
                    if(reg.test(note.attributes.content)){
                        console.log('match');
                        console.log(note.attributes);
                        this.addOneNote(note);
                    }
                });               
            }
        },
        addAllNotes: function() {
            Notes.each(this.addOneNote, this);
        }
    });

    var nsv = new AppView({collection: Notes});

});



