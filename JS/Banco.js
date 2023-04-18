var UrlApiGetAll = 'http://localhost:5005/banco/getall';
var UrlApiInsert = 'http://localhost:5005/banco/insertar';
var UrlApiGetOne = 'http://localhost:5005/banco/getone/:cod_banco';

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
            var Valores = '';
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
                        '<button id="btneditar" class="btn btn-dark" onclick="CargarBanco('+ MissItems[i].cod_banco +')">Editar</button>' +
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
            alert('Error: '+ textError + errorThrown);
        }
    });
}
function CargarBanco(P_cod_banco){

    var DatosBanco = {
        cod_banco: P_cod_banco
    };
    var datosBancojson = JSON.stringify(DatosBanco);
    $.ajax({
        url: UrlApiGetOne,
        type: 'POST',
        data: datosBancojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var Item = response;

            for(i=0; i<Item.length; i++){
                $('#No_Banco').val(Item[i].cod_banco);
                $('#Nombre').val(Item[i].nombre);
                $('#OfPrincipal').val(Item[i].of_principal);
                $('#CantSucursales').val(Item[i].cant_sucursales);
                $('#Fech_Fundacion').val(Item[i].fch_fundacion);
                $('#Pais').val(Item[i].pais);
                $('#RTN').val(Item[i].rtn);
                var btnActualizar = '<input type="submit" value="Actualizar Banco" class="btn btn-success" id="btnActualizar" onclick="ActualizarBanco('+ Item[i].cod_banco +')">';
                $('#btnAgregar').html(btnActualizar);

            }
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
}
function ActualizarBanco(P_cod_banco){

}