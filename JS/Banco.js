var UrlApiGetAll = 'http://localhost:5005/banco/getall';

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
                    '<td>' + MissItems[i].od_banco + '</td>' +
                    '<td>' + MissItems[i].nombre + '</td>' +
                    '<td>' + MissItems[i].of_principal + '</td>' +
                    '<td>' + MissItems[i].cant_sucursales + '</td>' +
                    '<td>' + MissItems[i].fch_fundacion + '</td>' +
                    '<td>' + MissItems[i].pais + '</td>' +
                    '<td>' + MissItems[i].rtn + '</td>' +
                '</tr>';
                $('#DatosBancos').html(Valores);
            }
        } 
    });
}