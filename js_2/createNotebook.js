 
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
	
	for(var index = 0; index < notes.getLength(); index++){
		var note = notes.getNoteByIndex(index);
		console.log(notes.getNoteByIndex(index));
		if(newText === '')
			addItem(note);
		else{
			var reg = new RegExp(newText,'i');
			if(reg.test(note))
				addItem(note);
		}			 
	}		   
}

function addItem (text) {			
	document.getElementById('list').appendChild(createNote(text));
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
    };
    newList.appendChild(newButton);
    return newList;
}

 