var notes = new Notes();
var id_ = 0;

function add () {
    var newText = document.getElementById('addname').value.trim();
    if(newText === '')
        return;
    var note = {
        id:id_++,
        content:newText
    };
    console.log(id_);
    notes.addNote(note);
    addItem(note);
}

function search () {
    document.getElementById('list').innerHTML = '';		//clean all the data in list 
    var newText = document.getElementById('searchname').value.trim();	

    if(newText === ''){
        notes.getNotes().forEach(function (note) {
            addItem(note);
        })
    }
    else {
        var reg = new RegExp(newText,'i');
        notes.getNotes().forEach(function (note) {
            if(reg.test(note.content))
            addItem(note);
        })
    }
}

function addItem (note) {
    document.getElementById('list').appendChild(createNote(note));
}

function createNote (note) {
    var newList = document.createElement('li');
    var newContent = document.createTextNode(note.content);
    newList.appendChild(newContent);
  
    var newButton = document.createElement('button');
    var buttonName = document.createTextNode('Remove');
    newButton.appendChild(buttonName);
    newButton.onclick = function () {
        newList.parentNode.removeChild(newList);
        notes.deleteNote(note);
    };
    newList.appendChild(newButton);
    return newList;
}

