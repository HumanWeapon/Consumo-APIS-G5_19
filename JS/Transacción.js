var UrlApiGetAll = 'http://localhost:5005/transaccion/getall';
var UrlApiInsert = 'http://localhost:5005/transaccion/insertar';
var UrlApiGetOne = 'http://localhost:5005/transaccion/getone/:codigo_transaccion';
var UrlApiUpdate = 'http://localhost:5005/transaccion/actualizar/:codigo_transaccion'; 
var UrlApiDelete = 'http://localhost:5005/transaccion/eliminar/:codigo_transaccion';

$(document).ready( function(){
    CargarTransacciones();
});

function CargarTransacciones(){
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
                    '<td>' + MissItems[i].codigo_transaccion + '</td>' +
                    '<td>' + MissItems[i].tipo_transaccion + '</td>' +
                    '<td>' + MissItems[i].codigo_cliente + '</td>' +
                    '<td>' + FormatoFecha(MissItems[i].fecha_transaccion) + '</td>' +
                    '<td>' + MissItems[i].monto_transaccion + '</td>' +
                    '<td>' + MissItems[i].sucursal + '</td>' +
                    '<td>' + MissItems[i].numero_cuenta + '</td>' +
                    '<td>' +
                        '<button id="btneditar" class="btn btn-dark" onclick="CargarTransaccion('+'`'+MissItems[i].codigo_transaccion+'`'+')">Editar</button>' +
                    '</td>' +
                    '<td>' +
                        '<button id="btneliminar" class="btn btn-danger" onclick="EliminarTransaccion('+'`'+MissItems[i].codigo_transaccion+'`'+')">Eliminar</button>' +
                    '</td>' +
                '</tr>';
                $('#DatosTransaccion').html(Valores);
            }
        } 
    });
}
function AgregarTransaccion(){
    var DatosTransaccion = {
        codigo_transaccion: $('#Cod_transaccion').val(),
        tipo_transaccion: $('#Tipo_transacción').val(),
        codigo_cliente: $('#Cod_cliente').val(),
        fecha_transaccion: $('#Fech_Afiliacion').val(),
        monto_transaccion: $('#Monto').val(),
        sucursal: $('#Sucursal').val(),
        numero_cuenta: $('#No_Cuenta').val()
    };
    var DatosTransaccionJSON = JSON.stringify(DatosTransaccion);
    $.ajax({
        url: UrlApiInsert,
        type: 'POST',
        data: DatosTransaccionJSON,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            alert('Transacción ingresada de forma correcta')
            $('#MiFormulario').submit();
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
}
function CargarTransaccion(P_codigo_transaccion){

    var DatosTransaccion = {
        codigo_transaccion: P_codigo_transaccion
    };
    var DatosTransaccionJSON = JSON.stringify(DatosTransaccion);
    $.ajax({
        url: UrlApiGetOne,
        type: 'POST',
        data: DatosTransaccionJSON,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var Item = response;
            for(i=0; i<Item.length; i++){
                $('#Cod_transaccion').val(Item[i].codigo_transaccion);
                $('#Tipo_transacción').val(Item[i].tipo_transaccion);
                $('#Cod_cliente').val(Item[i].codigo_cliente);
                $('#Fech_Afiliacion').val(FormatoFecha(Item[i].fecha_transaccion));
                $('#Monto').val(Item[i].monto_transaccion);
                $('#Sucursal').val(Item[i].sucursal);
                $('#No_Cuenta').val(Item[i].numero_cuenta);
                var btnActualizar = '<br><input type="button" value="Actualizar Transacción" class="btn btn-primary" id="btnActualizar" onclick="ActualizarTransaccion('+'`'+Item[i].codigo_transaccion+'`'+')"> '+
                                    '<a class="btn btn-danger" href="Transaccion.html" role="button">Cancelar</a> <br><br>';
                $('#btnAgregarTransaccion').html(btnActualizar);
                $('#titulo-agregar-actualizar').html('Actualizar Cliente');
            }     
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
}
function ActualizarTransaccion(P_codigo_transaccion){
    var DatosTransaccion = {
        codigo_transaccion: P_codigo_transaccion,
        tipo_transaccion: $('#Tipo_transacción').val(),
        codigo_cliente: $('#Cod_cliente').val(),
        fecha_transaccion: $('#Fech_Afiliacion').val(),
        monto_transaccion: $('#Monto').val(),
        sucursal: $('#Sucursal').val(),
        numero_cuenta: $('#No_Cuenta').val()
    };
    var DatosTransaccionJSON = JSON.stringify(DatosTransaccion);
    $.ajax({
        url: UrlApiUpdate,
        type: 'PUT',
        data: DatosTransaccionJSON,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
            alert('Transacción actualizada de forma correcta')
            $('#MiFormulario').submit();
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
}
function EliminarTransaccion(P_codigo_transaccion){
    var DatosTransaccion = {
        codigo_transaccion: P_codigo_transaccion,
    };
    var DatosTransaccionJSON = JSON.stringify(DatosTransaccion);
    $.ajax({
        url: UrlApiDelete,
        type: 'DELETE',
        data: DatosTransaccionJSON,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            alert('Transacción eliminada de forma correcta')
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