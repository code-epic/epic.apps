/**
 * Clase: Consignación en ventas
 * Referencia: inc/ventas/consignacion
 * Autor: Carlos Peña
 * Fecha: 27-11-2020
 * @gesaodin
 */
class Consignacion{
    constructor(){
        this.tipoenvio = '';
        this.peso = 0;
        this.tipo = '';
        this.tarifa = '';
        this.grupo = '';
        this.exonerar = '';
        this.serial = '';
        this.serialsunacrip = '';
        this.monto = 0;
        this.totaliva = 0;
        this.cobrado = 0;
        this.oficinaorigen = '';
        this.remitente = false;
        this.cedula = '';
        this.nombreapellido = '';
        this.direccion = '';
        this.telefono = '';
        this.correo = '';
        this.nombredestinatario = '';
        this.paisdestino = '';
        this.oficinadestino = '';
        this.direcciondestino = '';
        this.telefonodestino = '';
    }
    
    Obtener(){
        this.hora = $("#txtHora").val();
        this.fecha = $("#txtFecha").val();
        this.tipoenvio = $("#cmbTipoEnvio option:selected").val();
        this.serial = $("#txtSticker").val();
        this.oficinaorigen = $("#cmbOficinaOrigen option:selected").val();
        this.peso = $("#txtPeso").val();
        this.tarifa = $("#cmbTarifa option:selected").val();
        this.exonerado = $("#radExonerado").val();
        this.monto = $("#txtMonto").val();
        this.total = $("#txtTotal").val();
        this.cobrado = $("#txtCobrado").val();
        this.contado = $("#txtContado").val();
        this.credito = $("#txtCredito").val();
        this.cedula = $("#txtCedula").val();
        this.nombreremitente = $("#txtNombre").val();
        this.direccion = $("#txtDireccion").val();
        this.correo = $("#txtCorreo").val();
        this.nombredestinatario = $("#txtNombreDestinatario").val();
        this.pais = $("#txtPais").val();
        this.oficnadestino = $("#cmbOficinaDestino option:selected").val();
        this.direcciondestino = $("#txtDireccionDestino").val();
        this.telefonodestino = $("#txtTelefonoDestino").val();
        return this;
    }

    Crear(req){

    }
}


function ListarServiciosTipo(){
    if (localStorage.getItem("TipoServicios") == undefined ){
        var apic = new ApiCore();
        apic.funcion = "ListarTiposServicios";
        var promesa =  CargarAPI({
            metodo : "POST",
            sURL: conn.URL + "crud",
            valores :  apic.Obtener()
        });
       // console.log(apic);

        promesa.then(function (xhRequest) {
            json = xhRequest.responseText;
            localStorage.setItem("TipoServicios", json);
        });
    }
}

function seleccionarTarifasDestino(){
    var apic = new ApiCore();
    apic.funcion = "ObtenerTiposServicios";
    apic.parametros = $("#cmbTipoEnvio").val();
    var promesa =  CargarAPI({
        metodo : "POST",
        sURL: conn.URL + "crud",
        valores :  apic.Obtener()
    });
    promesa.then(function (xhRequest) {
        json = JSON.parse(xhRequest.responseText);
        var cnt = json.length;
        $("#cmbTarifa").html("<option value='-'>SELECCIONE</option>");
        for(var i=0; i < cnt; i++){
            var tari = json[i]
            $("#cmbTarifa").append(`<option value='${tari.de_Codigo}'>${tari.de_Descripcion}</option>` );
        }

    });
}

function ObtenerServiciosTipo(){

    var apic = new ApiCore();
    apic.funcion = "ObtenerTarifasDestino";
    apic.parametros =  $("#cmbTipoEnvio").val() + "," +  $("#cmbTarifa").val();
    var promesa =  CargarAPI({
        metodo : "POST",
        sURL: conn.URL + "crud",
        valores :  apic.Obtener()
    });

    promesa.then(function (xhRequest) {
        json = JSON.parse(xhRequest.responseText);
       
        console.log(json);
    });
}


