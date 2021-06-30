
/**
 * Realizado por: Maikol Echenique 
 * Fecha: 16-11-2020 
 * Titulo: Creación de clases Módulo Tracking
 */
/**
 * Clase Seguimiento
 * Hereda de inc/tracking/seguimiento.html
 */

class Seguimiento{
    constructor(){
        this.hora = "";
        this.fecha = "";
        this.sticker = "";
        this.destinatario = "";
        this.remitente = "";
        this.peso = "";
        this.estatus = "";
        this.observacion = "";

    }
    Crear(req){}
    Obtener(){
        this.hora = $("#txtHora").val();
        this.fecha = $("#txtFecha").val();
        this.sticker = $("#txtsticker").val();
        this.destinatario = $("#txtDestinatario").val();
        this.remitente = $("#txtRemitente").val();
        this.peso = $("#txtPeso").val();
        this.estatus = $("#cmbEstatus option:selected").val();
        this.observacion = $("#txtObservacion").val();
        
    
        return this;
    }
}

function BuscarPaquete(){

}

/**
 * Clase Distribución
 * Hereda de inc/tracking/distribucion.html
 */
class Distribucion{
    constructor(){
        this.hora = "";
        this.fecha = "";
        this.sticker = "";
        this.destinatario = "";
        this.remitente = "";
        this.peso = "";
        this.estatus = "";
        this.observacion = "";
    
    }
        Crear(req){}
        Obtener(){
        this.hora = $("#txtHora").val();
        this.fecha = $("#txtFecha").val();
        this.sticker = $("#txtSticker").val();
        this.destinatario = $("#txtDestinatario").val();
        this.remitente = $("#txtRemitente").val();
        this.peso = $("#txtPeso").val();
        this.tipodistribucion = $("#cmbTipoDistibucion option:selected").val();
        this.observacion = $("#txtObservacion").val();
        
    
        return this;
    }

}
    
/**
 * Clase Ruta
 * Hereda de inc/tracking/def_rutamodal.html
 */
class Ruta{
    constructor(){
        this.localidad = "";
        this.zona = "";
        this.ruta = "";

    }
    Crear(req){}
    Obtener(){
    this.localidad = $("#txtLocalidad").val();
    this.zona = $("#txtZona").val();
    this.ruta = $("#txtRuta").val();
    

    return this;
    }
}

/**
 * Clase Ruta
 * Hereda de inc/tracking/def_apartadosmodal.html
 */
class Apartados{
    constructor(){
        this.iniciorango = "";
        this.finrango = "";
        this.oficinaperteneciente = "";
        this.zonapostal = "";
        this.ruta = "";

    }
    Crear(req){}
    Obtener(){
    this.iniciorango = $("#txtInicioRango").val();
    this.finrango = $("#txtFinRango").val();
    this.oficinaperteneciente = $("#cmbOficinaPerteneciente option:selected").val();
    this.zonapostal = $("#txtZonaPostal").val();
    this.ruta = $("#txtRuta").val();

    return this;
    }
}


function GuardarApartados(){

}

/**
 * Clase Ruta
 * Hereda de inc/tracking/def_repartidoresmodal.html
 */
class Repartidores{
    constructor(){
        this.repatidor = "";
        this.rutamultiple = "";

    }
    Crear(req){}
    Obtener(){
    this.repatidor = $("#txtRepartidor").val();
    this.rutamultiple = $("#cmbRutaMultiple option:selected").val();

    return this;
    }
}


function GuardarRepartidor(){

}

/**
 * Clase Incentivos
 * Hereda de inc/tracking/def_incentivosmodal.html
 */
class Incentivos{
    constructor(){
        this.desde = "";
        this.hasta = "";
        this.monto = "";
    
    }
    Crear(req){}
    Obtener(){
    this.desde = $("#txtDesde").val();
    this.hasta = $("#txtHasta").val();
    this.monto = $("#txtMonto").val();
    

    return this;
    }
}


function GuardarRepartidor(){

}





