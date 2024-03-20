$(document).ready(()=>{
    //先驗證是否登入
    var jwt = localStorage.getItem("token")
    var account = localStorage.getItem("account");

    if (jwt == null){
        $('#login-input-area').show()
        $('#login-user-area').hide()
    }else{
        let dataUrl = "http://172.16.82.2:9090/user/userVerify"            
        $.ajax({
            url: dataUrl,
            method: 'POST',
            dataType: 'text',
            async: true,
            contentType: 'application/json;charset=utf-8',
            cache: false,
            headers: {
                "Authorization" : "Bearer " + jwt
            },

            success: res => {
                if (res == "0000"){
                    $('#login-input-area').hide()
                    $('#login-user-area').show()
                }else{
                    $('#login-input-area').show()
                    $('#login-user-area').hide()
                    localStorage.removeItem("token")
                }
            },

            error: err => {
                $('#login-input-area').show()
                $('#login-user-area').hide()
            },
        });   
    }

    
    let dataUrl = "http://172.16.82.2:9090/order/getNoByAccount?account="
    dataUrl += account
    console.log(dataUrl)

    $.ajax({
        url: dataUrl,
        method: 'GET',
        dataType: 'text',
        async: true,
        contentType: 'application/json;charset=utf-8',
        cache: false,
        headers: {
            "Authorization" : "Bearer " + jwt
        },

        success: res => {
            var resList = JSON.parse(res) // string 轉 JSON object
            console.log(resList)
            $.each(resList, function(i, n){
            $('#orderno').append(            
                '<option id="ordno">'+n+'</option>');
            })
        },
        error: err => {
            window.alert(err.responseText)
        },
    })
})


function searOrder(){

    let dataUrl = "http://172.16.82.2:9090/order/getByListNo?no="
    let orderno = $('#orderno').val()
    dataUrl += orderno
    //console.log(dataUrl)
    jwt = localStorage.getItem("token")
    $('#ordercom').empty()

    $.ajax({
        url: dataUrl,
        method: 'GET',
        dataType: 'text',
        async: true,
        contentType: 'application/json;charset=utf-8',
        cache: false,
        headers: {
            "Authorization" : "Bearer " + jwt
        },

        success: res => {
            var resList = JSON.parse(res) // string 轉 JSON object
            //console.log(resList)
            $.each(resList, function(i, n){
                dataUrl = "http://172.16.82.2:9090/com/getById?id="
                dataUrl += n.orderCommodityID
                $.ajax({
                    url: dataUrl,
                    method: 'GET',
                    dataType: 'json',
                    async: true,
                    contentType: 'application/json;charset=utf-8',
                    cache: false,
                    headers: {
                        "Authorization" : "Bearer " + jwt
                    },
                    success: res => {
                        //console.log(res)
                        $('#ordercom').append(            
                            '<tr>'+
                                '<td><img src='+res.commodityImgPath+'></td>'+
                                '<td>'+res.commodityName+'</td>'+   
                                '<td>'+res.commodityPrice+'</td>'+
                                '<td>'+n.orderQty+'</td>'+
                                '<td class="total">'+n.orderPrice+'</td>'+
                            '</tr>'
                        );
                        let total = 0;
                        $.each($('#ordercom').children(), (i, n) => {
                            total += Number($(n).children('.total').text())
                        })
                        console.log(total)
                        $('.sumTotal').text(total)
                    },
                    error: err => {
                        window.alert(err.responseText)
                    },
                })
            })
        },
        error: err => {
            window.alert(err.responseText)
        },
    })

}



// $.ajax({
//     url: dataUrl,
//     method: 'GET',
//     dataType: 'text',
//     async: true,
//     contentType: 'application/json;charset=utf-8',
//     cache: false,
//     headers: {
//         "Authorization" : "Bearer " + jwt
//     },
//     success: res => {

//     },
//     error: err => {
//         window.alert(err.responseText)
//     },
// })