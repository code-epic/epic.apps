
let _itemApi = {};

class ApiCore{
    constructor(){
        this.prioriodad = "alta";
        this.concurrencia = true;
        this.ruta = "";
        this.funcion = "";
        this.parametros = "";
        this.retorna = true;
        this.migrar = false;
        this.modulo = "";
        this.relacional = false;
        this.valores = {};
    }
    Obtener(){
        return this;
    }
    GenerarListado(){
        var promesa =  CargarAPI({
            metodo : "GET",
            sURL: conn.URL + "listar"
        });
        promesa.then(function (xhRequest) {
            var json = JSON.parse( xhRequest.responseText);
            CrearGrid(json)
        });
    }
    
    
}

function CrearGrid(db){
    $("#jsGridApi").jsGrid({
        width: "100%",
        height: "600px",
        filtering: false,
        editing: false,
        sorting: true,
        paging: true,
        data: db,
        fields: [
            {  width: 10,
                itemTemplate: function(_, item) {
                    if(item.estatus == false){
                        return $("<i style='color:#A40F0F' class='fas fa-screwdriver'>")
                    }else{
                        return $("<i style='color:#6ABE0B' class='fas fa-check-circle'>")
                    }
              	}
            },
            { name: "protocolo", type: "text", title: "Protocolo",  width: 35,},
            { name: "puerto", type: "text", title: "Puerto",  width: 25,},
            { name: "metodo", type: "text", title: "Metodo",  width: 30,},
            { name: "funcion", type: "text", title: "Funcion" },
            { name: "entorno", type: "text", title: "Ruta",
                itemTemplate: function(_, item) {
                    return item.entorno=="produccion"?"/v1/api/crud":"/devel/api/crud"
                }
            },
            { name: "driver", type: "text", title: "Driver" },
            {  width: 10,
                itemTemplate: function(_, item) {
                    return $("<i style='color:#1D9D36' class='fas fa-play'>")
                    	.on("click", function() {
                            var api = item.entorno=="produccion"?"/v1/api/crud":"/devel/api/crud"
                            var ruta = item.protocolo.toLowerCase() + "://" + conn.IP + ":" + item.puerto + api;
                            $("#txtPath").val(ruta);
                            $("#txtQuery").val(item.query);
                            $("#codex").html(item.query);
                            $("#txtDatail").val("");
                            $('#result').html("");
                            $('#mdlApiEjecucion').modal('show');      
                            _itemApi = item;
                    	});
              	}
            }
        ]
    });
}

function EjecutarAPI(){
    
    var xAPI = new ApiCore();
    var api = _itemApi.entorno=="produccion"?"/v1/api/crud":"/devel/api/crud"
    var ruta = _itemApi.protocolo.toLowerCase() + "://" + conn.IP + ":" + _itemApi.puerto + api;

    xAPI.funcion = _itemApi.funcion;
    xAPI.modulo = _itemApi.modulo;
    xAPI.metodo = _itemApi.metodo;
    

    var promesa =  CargarAPI({
        metodo : 'POST',
        valores: xAPI.Obtener(),
        sURL: ruta
    });
    promesa.then(function (xhRequest) {
        var json =  JSON.parse(xhRequest.responseText);
        var valor = JSON.stringify(json, undefined, 2);
        //$("#txtDatail").val(valor);
        var node = new PrettyJSON.view.Node({
            el: $('#result'),
            data: json
          });
        node.expandAll();
    });
}

async function CargarDrivers(){
    $("#cmbDriver").html("");
    var elem = await Drivers.Listar();

    elem.forEach(e => {
        $("#cmbDriver").append(`<option value="${e.ID}">${e.Descripcion}</option>`);
    });
   
    
}