
var treeData;

var jsonData;

function loadDataFormat() { 
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			var selectbox = document.getElementById("dataformat-selectbox");
			var dataFormat = response["result"];
			
			for (var i = 0; i < dataFormat.length; i++) {
				var option = document.createElement("option");
				option.text = dataFormat[i]["codeName"];
				option.value = dataFormat[i]["codeName"];
				selectbox.options.add(option);
			}
		}
	};

	xhttp.open("GET", loadUri + "/dataformat"); 
	xhttp.send();
}


function fileDetail(data) {
	
	var dataIdText = document.getElementById("dataIdText");
	var metaData = document.getElementById("metaData");
	var dataId = document.getElementById("dataId");
	var timestamp = document.getElementById("timestamp");
	var dataFormat = document.getElementById("dataFormat");
	var deviceId = document.getElementById("deviceId");
	
	
	dataIdText.value = data["dataId"];
	metaData.innerHTML = data["metaData"];
	dataId.innerHTML = data["dataId"];
	timestamp.innerHTML = data["timestamp"];
	dataFormat.innerHTML = data["dataFormat"];
	deviceId.innerHTML = data["deviceId"];
	
	treeData = JSON.parse(data["tree"]);
	jsonData = JSON.parse(data["treeForce"]);
	
	console.log(JSON.parse(data["treeForce"]));
	viewTree();
	force();
	
	
}

function upload() {
	var xhttp = new XMLHttpRequest();
	const fd = new FormData();
	const selectedFile = document.getElementById('uploadFile').files[0];
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			fileDetail(response);
			document.getElementById("data-info").style.display="block";
			document.getElementById("tree-div").style.display="block";
		}
	};
	 
	xhttp.open("POST", loadUri + "/upload");
	fd.append('file', selectedFile);
	
	xhttp.send(fd);
}

function listReset(element) {
	var tableRows = element.getElementsByTagName("tr");
	var rowCount = tableRows.length;

	for (var x = rowCount - 1; x >= 1; x--) {
		element.deleteRow(1);
	}
}

function searchResult(data) {
	let length = data["total"];
	let result = data["result"];
	
	var table = document.getElementById("condition-search-result-table");
	listReset(table);
	for (var i = 0; i < length; i++) {
		var elementList = table.insertRow();
		var cell = elementList.insertCell();
		
		cell.innerHTML = result[i].dataId;

		cell = elementList.insertCell();
		cell.innerHTML = result[i].receivedTime;
		//cell.align = "left";

		cell = elementList.insertCell();
		cell.innerHTML = result[i].dataFormat;
		cell.align = "center";
		
		cell = elementList.insertCell();
		cell.innerHTML = result[i].fromId;
		cell.align = "center";
		
		cell = elementList.insertCell();
		cell.innerHTML = "RSU-v1.23";
		cell.align = "center";
		
		cell = elementList.insertCell();
		cell.innerHTML = "<button href='#' type='button'>상세보기</button>";;
		cell.align = "center";
		
		cell = elementList.insertCell();
		cell.innerHTML = "<button href='#' type='button'>다운로드</button>";;
		cell.align = "center";
		
	}
		
}

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function conditionalSearch() {
	
	
	var formData = $("#search-form");
	$.ajax({
		url: loadUri + "/condition/search",
		type:"POST",
		contentType: "application/json",
		data:JSON.stringify(getFormData(formData)),
		success:function(data){
			//console.log(data);
			searchResult(data);
		},
		error: function(xhr, status, error) {
			console.log(error);
		}
	
	});
}

$(window).on("load", function () {
	
    
    if(window.location.href.indexOf("index") > -1)
    {
         $("#sidebar-nav-container li#index").addClass("selected");
    }
    else if(window.location.href.indexOf("search") > -1)
    {
         $("#sidebar-nav-container li#search").addClass("selected");
    }
    else {
    	 $("#sidebar-nav-container li#index").addClass("selected");
    }
     

});


function dateToString(date){ 
	
	var year = parseInt(date/ 10000);
	var tmp = date % 10000;
	var month = parseInt(tmp / 100);
	var days = tmp % 100;
	if(month < 10)
		month = "0" +  month;
	if(days < 10)
		days = "0" +  days;
	
	return  year + "." + month + "." + days+".";
	
}

function dateToStringDetail(mills){ 
	var date = new Date(mills);
	
	
	return  date.customFormat("#YYYY#.#MM#.#DD# #hhhh#:#mm#");
	
}

Date.prototype.customFormat = function(formatString){
	  var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
	  YY = ((YYYY=this.getFullYear())+"").slice(-2);
	  MM = (M=this.getMonth()+1)<10?('0'+M):M;
	  MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
	  DD = (D=this.getDate())<10?('0'+D):D;
	  DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
	  th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
	  formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
	  h=(hhh=this.getHours());
	  if (h==0) h=24;
	  if (h>12) h-=12;
	  hh = h<10?('0'+h):h;
	  hhhh = hhh<10?('0'+hhh):hhh;
	  AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
	  mm=(m=this.getMinutes())<10?('0'+m):m;
	  ss=(s=this.getSeconds())<10?('0'+s):s;
	  return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
	};