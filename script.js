//新增商品到購物車事件
function addCartBtn(obj){
// $('.addCartBtn').on('click',(event)=>{
    //用Map裝購物車商品，Map([商品ID, [商品名稱, 商品數量, 單價, 圖片路徑]])
    let cartMap = new Map(JSON.parse(localStorage.getItem("cartMap")))
    if (cartMap == null)
        cartMap = new Map()
    let comId = Number($(obj).parent().children().eq(0).text())
    let itemInfo = new Array(4)
    if (cartMap.has(comId)){
        //購物車已有該商品
        //console.log("購物車已有該商品")
        let qty = ++cartMap.get(comId)[1]
        //console.log(qty)
        itemInfo[0] = cartMap.get(comId)[0]
        $('#cartArea').children('#'+comId).find('.content').find('.price').text('$'+qty*cartMap.get(comId)[2])
        $('#cartArea').children('#'+comId).find('.content').find('.quantity').text('qty : '+qty)
    }
    else{
        itemInfo[0] = $(obj).parent().children('h3').text()
        itemInfo[1] = 1
        itemInfo[2] = parseInt($(obj).parent().children('.price').text().replaceAll('$',''))
        itemInfo[3] = $(obj).parent().children('img').attr('src')
        cartMap.set(comId, itemInfo)
        add2Cart(comId, itemInfo)

    }
    localStorage.setItem("cartMap", JSON.stringify(Array.from(cartMap.entries())))
    updateCartTotal()    
    window.alert("新增"+itemInfo[0]+"到購物車!")
}

function add2Cart(key, item){
    $('#cartArea').append('<div class="box" id="'+key+'">'+
                               '<p style="display: none;">'+key+'</p>'+
                               '<div class="fas fa-trash" onclick="removeCart(this)"></div>'+
                               '<img src="'+item[3]+'" alt="">'+
                               '<div class="content">'+
                                   '<h3>'+item[0]+'</h3>'+
                                   '<span class="price">$'+item[1]*item[2]+'/-</span>'+
                                   '<span class="quantity">qty : '+item[1]+'</span>'+
                               '</div>'+
                          '</div>')
}

function removeCart(obj){
    let comId = Number($(obj).parent().children().eq(0).text())
    let cartMap = new Map(JSON.parse(localStorage.getItem("cartMap")))
    cartMap.delete(comId)
    localStorage.setItem("cartMap", JSON.stringify(Array.from(cartMap.entries())))
    $(obj).parent().remove()
    updateCartTotal()
}

function updateCartTotal(){
    let cartItems = $('#cartArea').children()
    let total = 0
    $.each(cartItems, (i, n)=>{
        total += parseInt($(n).find('.content').find('.price').text().replaceAll('$', ''))
    })
    $('.shopping-cart').find('.total').text('total : $'+total+'/-')
}