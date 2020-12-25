$(document).ready(function(){

    if( sessionStorage.getItem("logged") ){
        window.location.href = '#home';
        return;
    }

    $(document).on('click','#btnLogin', function(e){
        e.preventDefault();
        $.ajax({
            data: { email: $("#page_login [name=email]").val(), password: $("#page_login [name=password]").val() },
            type: "POST",
            dataType: "json",
            url: "http://www.daft.cl/api/login",
            success: function(data, success){
                if( data.status == 'OK' ){
                    sessionStorage.setItem("logged", true);
                    sessionStorage.setItem("token", data.token);
                    location.href = '#home';
                } else {
                    alerta('Email o password incorrectos');
                }
            }
        })
    });

});