var UrlApiGetAll = 'http://localhost:5005/banco/getall';
var UrlApiInsert = 'http://localhost:5005/banco/insertar';
var UrlApiGetOne = 'http://localhost:5005/banco/getone/:cod_banco';
var UrlApiUpdate = 'http://localhost:5005/banco/actualizar/:cod_banco'; 
var UrlApiDelete = 'http://localhost:5005/banco/eliminar/:cod_banco';

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
                    '<td>' + FormatoFecha(MissItems[i].fch_fundacion) + '</td>' +
                    '<td>' + MissItems[i].pais + '</td>' +
                    '<td>' + MissItems[i].rtn + '</td>' +
                    '<td>' +
                        '<button id="btneditar" class="btn btn-dark" onclick="CargarBanco('+'`'+MissItems[i].cod_banco+'`'+')">Editar</button>' +
                    '</td>' +
                    '<td>' +
                        '<button id="btneliminar" class="btn btn-danger" onclick="EliminarBanco('+'`'+MissItems[i].cod_banco+'`'+')">Eliminar</button>' +
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
                $('#Fech_Fundacion').val(FormatoFecha(Item[i].fch_fundacion));
                $('#Pais').val(Item[i].pais);
                $('#RTN').val(Item[i].rtn);
                var btnActualizar = '<br><input type="button" value="Actualizar Banco" class="btn btn-primary" id="btnActualizar" onclick="ActualizarBanco('+'`'+Item[i].cod_banco+'`'+')"> '+
                                    '<a class="btn btn-danger" href="Banco.html" role="button">Cancelar</a> <br><br>';
                $('#btnAgregarBanco').html(btnActualizar);
                $('#titulo-agregar-actualizar').html('Actualizar Banco');
            }     
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
}

function ActualizarBanco(P_cod_banco){
    var DatosBanco = {
        Cod_Banco: P_cod_banco,
        Nombre: $('#Nombre').val(),
        OF_Principal: $('#OfPrincipal').val(),
        Cant_Sucursales: $('#CantSucursales').val(),
        Fch_Fundacion: $('#Fech_Fundacion').val(),
        Pais: $('#Pais').val(),
        RTN: $('#RTN').val()
    };
    var DatosBancoJSON = JSON.stringify(DatosBanco);
    $.ajax({
        url: UrlApiUpdate,
        type: 'PUT',
        data: DatosBancoJSON,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
            alert('Banco actualizado de forma correcta')
            $('#MiFormulario').submit();
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
}
function EliminarBanco(P_cod_banco){
    var DatosBanco = {
        Cod_banco: P_cod_banco,
    };
    var datosBancojson = JSON.stringify(DatosBanco);
    $.ajax({
        url: UrlApiDelete,
        type: 'DELETE',
        data: datosBancojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            alert('Banco eliminado de forma correcta')
            $('#MiFormulario').submit();
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
}

function FormatoFecha(P_fecha){
    var v_fecha = new Date(P_fecha );
    var v_dia = v_fecha.getDate();
    var v_mes = v_fecha.getMonth()+1;
    var v_anio = v_fecha.getFullYear();

    v_dia=v_dia<10? "0"+v_dia: v_dia;
    v_mes=v_mes<10? "0"+v_mes: v_mes;

    return v_anio+"-"+v_mes+"-"+v_dia;
}