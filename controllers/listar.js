$(document).ready(function(){

	if( hasToken() ){

		setTimeout(function(){
			ht = "";
			$.ajax({
	            data: { 
	            	token: sessionStorage.getItem('token')
	            },
	            type: "POST",
	            dataType: "json",
	            url: "http://www.daft.cl/api/listar",
	            success: function(data, success){
	                if( data.status == 'OK' ){
	                	$.each(data.collection,function(k){
	                		ht += '<tr id="tr_' + data.collection[k].id + '">' + 
	    					' <td> ' + data.collection[k].id + ' </td> ' + 
	    					' <td> ' + data.collection[k].fecha + ' </td> ' + 
	    					' <td> ' + data.collection[k].horas + ' </td> ' + 
	    					' <td> ' + data.collection[k].descripcion + ' </td> ' + 
	    					' <td> <a href="#" data-id="' + data.collection[k].id + '" class="btnDelete"><i class="fa fa-times"></i><a> </td> ' + 
	    					'</tr> ';
	                	})

	                	$("#table_collection tbody").html(ht)
	                }
	            }
	        })
        },1200);
	} else {
		alerta('Token no válido');
	}	


	$(document).on('click','.btnDelete', function(e){
		e.preventDefault();
		id = $(this).data('id');
		confirma('¿Desea eliminar el registro seleccionado?');

		$(document).on('click','.confirma .btn_false', function(e){	
			confirma('','close');
		})

		$(document).on('click','.confirma .btn_true', function(e){
			if( eliminar(id) ){
				$(".loading_spinner").hide();
				$("tr#tr_" + id).fadeOut();
				confirma('','close');
            	alerta('Registro eliminado correctamente');	
			}
		})
	})

});


function eliminar(id){
	if( hasToken() ){
		$.ajax({
            data: { 
            	id: id,
            	token: sessionStorage.getItem('token')
            },
            type: "POST",
            dataType: "json",
            url: "http://www.daft.cl/api/eliminar",
            beforeSend: function(){
            	$(".overlayer, .loading_spinner").show();
            },
            success: function(data, success){
                if( data.status == 'OK' ){
                	stat = true;
                } else {
                	stat = false;
                }
            },
            async: false
        })
	}

	return stat;
}

