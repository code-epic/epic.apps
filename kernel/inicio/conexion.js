let http = require('http');
let https = require('https');


var { CodeHTTP } = require('./codehttp.js');

let fs = require('fs-extra');
let _HOST = "";


$(function (){    
   $("#_login").click(() => {
        testing();
    });
    $("#_create").click(() => {
        createFileJSON();
    })
}); 



function testing(){
    var dir = $("#dirip").val()
    if(dir == "") return false;

    $("#_login").attr("disabled", true);
    $("#panel").hide();
    $("#homeLoading").show();
    _HOST = dir;

    var _http = new CodeHTTP();
    _http.URL = dir
    _http.METODO = 'GET'

    _http.peticion()
    .then( (xhRequest) => {
        $.notify("El servidor se encuentra activo", {
            animate: {enter: 'animated bounceIn',exit: 'animated bounceOut'},
            type: 'success'});
        $("#panel").show();
        $("#homeLoading").hide();
        $("#_login").hide();
        $("#_create").show();
    })
    .catch((xherr) =>{
        $.notify("El servidor no se encuentra disponible", {
            animate: {enter: 'animated bounceIn',exit: 'animated bounceOut'},
            type: 'danger'});
        $("#panel").show();
        $("#homeLoading").hide();
        $("#_login").attr("disabled", false);
    })

}

function createFileJSON(){
    var file = 'kernel/inicio/const.json';
    fs.writeJson(file, {url: _HOST}, function(err) {
        $(location).attr("href", "index.html");
    })
}

