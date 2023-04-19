var UrlApiGetAll = 'http://localhost:5005/cliente/getall';
var UrlApiInsert = 'http://localhost:5005/cliente/insertar';
var UrlApiGetOne = 'http://localhost:5005/cliente/getone/:numero_cliente';
var UrlApiDelete = 'http://localhost:5005/cliente/eliminar/:numero_cliente';

$(document).ready( function(){
    CargarCliente();
});

function CargarCliente(){
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
                    '<td>' + MissItems[i].numero_cliente + '</td>' +
                    '<td>' + MissItems[i].nombres + '</td>' +
                    '<td>' + MissItems[i].apellidos + '</td>' +
                    '<td>' + MissItems[i].rtn + '</td>' +
                    '<td>' + MissItems[i].fecha_afiliacion + '</td>' +
                    '<td>' + MissItems[i].saldo_actual + '</td>' +
                    '<td>' + MissItems[i].numero_cuenta + '</td>' +
                    '<td>' +
                        '<button id="btneditar" class="btn btn-dark" onclick="CargarCliente('+ MissItems[i].numero_cliente +')">Editar</button>' +
                    '</td>' +
                    '<td>' +
                        '<button id="btneliminar" class="btn btn-danger" onclick="EliminarCliente('+ MissItems[i].numero_cliente +')">Eliminar</button>' +
                    '</td>' +
                '</tr>';
                $('#DatosCliente').html(Valores);
                
            }
        } 
    });
}
function AgregarCliente(){
    var DatosCliente = {
        numero_cliente: $('#No_Cliente').val(),
        nombres: $('#Nombres').val(),
        apellidos: $('#Apellidos').val(),
        rtn: $('#RTN').val(),
        fecha_afiliacion: $('#Fech_Afiliacion').val(),
        saldo_actual: $('#Saldo_Actual').val(),
        numero_cuenta: $('#No_Cuenta').val()
    };
    var DatosClienteJSON = JSON.stringify(DatosCliente);
    $.ajax({
        url: UrlApiInsert,
        type: 'POST',
        data: DatosClienteJSON,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            alert('Cliente ingresado de forma correcta')
            $('#FormularioCliente').submit();
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
}
function CargarCliente(p_numero_cliente){

    var DatosCliente = {
        numero_cliente: p_numero_cliente
    };
    var DatosClientejson = JSON.stringify(DatosCliente);
    $.ajax({
        url: UrlApiGetOne,
        type: 'POST',
        data: DatosClientejson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var Item = response;

            for(i=0; i<Item.length; i++){
                $('#No_Cliente').val(Item[i].numero_cliente);
                $('#Nombres').val(Item[i].nombres);
                $('#Apellidos').val(Item[i].apellidos);
                $('#RTN').val(Item[i].rtn);
                $('#Fech_Afiliacion').val(Item[i].fecha_afiliacion);
                $('#Saldo_Actual').val(Item[i].saldo_actual);
                $('#No_Cuenta').val(Item[i].numero_cuenta);
                var btnActualizar = '<input type="submit" value="Actualizar Cliente" class="btn btn-success" id="btnActualizar" onclick="ActualizarCliente('+ Item[i].numero_cliente +')">';
                $('#btnAgregar').html(btnActualizar);

            }
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
}
function ActualizarCliente(p_numero_cliente){

}
function EliminarCliente(p_numero_cliente){

    var DatosCliente = {
        numero_cliente: p_numero_cliente,
    };
    var DatosClientejson = JSON.stringify(DatosCliente);
    $.ajax({
        url: UrlApiDelete,
        type: 'PUT',
        data: DatosClientejson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            alert('Cliente eliminado de forma correcta')
            $('#FormularioCliente').submit();
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
}