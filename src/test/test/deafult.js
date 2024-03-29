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
        if ( $(this).hasClass('active') ) { 
            $(this).removeClass('active');
        }

        else {
            table.$('tr.active').removeClass('active');
            $(this).addClass('active');

            var pk = $(this).find("td[pk]").attr("pk");
            $.show_modal(pk);
        }
    });

    $.extend({
    "show_modal": function(pk){

		//console.log(pk);	
        $.ajax({
            url: "/log/list/detail",
            dataType: "html",
            data: {idx: pk},
            type: "POST",
            success: function(content)
            {
                $("#default-modal .modal-content").html(content);
                $("#default-modal").modal();
                //$.getScript("/assets/js/revocation/misbehaviorReport_detail.js");
            },
            error: function(res)
            {
                console.log(res);
            }
        });
	}
});

});