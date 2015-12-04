function Notes(){
	
    this.notes=[];
    this.createNote = function(note){

        var newList=document.createElement('li');
        var newContent=document.createTextNode(note);
        newList.appendChild(newContent);
  
        var newButton=document.createElement('button');
        var buttonName=document.createTextNode('Remove');
		newButton.appendChild(buttonName);	  
        newButton.onclick=function(){ 
          //how to remove the newList
          newList.parentNode.removeChild(newList);
        };
        newList.appendChild(newButton);
        return newList;
    }
}