var UrlApiGetAll = 'http://localhost:5005/cuenta/getall';
var UrlApiInsert = 'http://localhost:5005/cuenta/insertar';
var UrlApiGetOne = 'http://localhost:5005/cuenta/getone/:numero_cuenta';
var UrlApiUpdate = 'http://localhost:5005/cuenta/actualizar/:numero_cuenta'; 
var UrlApiDelete = 'http://localhost:5005/cuenta/eliminar/:numero_cuenta';

$(document).ready( function(){
    CargarCuentas();
});

function CargarCuentas(){
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
                    '<td>' + MissItems[i].numero_cuenta + '</td>' +
                    '<td>' + MissItems[i].nombre_cuenta + '</td>' +
                    '<td>' + MissItems[i].numero_cliente + '</td>' +
                    '<td>' + FormatoFecha(MissItems[i].fecha_apertura) + '</td>' +
                    '<td>' + MissItems[i].saldo_actual + '</td>' +
                    '<td>' + MissItems[i].saldo_retenido + '</td>' +
                    '<td>' + MissItems[i].tipo_moneda + '</td>' +
                    '<td>' +
                        '<button id="btneditar" class="btn btn-dark" onclick="CargarCuenta('+'`'+MissItems[i].numero_cuenta+'`'+')">Editar</button>' +
                    '</td>' +
                    '<td>' +
                        '<button id="btneliminar" class="btn btn-danger" onclick="EliminarCuenta('+'`'+MissItems[i].numero_cuenta+'`'+')">Eliminar</button>' +
                    '</td>' +
                '</tr>';
                $('#DatosCuentas').html(Valores);
                
            }
        } 
    });
}
function AgregarCuenta(){
    var DatosCuenta = {
        numero_cuenta: $('#numero_cuenta').val(),
        nombre_cuenta: $('#nombre_cuenta').val(),
        numero_cliente: $('#numero_cliente').val(),
        fecha_apertura: $('#fecha_apertura').val(),
        saldo_actual: $('#saldo_actual').val(),
        saldo_retenido: $('#saldo_retenido').val(),
        tipo_moneda: $('#tipo_moneda').val()
    };
    var DatosCuentaJSON = JSON.stringify(DatosCuenta);
    $.ajax({
        url: UrlApiInsert,
        type: 'POST',
        data: DatosCuentaJSON,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            alert('Cuenta ingresada de forma correcta')
            $('#MiFormulario').submit();
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
}
function CargarCuenta(P_num_cta){

    var DatosCuenta = {
        numero_cuenta: P_num_cta
    };
    var datosCuentajson = JSON.stringify(DatosCuenta);
    $.ajax({ 
        url: UrlApiGetOne,
        type: 'POST',
        data: datosCuentajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var Item = response;
            for(i=0; i<Item.length; i++){
                $('#numero_cuenta').val(Item[i].numero_cuenta);
                $('#nombre_cuenta').val(Item[i].nombre_cuenta);
                $('#numero_cliente').val(Item[i].numero_cliente);
                $('#fecha_apertura').val(FormatoFecha(Item[i].fecha_apertura));
                $('#saldo_actual').val(Item[i].saldo_actual);
                $('#saldo_retenido').val(Item[i].saldo_retenido);
                $('#tipo_moneda').val(Item[i].tipo_moneda);
                var btnActualizar = '<br><input type="button" value="Actualizar Cuenta" class="btn btn-primary" id="btnActualizar" onclick="ActualizarCuenta('+'`'+Item[i].numero_cuenta+'`'+')"> '+
                                    '<a class="btn btn-danger" href="Cuenta.html" role="button">Cancelar</a> <br><br>';
                $('#btnAgregarCuenta').html(btnActualizar);
                $('#titulo-agregar-actualizar').html('Actualizar Cuenta');

            }
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
}
function ActualizarCuenta(P_num_cta){
    var DatosCuenta = {
        numero_cuenta: P_num_cta,
        nombre_cuenta: $('#nombre_cuenta').val(),
        numero_cliente: $('#numero_cliente').val(),
        fecha_apertura: $('#fecha_apertura').val(),
        saldo_actual: $('#saldo_actual').val(),
        saldo_retenido: $('#saldo_retenido').val(),
        tipo_moneda: $('#tipo_moneda').val()
    };
    var DatosCuentaJSON = JSON.stringify(DatosCuenta);
    $.ajax({
        url: UrlApiUpdate,
        type: 'PUT',
        data: DatosCuentaJSON,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
            alert('Cuenta actualizada de forma correcta')
            $('#MiFormulario').submit();
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);  
        }
    });
}
function EliminarCuenta(P_num_cta){

    var DatosCuenta = {
        numero_cuenta: P_num_cta
    };    
    var datosCuentajson = JSON.stringify(DatosCuenta);
    $.ajax({
        url: UrlApiDelete,
        type: 'DELETE',
        data: datosCuentajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            alert('Cuenta eliminada de forma correcta')
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