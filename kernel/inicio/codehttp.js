let http = require('http');
let https = require('https');



class CodeHTTP{
  constructor(){
    this.METODO = ''
    this.JWT = ''
    this.URL = ''
    this.API = ''
    this.RS = {}
    
  }

  //Peticiones Generale
  //@params JWT: string, URL: string, API: string, METODO: string, RS: json {}objeto
  peticion(valores){
    var xhttp = new XMLHttpRequest()
    xhttp.open(this.METODO, this.URL + this.API)
    xhttp.withCredentials = true
    if (this.JWT != undefined){
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.setRequestHeader("Authorization", "Bearer " + this.JWT)
    } else{
      xhttp.setRequestHeader("Content-Type", "application/text");
    }
    var promesa = new Promise( (resolve, reject) => {
      xhttp.onreadystatechange = () => {
        if ( xhttp.readyState === 4 && xhttp.status === 200) {
          try {
            this.RS = JSON.parse(xhttp.responseText)
          } catch (e) {

          }  
        
          resolve(xhttp)
        }
        if( xhttp.status === 401 || xhttp.status === 404 || xhttp.status === 403){
          reject(xhttp);
        }

      };
      
      xhttp.onabort = () => {
        reject(xhttp)
      }

    }) // Fin promesa

    if(valores != undefined){
      xhttp.send(JSON.stringify(valores))
    }else{
      xhttp.send()
    }

    return promesa
  }

  // HttpsOptions Define las opciones para conectar con las url y sus metodos
  // API que define el canal de acceso
  // Metodo POST, GET, PUT, OPTIONS
  HttpsOptionsGeneric(api, metodo){
    // 'Content-Length': data.length
    const options = {
      rejectUnauthorized: false,
      hostname: this.URL.toLowerCase(),
      path: api,
      port: 443,
      method: metodo,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return options;
  }

  //_HTTP seleccionar en caso de http o https
  _HTTP(){
    var surl =  this.URL.toLowerCase()
    if( surl.includes("https") ){
        return https;
    }else{
        return http;
    }
  }
}

module.exports = {  
  CodeHTTP: CodeHTTP
}