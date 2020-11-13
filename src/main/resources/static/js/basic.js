
var gPageNo = 1;
function loadDoc(registStatus) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			if (response.code != 0)
				return;
			var list;
			if (loadUri.indexOf('driverlicense') !== -1 || loadUri.indexOf('business') !== -1) {
				list = document.getElementById("driverLicenseList");
			}
			else {
				list = document.getElementById("smartkeyList");
			}

			showContent(response.result, response.limit, list, registStatus);

			showPageList(response, registStatus);
		}
	};

	xhttp.open("GET", loadUri + registStatus + "&page=1");
	// xhttp.setRequestHeader('Content-type', 'application/json');
	xhttp.send();
}

function pageListReset() {
	pageList = document.getElementById("pageNum");
	pageList.innerHTML = "";
}
function showPageList(response, type) {
	var numOfPage = response.totalpage;

	var pageList = document.getElementById("pageList");

	var currentPage = response.page;
	var prevPage = (response.page - 1 <= 0) ? 1 : (response.page - 1);
	var nextPage = (response.page + 1 > numOfPage) ? numOfPage
			: (response.page + 1);
	
	$( '.nav-container' ).width($( '.content-table' ).width());
	var pageList = document.getElementById("pageNum");
	pageList.innerHTML = "<li><a href='#' onclick=requestPage(1,'" + type + "')>≪</a></li>";
	pageList.innerHTML += "<li><a href='#' onclick=requestPage(" + prevPage + ",'" + type + "')>＜</a></li>";
	for (var i = 0; i < parseInt(numOfPage); i++) {
		pageList.innerHTML += "<li><a href='#' onclick=requestPage(" + (i + 1) + ",'" + type + "')>" + (i + 1) + "</a></li>";
	}

	pageList.innerHTML += "<li><a href='#' onclick=requestPage(" + nextPage + ",'" + type + "')>＞</a></li>";
	pageList.innerHTML += "<li><a href='#' onclick=requestPage(" + numOfPage + ",)>≫</a></li>";
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
	
	
	
}


function upload() {
	var xhttp = new XMLHttpRequest();
	const fd = new FormData();
	const selectedFile = document.getElementById('uploadFile').files[0];
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			fileDetail(response);
		}
	};
	
	
	

	xhttp.open("POST", loadUri + "/upload");
	fd.append('file', selectedFile);
	
	xhttp.send(fd);
}

function showContent(data, count, list, type) {
	var registerCount = (data.length < count) ? data.length : count;
	if (type == 'APPLY') {
		for (var i = 0; i < registerCount; i++) {
			var elementList = list.insertRow();
			var cell = elementList.insertCell();
			cell.innerHTML = data[i].regnumber;

			cell = elementList.insertCell();
			cell.innerHTML = data[i].name;
			cell.align = "left";

			cell = elementList.insertCell();
			cell.innerHTML = data[i].did;
			
											
			cell = elementList.insertCell();
			cell.innerHTML = "<button href='#' type='button' onclick=application(" + "'"
					+ data[i].regnumber + "')>자세히</button>";
	

			cell = elementList.insertCell();
			cell.innerHTML = "<button href='#' onclick=confirm(" + "'"
					+ data[i].regnumber + "'" + ",'Approve')>승인</button>";

			cell = elementList.insertCell();
			cell.innerHTML = "<button href='#' onclick=confirm(" + "'"
					+ data[i].regnumber + "'" + ",'Reject')>거부</button>";

		}
	} else {
		var tmp = document.getElementById("content-table");
		for (var i = 0; i < registerCount; i++) {
			var elementList = list.insertRow();
			var cell = elementList.insertCell();

			if(data[i].regdateDetail != null)
				cell.innerHTML = dateToStringDetail(data[i].regdateDetail);
			else cell.innerHTML = dateToStringDetail(data[i].approvaldateDetail);
			

			cell = elementList.insertCell();
			cell.innerHTML = data[i].regnumber;

			cell = elementList.insertCell();
			// cell.innerHTML = "<a href='#' onclick=selectedPost(" + data[i].id
			// + ");>" + data[i].title + "</a>";
			cell.innerHTML = data[i].name;
			cell.align = "left";

			cell = elementList.insertCell();
			cell.innerHTML = data[i].did;

			cell = elementList.insertCell();
			var status = data[i].status;
			switch(status) {
				case "Approve":
					status = "승인";
					break;
				case "Disposal":
					status = "폐기";
					break;
				case "Reject":
					status = "거부";
					break;
			}
			cell.innerHTML = status;
			
			if(tmp.rows[0].outerText.indexOf('발급') > -1){
			cell = elementList.insertCell();
				var imagesrc = '';
				if(data[i].download == 0) {
					imagesrc = 'image/caution.png';
				}
				else {
					imagesrc = 'image/confirm.png';
				}
				if(data[i].status == 'Disposal' || data[i].status == 'Reject') {
					imagesrc = 'image/reject.png';
				}
				cell.innerHTML = "<img src='" + imagesrc + "' width=40%/>"
				cell = elementList.insertCell();
				if(imagesrc.indexOf('confirm') != -1) {
					cell.innerHTML = "<button type='button' onclick=showCredential(" + "'"
							+ data[i].regnumber + "')>VC보기" +"</button>";
				}
				else {
					cell.innerHTML = "<button type='button' onclick=showCredential(" + "'"
					+ data[i].regnumber + "') disabled>VC보기" +"</button>";
					
				} 
				
				cell = elementList.insertCell();
				cell.innerHTML = "<button type='button' onclick=detail(" + "'"
						+ data[i].regnumber + "')>자세히</button>";
			}
			cell = elementList.insertCell();
			cell.innerHTML = "<button onclick=confirm(" + "'"
					+ data[i].regnumber + "'" + ",'Disposal')>폐기</button>";
			

		}
	}
}

function showCredential(regNumber) {
	document.getElementById("detail-regnumber").value = regNumber;
	openWin = window.open("credential.html",
            "detailForm", "width=600, height=600, resizable=no, scrollbars=no, toolbars=no, menubar=no");
}

function detail(regNumber) {
	
	var openWin;
	document.getElementById("detail-regnumber").value = regNumber;
	openWin = window.open("detail.html",
            "detailForm", "width=600, height=600, resizable=no, scrollbars=no, toolbars=no, menubar=no");

	

}

function application(regNumber) {
	
	var openWin;
	
	document.getElementById("parentRegnumber").value = regNumber;
	openWin = window.open("smartkeyApplication.html",
            "detailForm", "width=700, height=300, resizable=no, scrollbars=no, toolbars=no, menubar=no");



}

$(document).ready(function() {
	var includes = $('[data-include-html]');
    jQuery.each(includes, function(){
      var file = $(this).data('includeHtml');
      $(this).load(file);
    });
    
});

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


function confirm(regNumber, type) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// 무얼할지 적자 이건 왜 안뜰까
			var response = JSON.parse(this.responseText);
			if (response.code != 0)
				alert(response.message);
			requestPage(gPageNo, type);
		}
	};

	var data = new FormData();

	data.append('regnumber', regNumber);
	data.append('type', type);

	xhttp.open("POST", confirmUri, false);
	// xhttp.setRequestHeader('Content-type', 'application/json');

	xhttp.send(data);

}

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