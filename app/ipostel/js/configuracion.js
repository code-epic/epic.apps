

class Usuarios{
    constructor(){}
    Crear(){}
    Obtener(){}
}

class Servicios{
    constructor(){
        this.codigo = "";
        this.nombre = "";
        this.descripcion = "";
        this.estatus = false;
    }

    Crear(){

    }
    Obtener(){
        this.nombre = $("#txtnombre").val();
        this.descripcion = $("#txtdescripcion").val();
        this.estatus = $("#cmbestatus option:selected").val();
        return this;
    }
}

class Roles{
    constructor(){}
    Crear(){}
    Obtener(){}
}

function _mdlAgregarRoles(){
    $("#_mdlTitulo").html("Agregar Roles");
    $("#mdlGeneral").modal("show");
}


function _mdlAgregarServicio(){
    $("#_mdlTitulo").html("Agregar Servicio");
    $("#mdlGeneral").modal("show");
}


function SalvarServicio(){
    var srv = new Servicios();
    console.info(srv.Obtener());
    var opciones = {
        valores : srv.Obtener(),
        metodo : "POST",
        sUrl : "ruta",
        Objeto : srv
    }
    CargarAPI(opciones);

}

