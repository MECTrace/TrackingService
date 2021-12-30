var table = "";

$(document).ready(function(){
    table = $("#serverside-datatable1").DataTable({

        "searching": false,
        "order": [
			[0, "desc"]
		],

        "columnDefs": [
			//{"targets": [7], "orderable": false}	
		],

        "initComplete": function () {
            this.api().columns().every( function () {
                var column = this;

                if(column[0][0] == 0) return "&nbsp";
				if(column[0][0] == 1) return "&nbsp";
            } );
        },
        "createdRow": function (row, data, index){
			$("td", row).eq(0).attr("pk", data[0]);
		}
    });
    
});