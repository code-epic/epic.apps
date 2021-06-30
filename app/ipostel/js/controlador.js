/**
 *
 */
let _ANOACTUAL = new Date().getUTCFullYear();

let FrmValidar = false;
let JsonMenu = {};
let Util = new Utilidad();
let conn = new Conexion();



Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});


 $(function(){
  if (sessionStorage.getItem('ipostel') == undefined ){
    $(location).attr("href","index.html");

  }else{
    console.info('Iniciando carga del sistema');

    CargarUrl('modales', 'inc/modales');
    Util.CargarJsonMenu();
    Util.DibujarEscritorio(JsonMenu);
    Util.DibujarMenuLateral(JsonMenu);
    Util.DibujarEscritorio(JsonMenu);
    ObtenerOficinas();
    ListarServiciosTipo();

  }
 }


 ); //Fin de la funcion



/**
 * Función de Cierre de Sesión
 */
function CerrarSesion(){
	sessionStorage.removeItem('ipostel');
	$(location).attr("href","../index.html");
}


/**
 * Funcion de Iniciar Sesión
 */
function IniciarSesion(){
  if (sessionStorage.getItem('ipostel') != undefined ){

    var e = sessionStorage.getItem("ipostel");
    var s = e.split(".");
    var json = JSON.parse(atob(s[1]));
    Usuario = json.Usuario;


    $("#_PerfilUsuario").html(Usuario.Perfil.descripcion);
    $("#_NombreUsuario").html(Usuario.nombre);

  }
}

 function CargarReportes(){
   CargarUrl('cuerpo', 'inc/configuracion/submenu_reportes');
  // CargarUrl('cargamasiva', 'inc/configuracion/usuariosmodal');
 }

 function CargarVentaPorSermana(){
   console.log("Acceder");
   ListarOficinas();
   CargarUrl('cuerpo', 'inc/configuracion/ventaporsemana');
  // CargarUrl('cargamasiva', 'inc/configuracion/usuariosmodal');
 }



/**
 * Carga Módulo CNC
 * V 1.0
 */
function CargarCnc(){
  Util.DibujarSubMenuEscritorio(JsonMenu, "Cnc");
}

/**
 * Carga de Módulo Gestión Operativa
 * V 1.0
 */
function CargarGestionOperativa(){
  Util.DibujarSubMenuEscritorio(JsonMenu, "Gestion Operativa");
}




 /**
  * Carga de Módulo Gestión Postal
  */

 function CargarGestionPostal(){
  Util.DibujarSubMenuEscritorio(JsonMenu, "GestionPostal");
}

/**
 * Carga de Módulo Gestión Comercial
 * V 1.0
 */
function CargarGestionComercial(){
  Util.DibujarSubMenuEscritorio(JsonMenu, "GestionComercial");
}

/**
 * Carga de Módulo Panel
 */
function CargarPanel(){
  Util.DibujarSubMenuEscritorio(JsonMenu, "Panel");
}


function CargarApiCore(){
  CargarUrl('cuerpo', 'inc/panel/apicore');
}

function CargarDriver(){
  CargarUrl('cuerpo', 'inc/panel/drivers');
}