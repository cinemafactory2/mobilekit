$(document).ready(function(){

	$(document).on('click','#btnSave', function(){

		err=0;
		$("[required]").each(function(){
			if( $(this).val() == ""){
				$(this).closest('.input-group').addClass('error');
				err++;
			}
		})

		if( err == 0 ){

			$(this).replaceWith('<button type="button" class="btn btn-success btn-link" id="btnEnviando">Enviando...</button>');

			if( hasToken() ){
				$.ajax({
		            data: { 
		            	fecha: $("#page_ingresar [name=fecha]").val(), 
		            	horas: $("#page_ingresar [name=horas]").val(),
		            	descripcion: $("#page_ingresar [name=descripcion]").val(),
		            	token: sessionStorage.getItem('token')
		            },
		            type: "POST",
		            dataType: "json",
		            url: "http://www.daft.cl/api/ingresar",
		            success: function(data, success){
		                if( data.status == 'OK' ){
		                	$("#page_ingresar form")[0].reset();
		                	$("#btnEnviando").replaceWith('<button type="button" class="btn btn-success" id="btnSave">Enviar</button>')
		                    alerta('Datos ingresados correctamente');
		                }
		            }
		        })
			} else {
				alerta('Token no válido');
			}
		}
	})

});