$(document).ready(function(){

	$(document).on('focus','input,textarea,select', function(e){
		$(this).closest('.input-group').removeClass('error');
	})

	if( !checkNetConnection() ){
		alert("Esta Aplicacion necesita internet para funcionar");
		Website2APK.exitApp();
		return false;
	} 

	page = getPageName();
	loadPage(page);



	$("#btnLogout").click(function(e){
		e.preventDefault();
		logout();
	})

	$(document).on('click','div.alerta .btn', function(e){
		e.preventDefault();
		alerta('','hide');
	})

	$(document).on('click','.navbar-collapse a',function(e) {
	    $("#bodyClick").click();
	});
})





$(window).on('hashchange', function() {
	page = getPageName();
	loadPage(page);
});


function getPageName(){
	var str = window.location.hash;
	var page = str.replace("#", "");

	if( page == '' ){
		page = 'home';
	}

	if( !sessionStorage.getItem('logged') ){
		page = 'login';
	}

	return page;
}


function loadPage(page){
	$("script.custom_scripts").remove();
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "controllers/" + page + ".js";
	script.className = "custom_scripts";
	document.body.appendChild(script);

	$(".overlayer, .loading_spinner").show();

	if( page != "" ){
		
		if( page == 'login' ){
			$("nav").hide();
		} else {
			$("nav").show();
		}

		setTimeout(function(){ 
			if(sessionStorage.getItem('logged')){
				$( "#page_load" ).load( "pages/" + page + ".html" );
			} else {
				$( "#page_load" ).load( "pages/login.html" );
				window.location.hash = '#login';
			}

			$(".overlayer, .loading_spinner").fadeOut(500);
		}, 800);
	} else {
		$(".overlayer, .loading_spinner").fadeOut(500);
	}
}



function logout(){
	sessionStorage.clear();
	$('html').removeClass('nav-open');
	$(".navbar-toggler").removeClass('toggled');
	window.location.href = '#login';
}


function hasToken(){
	status = false;
	$.ajax({
        data: { 
        	token: sessionStorage.getItem('token')
        },
        type: "POST",
        dataType: "json",
        url: "http://www.daft.cl/api/check-token",
        success: function(data, success){
            if( data.status == 'OK' ){
                status = true;
            }
        }
    })

	return status;
	
}



function alerta(message="",method="open"){
	if( ( method == 'open' ) || ( method == 'show' ) ){
		$(".overlayer").fadeIn(500);
		$("div.alerta span").text(message);
		$("div.alerta").addClass('opened');

	} else {
		$(".overlayer").fadeOut(500);
		$("div.alerta").removeClass('opened');
	}
}




function confirma(message="",method="open"){
	if( ( method == 'open' ) || ( method == 'show' ) ){
		$(".overlayer").fadeIn(500);
		$("div.confirma span").text(message);
		$("div.confirma").addClass('opened');

	} else {
		$(".overlayer").fadeOut(500);
		$("div.confirma").removeClass('opened');
	}
}


function checkNetConnection(){
	r = Math.round(Math.random() * 10000);
	$.ajax({
        data: { 
        	param: r
        },
        type: "POST",
        dataType: "json",
        url: "http://www.daft.cl/api/check-net-conn",
        success: function(data, success){
            stat = true;
        }, 
        error: function(){
        	stat = false;
        },
        async: false
    })

	return stat;
}