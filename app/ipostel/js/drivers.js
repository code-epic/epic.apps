/*!
* ESBEpicTechnologies v1.0.0 (https://esbepictechnologies.io)
* Copyright 2020-2021 CodeEpicTechnologies <http://codeepictechnologies.com>
* Licensed under MIT (https://github.com/gesaodin/esbepic/blob/master/LICENSE)
*/
class ESBDrivers{
        /** 	driver : string;
        host : string;
        puerto : string;
        usuario : string;
        clave : string;
        basedatos : string;
        url : string;
        descripcion : string;
        id : string;
     **/
    constructor (){
        this.driver = "";
        this.host = "";
        this.puerto = "";
        this.usuario = "";
        this.clave = "";
        this.basedatos = "";
        this.url = "";
        this.descripcion = "";
        this.id = "";

    }
        
    //Función permite obtener los datos del formulario
    Obtener(){
        this.driver = $("#txtDriver").val();
        this.host = $("#txtHost").val();
        this.puerto = $("#txtPuerto").val();
        this.usuario = $("#txtUsuario").val();
        this.clave = $("#txtClave").val();
        this.basedatos = $("#txtBaseDatos").val();
        this.url = $("#txtUrl").val();
        this.descripcion = $("#txtDescripcion").val();
        this.id = $("#txtId").val();

        return this;
    }
    
    //Cargar un documento mediante API de conexion
    Cargar(req){
        var apic = new ApiCore();
        apic.funcion = "CESBDrivers";
        var promesa =  CargarAPI({
            metodo : "POST",
            sURL: conn.URL + "crud",
            valores :  apic.Obtener()
        });
    
        promesa.then(function (xhRequest) {
            json = xhRequest.responseText;
            
        });

    }
    
    //Salvar documento mediante API de conexion
    Salvar(){
        var obj = this.Obtener();
        var apic = new ApiCore();
        apic.funcion = "SESBDrivers";
        apic.valores = obj;
        var promesa =  CargarAPI({
            metodo : "POST",
            sURL: conn.URL + "crud",
            valores :  apic.Obtener()
        });
    
        promesa.then(function (xhRequest) {
            json = xhRequest.responseText;
            
        });
    }

     //Listar documento mediante API de conexion
    async Listar(){
        var jsonG = {};
        var apic = new ApiCore();
        apic.funcion = "ListarDrivers";
        var promesa = await CargarAPI({
            metodo : "POST",
            sURL: conn.URL + "crud",
            valores :  apic.Obtener()
        }).then(function (xhRequest) {
            jsonG = JSON.parse(xhRequest.responseText);
        });
        return jsonG;
    }
   
};

let Drivers = new  ESBDrivers();

