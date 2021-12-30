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
            } );
        },
    });
});