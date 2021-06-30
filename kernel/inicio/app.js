/**
 * Aplicación para el ipsfa de conexión e inicio
 * @ES6 TypeScript
 * Creado por: Carlos Peña 
 */    


const http = require('http');
const https = require('https');
const fs = require('fs-extra')

const {CodeIndexDB} = require('./indexdb.js')
let { Config, Login } = require('./config.js');
let { CodeHTTP } = require('./codehttp.js');

let Conf = {};

let codeindexdb = new CodeIndexDB()



$(function (){
    $('#clave').keyup(function(e){
        if(e.keyCode == 13) {
            Ingresar();
        }
    });      
    Pace.on("done", () => {
        $("#xpage-pace").fadeIn(2500);
    });
    
    $("#_login").click(() => {
        Ingresar();
    })

    $("#cerrarSesion").click(() => {
        cerrarSesion();
    })

    fs.readJson('kernel/inicio/const.json', function(err, obj) {
        if(err != null){
            $(location).attr("href", "conexion.html");
        }else{
            Conf = new Config(obj.url);
        }
    });


    // var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    // var toastList = toastElList.map(function (toastEl) {
    //     console.log(toastEl)
    //     return new bootstrap.Toast(toastEl, {animate: true, authohide: true})
    // })
    // console.log(toastList)
    // toastList[0].show()

    
}); 



  
function Ingresar(){
    if ($("#usuario").val() == ""){
        Conf.alerta("No ha introducido usuario", "epic-alert-warning", "");
        return false;
    }
    if ($("#clave").val() == ""){
        Conf.alerta("No ha introducido clave", "epic-alert-warning", "");
        return false;
    }
    // $("#panel").hide();
    $('#cardLogin').hide()
    $("#cardLoading").fadeIn(500);
    var login = new Login($("#usuario").val(), $("#clave").val());



    var _http = new CodeHTTP();
    _http.URL = Conf.URL
    _http.API = "/ipsfa/app/api/wusuario/login"
    _http.METODO = 'POST'
    _http.peticion( login.Login() )
    .then( (xhttp) => {

        json = JSON.parse(xhttp.responseText);
        localStorage.setItem('ipsfaToken', json.token);    
        sessionStorage.setItem('ipsfaToken', json.token);    
        var s = json.token.split(".");
        var MenuJS = JSON.parse(atob(s[1]));    
        if(MenuJS.Usuario.modulo != undefined){
            var mod = Array.isArray(MenuJS.Usuario.modulo) == true ? MenuJS.Usuario.modulo[0] : "error";
            //$(location).attr("href",  "app/" + mod + "/starter.html");
        }else{
            //$(location).attr("href","error/starter.html");
        }
        $("#cardLoading").hide()
        $("#cardApps").fadeIn(2500);
    })
    .catch((xherr) =>{
        Conf.alerta("Debe verificar el usuario o clave.", "epic-alert-danger", "");
        $("#cardLoading").hide()
        limpiarCampos();
    })

   
}


function limpiarCampos(){
    $("#cardLogin").fadeIn(2500);
    $("#cardApps").hide()
    $("#usuario").val("");
    $("#clave").val("");
    $("#usuario").focus();
}

function cerrarSesion(){
    localStorage.removeItem('ipsfaToken');
    $("#cardLoading").hide()
    $("#cardLogin").removeClass('animate__animated animate__bounceOutLeft')
    $("#cardApps").hide();
    limpiarCampos();
}



require('os').networkInterfaces( function(err, intf){
    if (err)  throw err
    console.log(err, intf)
})


require('macaddress').one(function (err, mac) {
    if (err)  throw err
    $("#mac").val(mac);  
});