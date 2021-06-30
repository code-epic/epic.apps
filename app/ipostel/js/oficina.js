class Oficina{
    constructor(){}
    Crear(req){

    }
}

function ObtenerOficinas(){
    if (localStorage.getItem("Oficinas") == undefined ){
        var ofc = new Oficina();
        var apic = new ApiCore();
        apic.funcion = "ObtenerOficinas";
        var promesa =  CargarAPI({
            metodo : "POST",
            sURL: conn.URL + "crud",
            Objeto: ofc,
            valores :  apic.Obtener()
        });
    
        promesa.then(function (xhRequest) {
            json = xhRequest.responseText;
            localStorage.setItem("Oficinas", json);
        });
    }
}