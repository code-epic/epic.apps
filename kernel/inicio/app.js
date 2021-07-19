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
let _TOKEN = '';
var _file = 'kernel/inicio/epictoken.json';


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
            fs.readJson('kernel/inicio/epictoken.json', function(err, json) {
                console.log('conectando ', err, json);
                if(err == null) {
                    _asignarToken(json.token, true);
                }
            });
            Conf = new Config(obj.url);
        }
    });    
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
    _http.API = "/v1/api/wusuario/login"
    _http.METODO = 'POST'
    _http.peticion( login.Login() )
    .then( (xhttp) => {
        var tk = JSON.parse(xhttp.responseText).token;
       _asignarToken(tk, false);
       _TOKEN = tk;
        createTokenJSON();
       
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

function createTokenJSON(){
    
    fs.writeJson(_file, {token: _TOKEN}, function(err) {
        $(location).attr("href", "index.html");
    })
}


function _asignarToken(tk, active){
    localStorage.setItem('epicToken', tk);    
    sessionStorage.setItem('epicToken', tk);                      
    if (active) {
        
        $(location).attr("href",  "kernel/consola/index.html"); 
    }
    $("#cardLoading").hide()
    $("#cardApps").fadeIn(2500);

}

// var s = json.token.split(".");
// var MenuJS = JSON.parse(atob(s[1]));    
// if(MenuJS.Usuario.modulo != undefined){
//     var mod = Array.isArray(MenuJS.Usuario.modulo) == true ? MenuJS.Usuario.modulo[0] : "error";
//     //$(location).attr("href",  "app/" + mod + "/starter.html");
// }else{
//     //$(location).attr("href","error/starter.html");
// }