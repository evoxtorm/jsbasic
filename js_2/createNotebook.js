var notes = new Notes();


function add () {
    var newText = document.getElementById('addname').value.trim();
    if(newText === '')
        return;
    notes.addNote(newText);
    addItem(newText);
}

function search () {
    document.getElementById('list').innerHTML = '';		//clean all the data in list 
    var newText = document.getElementById('searchname').value.trim();	

    if(newText === ''){
        notes.notes.forEach(function (element) {
            addItem(element);
        })
    }
    else {
        var reg = new RegExp(newText,'i');
        notes.notes.forEach(function (element) {
            if(reg.test(element))
            addItem(element);
        })
    }
}

function addItem (note) {
    document.getElementById('list').appendChild(createNote(note));
}

function createNote (note) {
    var newList = document.createElement('li');
    var newContent = document.createTextNode(note);
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

