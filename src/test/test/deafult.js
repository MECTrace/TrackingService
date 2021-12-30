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
    
    $('#serverside-datatable1 tbody')
    .on( 'mouseenter', 'td', function () {
        try{
            var colIdx = table.cell(this).index().column;

            $( table.cells().nodes() ).removeClass( 'active' );
            $( table.column( colIdx ).nodes() ).addClass( 'active' );
        }catch(e){
        
        }
    } );

    $('#serverside-datatable1 tbody').on( 'click', 'tr', function () {
        if(!$(this).hasClass("dataTables_empty")){
        }
    });
});