class Envio{
    constructor(){}
}

function ListarTiposEnvio(){
    var env = new Envio();
    var apic = new ApiCore();
    apic.funcion = "ObtenerEnvios";
    var promesa =  CargarAPI({
        metodo : "POST",
        sURL: conn.URL + "crud",
        Objeto: env,
        valores :  apic.Obtener()
    });

    promesa.then(function (xhRequest) {
        var json = JSON.parse( xhRequest.responseText );
        var cnt  = json.length;
        $("#cmbTipo").html("");
        for(var i=0; i < cnt; i++){
            var env = json[i]
            $("#cmbTipo").append(`<option value='${env.Cod_Envio}'>${env.Descripcion}</option>` );
        }
    });
}

