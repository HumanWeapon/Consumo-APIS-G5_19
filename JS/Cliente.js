var UrlApiGetAll = 'http://localhost:5005/cliente/getall';
var UrlApiInsert = 'http://localhost:5005/cliente/insertar';
var UrlApiGetOne = 'http://localhost:5005/cliente/getone/:numero_cuenta';
var UrlApiUpdate = 'http://localhost:5005/cliente/actualizar/:numero_cuenta'; 
var UrlApiDelete = 'http://localhost:5005/cliente/eliminar/:numero_cuenta';

$(document).ready( function(){
    CargarClientes();
});

function CargarClientes(){
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
                    '<td>' + FormatoFecha(MissItems[i].fecha_afiliacion) + '</td>' +
                    '<td>' + MissItems[i].saldo_actual + '</td>' +
                    '<td>' + MissItems[i].numero_cuenta + '</td>' +
                    '<td>' +
                        '<button id="btneditar" class="btn btn-dark" onclick="CargarCliente('+'`'+MissItems[i].numero_cliente+'`'+')">Editar</button>' +
                    '</td>' +
                    '<td>' +
                        '<button id="btneliminar" class="btn btn-danger" onclick="EliminarCliente('+'`'+MissItems[i].numero_cliente+'`'+')">Eliminar</button>' +
                    '</td>' +
                '</tr>';
                $('#DatosCliente').html(Valores);
                
            }
        } 
    });
}
function AgregarCiente(){
    var DatosCliente = {
        numero_cliente: $('#No_Cliente').val(),
        nombres: $('#Nombre').val(),
        apellidos: $('#Apellido').val(),
        rtn: $('#RTN').val(),
        fecha_afiliacion: $('#Fech_Afiliacion').val(),
        saldo_actual: $('#Salfo_Actual').val(),
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
            $('#MiFormulario').submit();
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
}
function CargarCliente(P_cod_cliente){

    var DatosCliente = {
        numero_cliente: P_cod_cliente
    };
    var datosClientejson = JSON.stringify(DatosCliente);
    $.ajax({
        url: UrlApiGetOne,
        type: 'POST',
        data: datosClientejson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var Item = response;
            for(i=0; i<Item.length; i++){
                $('#No_Cliente').val(Item[i].numero_cliente);
                $('#Nombre').val(Item[i].nombres);
                $('#Apellido').val(Item[i].apellidos);
                $('#RTN').val(Item[i].rtn);
                $('#Fech_Afiliacion').val(FormatoFecha(Item[i].fecha_afiliacion));
                $('#Salfo_Actual').val(Item[i].saldo_actual);
                $('#No_Cuenta').val(Item[i].numero_cuenta);
                var btnActualizar = '<br><input type="button" value="Actualizar Cliente" class="btn btn-primary" id="btnActualizar" onclick="ActualizarCliente('+'`'+Item[i].numero_cliente+'`'+')"> '+
                                    '<a class="btn btn-danger" href="Cliente.html" role="button">Cancelar</a> <br><br>';
                $('#btnAgregarCliente').html(btnActualizar);
                $('#titulo-agregar-actualizar').html('Actualizar Cliente');
            }     
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
}
function ActualizarCliente(P_cod_Cliente){
    var DatosCliente = {
        numero_cliente: P_cod_Cliente,
        nombres: $('#Nombre').val(),
        apellidos: $('#Apellido').val(),
        rtn: $('#RTN').val(),
        fecha_afiliacion: $('#Fech_Afiliacion').val(),
        saldo_actual: $('#Salfo_Actual').val(),
        numero_cuenta: $('#No_Cuenta').val()
    };
    var DatosClienteJSON = JSON.stringify(DatosCliente);
    $.ajax({
        url: UrlApiUpdate,
        type: 'PUT',
        data: DatosClienteJSON,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
            alert('Cliente actualizado de forma correcta')
            $('#MiFormulario').submit();
        },
        error: function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
}
function EliminarCliente(P_cod_Cliente){
    var DatosCliente = {
        numero_cliente: P_cod_Cliente,
    };
    var DatosClienteJSON = JSON.stringify(DatosCliente);
    $.ajax({
        url: UrlApiDelete,
        type: 'DELETE',
        data: DatosClienteJSON,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            alert('Cliente eliminado de forma correcta')
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