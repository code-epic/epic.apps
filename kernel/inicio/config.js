const nodeDiskInfo = require('node-disk-info'); 
const os = require("os");

class Config{
  constructor(_URL){
    this.IP = "";
    this.Puerto = ":8081";
    this.PuertoSSL = ":443";
    this.API = "/ipsfa/api/";
    this.URL = _URL;
  }
  alerta(mensaje, tipoColor, animacion){
    $('#divAlertas').html(`
      <div id="codeAlert" 
            class="toast align-items-center text-grey ${tipoColor} border-0 animate__animated animate__bounceInRight" 
          role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            ${mensaje}
          </div>
          <button type="button" class="btn-close btn-close-grey me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>`)

    var alerta = document.querySelector("#codeAlert")
    var toas = new bootstrap.Toast(alerta, {animate: true, authohide: true, delay:3000})
    toas.show()
      
  }
  
  //Datos del hardware y software
  PCHs(){
    return new Promise ( (resolve, reject) => {
      try {
        resolve( {
          cpus: this.Cpus(),
          disco : this.Disco(),
          memoria: this.Memoria(),
          so: this.SistemaOperativo(),
          mac: this.MacAddress(),
          ip: this.DireccionIP()
        })
  
      } catch (error) {
        reject(error)
        if (err)  throw err
      }
      
    })
    

      
  }
  Cpus(){
    var cpus = os.cpus()
    var modelo;
    if ( Array.isArray(cpus) ) {
        modelo = cpus[0].model
    }else{
        modelo = cpus.model
    }
    return modelo;

  }

  async Disco(){
    //Disco Duro
    var disco = {}; 
    await nodeDiskInfo.getDiskInfo()
          .then(disks => {
            var hddusado = 0 
            var hdddisponible = 0
            var hddtotal = 0 
            //disco = disks;
            disks.forEach(e => {
              hddusado += e._used
              if (e._available>0) hdddisponible = e._available
              if (hddtotal<e._blocks) hddtotal = e._blocks 
            });

            var xdisponible = Math.round((parseFloat(hdddisponible / 2 / 1024) /1000));
            var xtotal = ((parseFloat(hddtotal  / 2 / 1024)) / 1000).toFixed(2);
            var xusado =  (parseFloat(hddusado / 2 / 1024)/1000).toFixed(2);
            disco = {
              usado : xusado,
              disponible : xdisponible,
              total : xtotal,
              porcentaje: Math.round(((100 * xusado) / xtotal).toFixed(2))
            }
          })
          .catch(reason => {
              console.error(reason);
          });
    return disco;
  }
  
  Memoria(){
    return {
      total: ((os.totalmem())/1048576),
      lire: ((os.freemem())/1048576)
    }  
  }

  SistemaOperativo(){
    return os.type()
  }

  async MacAddress(){
    var macadd;
    await require('macaddress').one(function (err, mac) {
        if (err)  throw err
       macadd = mac;  
    });
    return macadd
  }

  DireccionIP(){
    var ip = []
    var ifaces = os.networkInterfaces();

    Object.keys(ifaces).forEach(function (ifname) {
      var alias = 0;
      var obj = {}

      ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }

        if (alias >= 1) {
          // this single interface has multiple ipv4 addresses
          //console.log(ifname + ':' + alias, iface.address);
        } else {
          // this interface has only one ipv4 adress
          console.log(ifname, iface.address)
          obj = {'interfaz': ifname, 'ip':iface.address}
        }
        ++alias;
        ip.push(obj)
      });
    });
    
    return ip
  }


}


class Login {
  constructor(usr, clv) {
    this.nombre = usr;
    this.clave = clv;
  }
  Login(){
    return this;
  }
}



   
module.exports = {  
  Config: Config,
  Login : Login
}