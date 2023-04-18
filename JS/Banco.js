var urlApiGetAll = "http://localhost:5005/banco/getall";

$(document).ready(function(){
    CargarBancos();
});

function CargarBancos(){
    $.ajax({
        url: urlApiGetAll,
        type: 'GET',
        datatype: 'JSON',
        success: function(Response){
            var MissItems = Response;
            var Valores = '';
            for(i=0; i<MissItems.length; i++){
                Valores +=
                '<tr>'+
                    '<td>'+MissItems[i].Cod_Banco+'</td>'+
                    '<td>'+MissItems[i].Nombre+'</td>'+
                    '<td>'+MissItems[i].OF_Principal+'</td>'+
                    '<td>'+MissItems[i].Cant_Sucursales+'</td>'+
                    '<td>'+MissItems[i].Fch_Fundacion+'</td>'+
                    '<td>'+MissItems[i].Pais+'</td>'+
                    '<td>'+MissItems[i].RTN+'</td>'+
                '</tr>';
                $('DatosBancos').html(Valores);
            }
        } 
    })
}