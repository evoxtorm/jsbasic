$(document).ready(function() {
   
    var Note = Backbone.Model.extend({
        defaults: {
            content: ''
        }
    });

    var NoteList = Backbone.Collection.extend({
        model: Note,
        url: '/notes'  
    });

    var Notes = new NoteList();

    var NoteView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#note-template').html()),
        events: {
            'click .delete-button': 'clearNote'
        },
        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        clearNote: function() {
            this.model.destroy();
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var NotesView = Backbone.View.extend({
        el: '#list',
        initialize: function() {
            this.listenTo(Notes, 'add', this.addNote);
        },
        addNote: function(note) {
            var view = new NoteView({model: note});
            this.$el.append(view.render().el);
        },
        addNotes: function() {
            Notes.each(this.addNote, this);
        }
    });

    var AppView = Backbone.View.extend({
        el: '#app',
        events: {
            'click #addButton':  'creatNote',
            'click #searchButton': 'search'
        },
        initialize: function() {
            this.addname = this.$('#addname');
            this.searchname = this.$('#searchname');
            this.list = this.$('#list');            
        },
        creatNote: function() {
            var userInput = this.addname.val().trim();
            if(userInput !== ''){
                Notes.create({content: userInput});
            }
            this.addname.val('');   
        }, 
        search: function() {
            this.list.empty();          
            var userInput = this.searchname.val().trim();
            if(userInput === '') {
                notesview.addNotes();
            } else {
                this.findNotesWithReg(userInput);            
            }
            this.searchname.val('');            
        },
        findNotesWithReg: function(userInput) {
            var reg = new RegExp(userInput, 'i');
            notesview.collection.each(function(note) {
                if(reg.test(note.get('content'))){
                    notesview.addNote(note);
                }
            }); 
        }
    });

    var notesview = new NotesView({collection: Notes});
    var appview = new AppView();
    Notes.fetch();

/*
    var AppView = Backbone.View.extend({
        el: '#app',
        events: {
            'click #addButton':  'creatNote',
            'click #searchButton': 'search'
        },
        initialize: function() {
            this.addname = this.$('#addname');
            this.list = this.$('#list');
            this.searchname = this.$('#searchname');
            this.listenTo(Notes, 'add', this.addNote);
            Notes.fetch();
        },       
        creatNote: function() {
            var userInput = this.addname.val().trim();
            if(userInput !== ''){
                Notes.create({content: userInput});
            }
            this.addname.val('');     
        },
        addNote: function(note) {
            var view = new NoteView({model: note});
            console.log(note);
            this.list.append(view.render().el);
        },
        search: function() {
            this.list.empty();
            var userInput = this.searchname.val().trim();
            if(userInput === '') {
                this.addNotes();
            } else {
                var reg = new RegExp(userInput, 'i');
                this.collection.each(function(note) {
                    if(reg.test(note.attributes.content)){
                        this.addNote(note);
                    }
                }, this);               
            }
            this.searchname.val('');
        },
        addNotes: function() {
            Notes.each(this.addNote, this);
        }
    });
    var appview = new AppView({collection: Notes});
    */
});



