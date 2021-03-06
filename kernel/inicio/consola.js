/**
 * Aplicación para el ipsfa de conexión e inicio
 * @ES6 TypeScript
 * Creado por: Carlos Peña 
 */    

 const electron = require('electron')
 const { ipcRenderer } = electron
 const http = require('http');
 const https = require('https');
 const fs = require('fs-extra')
 let { Config, Login } = require('./config.js');
 let { CodeHTTP } = require('./codehttp.js');
 const { CodeHDD } = require('./codehdd.js')
 let Conf = {};
 const os = require("os");
 var _file = 'kernel/inicio/epictoken.json';
 
 $(function (){
    var tk = sessionStorage.getItem("epicToken");
    if (tk == undefined) cerrarSesion();
    const webview = document.querySelector('webview');

    $("#refresh").click( () => {
        $("#refresh").html(`<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>`)
        const loadpage = () => {
            $("#refresh").html(`<i class="fa fa-refresh fa-3x"></i>`)
        }
        webview.reloadIgnoringCache()
        webview.addEventListener('dom-ready', loadpage)
    })    
    $("#backhistory").click( () => {
        webview.goBack()
    })
    $("#development").click( () => {
        webview.openDevTools()
    })
    $("#home").click( () => { 
        $("#navegacion").hide()
        $("#codePage").show()
    })
    $("#consola").click( () => {
        $("#codePage").hide()
        $("#navegacion").show()
        ipcRenderer.send("maximizarVentana", "control de cambios");
        var ruta = document.location;
        var srtRuta = "";
        if(ruta.protocol == "file:"){
            var segm = ruta.pathname.split("epic.apps");
            strRuta = ruta.origin + segm[0] + "epic.apps/app/ipostel/index.html"
        }
        //alert("https://localhost:2286/app/ipostel/index.html?tk=" + tk );
        webview.loadURL("https://localhost:2286/app/ipostel/index.html?tk=" + tk );
       
    })



    

     $("#cerrarSesion").click(() => {
         cerrarSesion();
     })
 
     fs.readJson('kernel/inicio/const.json', function(err, obj) {
         if(err != null){
             $(location).attr("href", "conexion.html");
         }else{
             Conf = new Config(obj.url);
             Conf.PCHs().then(
                (hs) =>{
                    $("#cpus").html(hs.cpus)
                    $("#memtotal").html(hs.memoria.total)
                    $("#os").html(hs.so)
                    hs.mac.then((rs)=> {$("#mac").html(rs); })
                    hs.disco.then((rs)=> {
                        $("#disco").html(rs.total)
                        $("#discodisponible").html(rs.disponible)
                        $("#porcentaje").html(rs.porcentaje)
                    })
                    $("#ip").html('')
                    hs.ip.forEach(rs => {
                        $("#ip").append(`&nbsp;&nbsp; + ${rs.interfaz} ${rs.ip}<br>`)
                    });
                    console.log(hs)
                }
            ).catch(
               (err) =>{
                  console.log(err)
               }
           )
    
        }
     });

     Pace.on("done", () => {
         console.log("iniciando")
        $("#xpage-pace").fadeIn(500);
    });

   
    
    var s = tk.split(".")
    var json = JSON.parse(atob(s[1]))
    Usuario = json.Usuario;
    console.log(Usuario)
    $("#cedula").html(Usuario.cedula)
    $("#nombre").html(Usuario.nombre.toUpperCase() )
    $("#perfil").html(Usuario.Perfil.descripcion.toUpperCase() )
    $("#correo").html(Usuario.correo.toUpperCase() )
     
 }); 
 

 function cerrarSesion(){
    localStorage.removeItem('epicToken');
    sessionStorage.removeItem('epicToken');
    fs.remove(_file);
    $(location).attr("href", "../../index.html");
}


