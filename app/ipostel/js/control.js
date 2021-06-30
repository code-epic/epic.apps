

class Inventario{
    constructor(){}

    Crear(){}
    Obtener(){}
}


function _mdlDevolucion(){
    $("#_mdlTitulo").html("Devolucion");
    $("#mdlGeneral").modal("show");
}

class Correlativos{
    constructor(){
        this.certificadonacional = "";
        this.certificadointernacional = "";
        this.bultonacional = "";
        this.bultointernacional = "";
        this.monto = "";
        this.total = "";
        this.cobrado = "";

    }
    Crear(req){}
    Obtener(){
        this.certificadonacional = $("#txtCertificadoNacional").val();
        this.certificadointernacional = $("#txtCertificadoInternacional").val();
        this.bultonacional = $("#txtBultoNacional").val();
        this.bultointernacional = $("#txtBultoInternacional").val();
        this.monto = $("#txtMonto").val();
        this.total = $("#txtTotal").val();
        this.cobrado = $("#txtCobrado").val();
        
    
        return this;
    }
}

class InfoOficina{
    constructor(){
        this.codigo = "";
        this.nombreoficina = "";
        this.telefono = "";
        this.codigopostal = "";
        this.jefeoficina = "";
        this.fax = "";
        this.tipoimpuesto = "";
        this.destino = "";

    }
    Crear(req){}
    Obtener(){
        this.codigo = $("#txtCodigo").val();
        this.nombreoficina = $("#txtNombreOficina").val();
        this.telefono = $("#txtTelefono").val();
        this.codigopostal = $("#txtCodigoPostal").val();
        this.jefeoficina = $("#txtJefeOficina").val();
        this.fax = $("#txtFax").val();
        this.tipoimpuesto = $("#cmbTipoImpuesto option:selected").val();
        this.destino = $("#txtDireccionDestino").val();
        
    
        return this;
    }
}

class Reportes{
    constructor(){
        this.controlingreso = "";
        this.controldesde = "";
        this.controlhasta = "";
        this.inventario = "";
        this.inventariodesde = "";
        this.inventariohasta = "";
        this.ventas = "";
        this.ventasdesde = "";
        this.ventashasta = "";
        this.otros = "";
        this.otrosdesde = "";
        this.otroshasta = "";

    }
    Crear(req){}
    Obtener(){
        this.controlingreso = $("#cmbInventario option:selected").val();
        this.controldesde = $("#txtControlDesde").val();
        this.controlhasta = $("#txtControlHasta").val();
        this.inventario = $("#cmbInventario option:selected").val();
        this.inventariodesde = $("#txtInventarioDesde").val();
        this.inventariohasta = $("#txtInventarioHasta").val();
        this.ventas = $("#cmbVentas option:selected").val();
        this.ventasdesde = $("#txtVentasDesde").val();
        this.ventashasta = $("#txtVentasHasta").val();
        this.otros = $("#cmbVentas option:selected").val();
        this.otrosdesde = $("#txtOtrosDesde").val();
        this.otroshasta = $("#txtOtrosHasta").val();
    
        return this;
    }
}

class Semanas{
    constructor(){
        this.desdehasta = "";
        
    }
    Crear(req){}
    Obtener(){
        this.desdehasta = $("#txtDesdeHasta").val();
    
        return this;
    }
}

class Tarifas{
    constructor(){
        this.tarifaspostales = "";
        this.tarifastelegraficas = "";
        this.otrastarifas = "";
        
    }
    Crear(req){}
    Obtener(){
        this.tarifaspostales = $("#cmbTarifasPostales option:selected").val();
        this.tarifastelegraficas = $("#cmbTarifasTelegraficas option:selected").val();
        this.otrastarifas = $("#cmbOtrasTarifas option:selected").val();
    
        return this;
    }
}
class Usuarios{
    constructor(){
        this.cedula = "";
        this.nombre = "";
        this.apeliido = "";
        this.usuario = "";
        this.contraseña = "";
        this.confirmarcontraseña = "";
        this.rol = "";
        this.opt = "";
        this.telefono = "";
        this.correo = "";
        
    }
    Crear(req){}
    Obtener(){
        this.cedula = $("#txtCedula").val();
        this.nombre = $("#txtNombre").val();
        this.apeliido = $("#txtApellido").val();
        this.usuario = $("#txtUsuario").val();
        this.contraseña = $("#txtContraseña").val();
        this.confirmarcontraseña = $("#txtConfirmarContraseña").val();
        this.rol = $("#cmbRol option:selected").val();
        this.opt = $("#cmbOpt option:selected").val();
        this.telefono = $("#txtTelefono").val();
        this.correo = $("#txtCorreo").val();
    
        return this;
    }
}