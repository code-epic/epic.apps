/**
 * Desarrollado por Carlos Peña
 * Version 1.0.1
 * @gesaodin
 * Clase de conexion
 */

 /**
 * Desarrollado por Carlos Peña
 * Version 1.0.1
 * @gesaodin
 * Clase de conexion
 */
let _url = new URL(document.URL);
class Conexion{
    constructor(){
        this.IP = _url.hostname;
        this.Puerto = ":8012";
        this.PuertoSSL = ":2286";
        this.API = "/v1/api/";
        this.URL = "https://" + this.IP + this.PuertoSSL + this.API;
        this.URLIMG = "/imagenes/";
        this.URLTEMP = _url.hostname + "/v1/temp/";
        this.URLSEC = "https://" + this.IP + this.PuertoSSL;
    }
}

var Conn = new Conexion();
class Login {
  constructor(usr, clv) {
    this.nombre = usr;
    this.clave = clv;
  }
  Login(){
    return this;
  }
}


$(function (){
  $('#clave').keyup(function(e){
    if(e.keyCode == 13) {
        Ingresar();
    }
  });



});

function Ingresar(){
  if ($("#usuario").val() == ""){

    Mensaje(
      `No ha introducido usuario`, 
      'bg-warning',
      'Login',
      'ipostel-core'
    );
    
    $("#usuario").focus();
    $("#_login").attr("disabled", true);
    return false;
  }
  if ($("#clave").val() == ""){
  
    Mensaje(
      `No ha introducido clave`, 
      'bg-warning',
      'Login',
      'ipostel-core'
    );
    $("#clave").focus();
    $("#_login").attr("disabled", true);
    return false;
  }
  let login = new Login($("#usuario").val(), $("#clave").val());
  var xhttp = new XMLHttpRequest();
  $("#_cargando").show();

  xhttp.open("POST", Conn.URLSEC + "/v1/app/api/wusuario/login");
  xhttp.onreadystatechange = function() {

    if (this.readyState === 4 && this.status === 200) {
      console.log(xhttp.responseText + "sdlasdklfjasdl");
     json = JSON.parse(xhttp.responseText);
     sessionStorage.setItem('ipostel', json.token);

     var s = json.token.split(".");
     var MenuJS = JSON.parse(atob(s[1]));

     if(MenuJS.Usuario.modulo != undefined){
       var mod = Array.isArray(MenuJS.Usuario.modulo)==true?MenuJS.Usuario.modulo[0]:"control";
       $(location).attr("href", mod + "principal.html");
     }else{
       $(location).attr("href","principal.html");
       console.log(xhttp.responseText);
     }
   }else if(this.readyState === 4 && this.status === 403){
    Mensaje(
      `${xhttp.responseText}`, 
      'bg-danger',
      'Login',
      'ipostel-core'
    );

     $("#_login").attr("disabled", true);
     $("#usuario").val("");
     $("#clave").val("");
     $("#usuario").focus();
     $("#_cargando").hide();
   }
  };
  xhttp.onerror = function() {
       if (this.readyState === 4 && this.status === 0) {
        Mensaje(
          `Error de conexión con el servidor`, 
          'bg-danger',
          'Login',
          'ipostel-core'
        );
         $("#_login").attr("disabled", true);
         $("#usuario").val("");
         $("#clave").val("");
         $("#usuario").focus();
         $("#_cargando").hide();
       }
   };

  xhttp.send(JSON.stringify(login.Login()));
}

function ActivarIniciar(){
  $("#_login").attr("disabled", false);
}


function Mensaje(mensaje, clase, titulo, subtitulo){
  $(document).Toasts('create', {
    class: clase, 
    title: titulo,
    autohide: true,
    delay: 2500,
    subtitle: subtitulo,
    body: mensaje,
    icon: 'warning',
    position: 'bottomRight'
  })
}