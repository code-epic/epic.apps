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
        this.URLSEC = "http://" + this.IP + this.Puerto;
    }
}

/**
 * Permite cargar y hacer consultas a las API del bus.
 * @param {array} options | sURL, metodo, Objeto, valores
 */
function CargarAPI(options){
    var xhttp = new XMLHttpRequest();
    xhttp.open(options.metodo, options.sURL);
    console.log(options.sURL);
    xhttp.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('ipostel'));
    var promise = new Promise(function(resolve, reject) {
        xhttp.addEventListener('readystatechange', function() {
            if ( xhttp.readyState === 4 && xhttp.status === 200) {
                if(options.Objeto != undefined){
                    options.Objeto = JSON.parse(xhttp.responseText);
                }
                
                    resolve(xhttp);  
               
            }
            if( xhttp.status === 401){
                if ( xhttp.responseText != "" ) {
                    respuesta = JSON.parse(xhttp.responseText);
                    //$.notify(respuesta.msj);
                }
            }
        });
        
        xhttp.addEventListener('error', function() {
            if ( xhttp.responseText != "" ) {
                respuesta = JSON.parse(xhttp.responseText);
                if (respuesta.tipo != 0){
                    //$.notify("Se ha Insertado correctamente", "success");
                }else{
                    alert(xhttp.responseText);
                }
            }
            reject(xhttp);
        });
    });
    
    if(options.valores != undefined){
        xhttp.send(JSON.stringify(options.valores));
    }else{
        xhttp.send();
    }

    return promise;
}
    

/**
 * Cargar archivos html
 * @param {string} id  
 * @param {string} url | HTML 
 */
function CargarUrl(id, url){
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url + '.html');
    var promise = new Promise(function(resolve, reject) { 

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                $('#'+id).html(xhttp.responseText);
                
            }else if (this.readyState == 4 && this.status == 404){
                
                Util.Mensaje(
                    `El archivo ${url} no ha sido encontrado`, 
                    'bg-danger',
                    'Cargar Url',
                    'ipostel-core'
                );
                
            }
            resolve(xhttp);
        };
        xhttp.onerror = function() {
            
            if (this.readyState == 4 && this.status == 0) {
                Util.Mensaje(`El archivo ${url} no ha sido encontrado`, 'danger');
            }
            reject(xhttp);
    
        };

    })

    
    xhttp.send();
}