//document.write('<script src='Notes.js'></script>'); 
var notes = new Notes();

function add(){
	var newText=document.getElementById('addname').value.trim();
	if(newText==='')return;
	notes.notes.push(newText);
	addItem(newText);
}

function search(){
    document.getElementById('list').innerHTML='';		//clean all the data in list 
	var newText=document.getElementById('searchname').value.trim();	
	
	for(var index=0;index<notes.notes.length;index++){
		var note=notes.notes[index];
		if(newText==='')
			addItem(note);
		else{
			var reg=new RegExp(newText,'i');
			if(reg.test(note))
				addItem(note);
		}			 
	}		   
}

function addItem(text){			
	document.getElementById('list').appendChild(notes.createNote(text));
}

 