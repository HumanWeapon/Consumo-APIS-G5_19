var UrlApiGetAll = 'http://localhost:5005/banco/getall';
var UrlApiInsert = 'http://localhost:5005/banco/insertar';

$(document).ready( function(){
    CargarBancos();
});

function CargarBancos(){
    $.ajax({
        url: UrlApiGetAll,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MissItems = response;
            var Valores = '';;
            for(i=0; i<MissItems.length; i++){
                Valores +=
                '<tr>'+
                    '<td>' + MissItems[i].cod_banco + '</td>' +
                    '<td>' + MissItems[i].nombre + '</td>' +
                    '<td>' + MissItems[i].of_principal + '</td>' +
                    '<td>' + MissItems[i].cant_sucursales + '</td>' +
                    '<td>' + MissItems[i].fch_fundacion + '</td>' +
                    '<td>' + MissItems[i].pais + '</td>' +
                    '<td>' + MissItems[i].rtn + '</td>' +
                    '<td>' +
                        '<button id="btnedir" class="btn btn-dark" onclick="AgregarBanco()">Editar</button>' +
                    '</td>' +
                '</tr>';
                $('#DatosBancos').html(Valores);
            }
        } 
    });
}
function AgregarBanco(){
    var DatosBanco = {
        Cod_Banco: $('#No_Banco').val(),
        Nombre: $('#Nombre').val(),
        OF_Principal: $('#OfPrincipal').val(),
        Cant_Sucursales: $('#CantSucursales').val(),
        Fch_Fundacion: $('#Fech_Fundacion').val(),
        Pais: $('#Pais').val(),
        RTN: $('#RTN').val()
    };
    var DatosBancoJSON = JSON.stringify(DatosBanco);
    $.ajax({
        url: UrlApiInsert,
        type: 'POST',
        data: DatosBancoJSON,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            alert('Banco ingresado de forma correcta')
            $('#MiFormulario').submit();
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError+errorThrown);
        }
    });
}