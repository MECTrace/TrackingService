
var treeData;

var jsonData;
var jsonData2;

var isTracking = true;

var test_count=0;

function loadDataId() {
	temp = location.href.split("?");
	if(temp[1] != undefined) {
		data=temp[1].split("=");
	
		dataId = data[1];
		loadDataDetail(dataId);
	}
}

function loadDataDetail(dataId) { 
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			fileDetail(response);
			document.getElementById("data-info").style.display="block";
			
		}
	};

	xhttp.open("GET", loadUri + "/search/" + dataId); 
	xhttp.send();
}



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


function conditionalTracking() {
	
	var conditionSearchResultTable = document.getElementById("condition-search-result-table");
	var forceDiv = document.getElementById("force-div");
	
	conditionSearchResultTable.style.display="none";
	forceDiv.style.display="block";
	
	force();
	
	
}

function tracking() {
	
	var treeDiv = document.getElementById("tree-div");
	var forceDiv = document.getElementById("force-div");
	var trackingBtn = document.getElementById("tracking-btn");
	 
	document.getElementById("data-info").style.display="none";
	if(isTracking) {
		treeDiv.style.display="block";
		forceDiv.style.display="none";
		trackingBtn.innerHTML="Visualization";
		isTracking=false;
		
	}
	else {
		treeDiv.style.display="none";
		forceDiv.style.display="block";
		trackingBtn.innerHTML="Tracking";
		
		
		isTracking=true;
	}
	
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
	jsonData2 = JSON.parse(data["treeForce"]);
	
	//console.log(JSON.parse(data["treeForce"]));
	
	
	viewTree();
	
	
	force();
	
	
}

function sleep (delay) {
	   var start = new Date().getTime();
	   while (new Date().getTime() < start + delay);
}


var count = 0;
var start_clock;
var end_clock;
var avg_clock = 0;

function upload() {
	
	start_clock = new Date().getTime();
	var xhttp = new XMLHttpRequest();
	const fd = new FormData();
	const selectedFile = document.getElementById('uploadFile').files[0];
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			fileDetail(response);
			document.getElementById("data-info").style.display="block";
			/*
			count++;
			end_clock = new Date().getTime();
			avg_clock += (end_clock - start_clock);
			
			console.log("count : " + count + " upload time : " + (end_clock - start_clock));
			console.log("count : " + count + " avg  time : " + (avg_clock / count));
			
			if(count < 100) {
				upload();
			}
			*/
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
	
	var forceDiv = document.getElementById('force-div');
	var conditionResultTable = document.getElementById('condition-search-result-table');
	
	forceDiv.style.display="none";
	conditionResultTable.style.display="block";
	
	let length = data["total"];
	let result = data["result"];
	
	tableResult = result;
	
	
	
	var table = document.getElementById("condition-search-result-table");
	listReset(table);

	
	
	for (var curr of result) {
		var elementList = table.insertRow();
		var cell = elementList.insertCell(-1);
		
		cell.innerHTML = curr.dataId;

		cell = elementList.insertCell(-1);
		cell.innerHTML = curr.receivedTime;
		//cell.align = "left";

		cell = elementList.insertCell(-1);
		cell.innerHTML = curr.dataFormat;
		cell.align = "center";
		
		cell = elementList.insertCell(-1);
		cell.innerHTML = curr.fromId;
		cell.align = "center";
		
		cell = elementList.insertCell(-1);
		cell.innerHTML = curr.toId;
		cell.align = "center";
		
		cell = elementList.insertCell(-1);
		cell.innerHTML = "<button type='button' onclick=detailDataId('"+curr.dataId +"')>상세보기</button>";
		cell.align = "center";
		
		cell = elementList.insertCell(-1);
		cell.innerHTML = "<button href='#' type='button'>다운로드</button>";
		cell.align = "center";
		
	}
	
	
	
	/*
	result.forEach((function(curr){ 
		var elementList = table.insertRow();
		var cell = elementList.insertCell(-1);
		
		cell.innerHTML = curr.dataId;

		cell = elementList.insertCell(-1);
		cell.innerHTML = curr.receivedTime;
		//cell.align = "left";

		cell = elementList.insertCell(-1);
		cell.innerHTML = curr.dataFormat;
		//cell.align = "center";
		
		cell = elementList.insertCell(-1);
		cell.innerHTML = curr.fromId;
		//cell.align = "center";
		
		cell = elementList.insertCell(-1);
		cell.innerHTML = curr.toId;
		//cell.align = "center";
		
		cell = elementList.insertCell(-1);
		cell.innerHTML = "<button type='button' onclick=detailDataId('"+curr.dataId +"')>상세보기</button>";
		//cell.align = "center";
		
		cell = elementList.insertCell(-1);
		cell.innerHTML = "<button href='#' type='button'>다운로드</button>";
		//cell.align = "center";
		}));
	
	for (var i = 0; i < length; i++) {
		var elementList = table.insertRow();
		var cell = elementList.insertCell(-1);
		
		cell.innerHTML = result[i].dataId;

		cell = elementList.insertCell(-1);
		cell.innerHTML = result[i].receivedTime;
		//cell.align = "left";

		cell = elementList.insertCell(-1);
		cell.innerHTML = result[i].dataFormat;
		cell.align = "center";
		
		cell = elementList.insertCell(-1);
		cell.innerHTML = result[i].fromId;
		cell.align = "center";
		
		cell = elementList.insertCell(-1);
		cell.innerHTML = result[i].toId;
		cell.align = "center";
		
		cell = elementList.insertCell(-1);
		cell.innerHTML = "<button type='button' onclick=detailDataId('"+result[i].dataId +"')>상세보기</button>";
		cell.align = "center";
		
		cell = elementList.insertCell(-1);
		cell.innerHTML = "<button href='#' type='button'>다운로드</button>";
		cell.align = "center";
		
	}
	*/
		
	
}

function detailDataId(dataid) {
	var pageURI = '/index.html?dataid=';
	if(opener) {
		opener.location.href= pageURI + dataid;
	}
	else {
		
		location.href= pageURI + dataid;
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

var test_start;


function conditionalSearch() {
	
	/*
	var forceDiv = document.getElementById('force-div');
	var conditionResultTable = document.getElementById('condition-search-result-table');
	
	forceDiv.style.display="none";
	conditionResultTable.style.display="block";
	*/
	
	test_start = new Date().getTime();
	var formData = $("#search-form");
	$.ajax({
		url: loadUri + "/condition/search",
		type:"POST",
		contentType: "application/json",
		data:JSON.stringify(getFormData(formData)),
		success:function(data){
			//console.log(data);
			let test_end = new Date().getTime();
			
			console.log("success 시간 : " + (test_end - test_start));
			
			test_start = test_end;
			searchResult(data);
			jsonData2 = JSON.parse(data["tree"]);
			
			test_end = new Date().getTime();
			console.log("실행시간 : " + (test_end - test_start));
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