var obj = {};
init();
function init(){
	var xhReq = new XMLHttpRequest();
	 xhReq.open("GET", "http://pb-api.herokuapp.com/bars", false);
	 xhReq.send(null);
	 var serverResponse = JSON.parse(xhReq.responseText);
	 console.dir(serverResponse); 
	 obj.buttons = serverResponse.buttons;
	 obj.bars = serverResponse.bars;
	 obj.limit = serverResponse.limit;
	 addButtons(obj.buttons);
	 addBars(obj.bars, obj.limit);
}

function addButtons(buttons){
	var foo = document.getElementById("btnBarContainer");
	
	for(var i=0; i< buttons.length; i++){
		var element = document.createElement("input");
				
		element.type = "button";
        element.value = buttons[i];
		element.name = buttons[i]; 
		
		foo.appendChild(element);
		
		element.onclick = function() { 		
		move(this);
	  };
	}
}

function addBars(bars, limit){
		var zoo = document.getElementById("barContainer");	
		var progSel = document.getElementById("progressSel");		
		for(var j=0; j< bars.length; j++){
		var opt = document.createElement("option");
		opt.text = "#progress"+j;
		progSel.add(opt);			
		zoo.innerHTML += '<div id="progress" class="graph"><div class="bar" id="#progress'+j+'" name="bar" value="'+bars[j]+'" style="width:'+bars[j]+'%"><p data-value="'+bars[j]+'" id="#para'+j+'">'+bars[j]+'%</p></div></div>'
		}
}
function move(that) {
	var elem = document.getElementById("progressSel");
	var selId = elem.options[elem.selectedIndex].text;
	var selBar = document.getElementById(selId);
	var selPara = document.getElementById("#para"+selId.substr(selId.length-1));
	var pos = parseInt(that.value);
	var wid = (document.getElementById(selId).style.width).split('%')[0];
	var disLbl=parseInt(selPara.getAttribute("data-value"));
	pos+= Number(wid);
	var tWid;
	disLbl = tWid + parseInt(that.value);//+parseInt(that.value);
	console.log("disLbl "+disLbl)
	
	if(pos < 0){
		pos =0;
	}
	selPara.innerHTML = pos+'%';
	if(pos >100){
		//tWid = pos;
		//pos = 100;
		document.getElementById(selId).style.background = "red";
	}
	if(pos < 100){
		document.getElementById(selId).style.background = "orange";	
	}	
	
	document.getElementById(selId).style.width = (pos)+'%';   
    
}
