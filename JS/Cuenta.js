var UrlApiGetAll = 'http://localhost:5005/cuenta/getall';
var UrlApiInsert = 'http://localhost:5005/cuenta/insertar';
var UrlApiGetOne = 'http://localhost:5005/cuenta/getone/:numero_cuenta';
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
                    '<td>' + MissItems[i].fecha_apertura + '</td>' +
                    '<td>' + MissItems[i].saldo_actual + '</td>' +
                    '<td>' + MissItems[i].saldo_retenido + '</td>' +
                    '<td>' + MissItems[i].tipo_moneda + '</td>' +
                    '<td>' +
                        '<button id="btneditar" class="btn btn-dark" onclick="CargarCuenta('+ MissItems[i].numero_cuenta +')">Editar</button>' +
                    '</td>' +
                    '<td>' +
                        '<button id="btneliminar" class="btn btn-danger" onclick="EliminarCuenta('+ MissItems[i].numero_cuenta +')">Eliminar</button>' +
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
        num_cta: P_num_cta
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
                $('#numero_cuenta').val(Item[i].num_cta);
                $('#nombre_cuenta').val(Item[i].nombre_cuenta);
                $('#numero_cliente').val(Item[i].numero_cliente);
                $('#fecha_apertura').val(Item[i].fecha_apertura);
                $('#saldo_actual').val(Item[i].saldo_actual);
                $('#saldo_retenido').val(Item[i].saldo_retenido);
                $('#tipo_moneda').val(Item[i].tipo_moneda);
                var btnActualizar = '<input type="submit" class="btn btn-primary" '+ 
                'id="btnAgregar" onclick="ActualizarCuenta('+ Item[i].num_cta +')" value="Actualizar Cuenta">';
                $('#btnAgregar').html(btnActualizar);

            }
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
}
function ActualizarCuenta(P_num_cta){

}
function EliminarCuenta(P_num_cta){

    var DatosCuenta = {
        num_cta: P_num_cta
    };    
    
    var datosCuentajson = JSON.stringify(DatosCuenta);
    $.ajax({
        url: UrlApiDelete,
        type: 'PUT',
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