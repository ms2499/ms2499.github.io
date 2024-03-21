function getByTag(){
    var url = new URL(location.href);
    let type = url.searchParams.get('type')
    var dataUrl
    if (type == 1)
        dataUrl = apiUrl + "/com/getByTag?tag="
    else
        dataUrl = apiUrl + "/com/search?key="
    var tag = url.searchParams.get('tag');
    dataUrl += tag
    $('#tagTitle').text(tag)    
    // var userdata = { id : id }


    $('#com-list').empty();
    $.ajax({
        url: dataUrl,
        method: 'GET',
        dataType: 'text',
        // data: userdata,
        async: true,

        success: res => {
            var resList = JSON.parse(res) // string 轉 JSON object
            console.log(resList)
            $.each(resList, function(i, n){
                $('#list-wrapper').append('<div class="list-item">'+
                                           '<div class="one-product">'+
                                                '<p style="display: none;">'+n.commodityID+'</p>'+
                                                '<img src='+n.commodityImgPath+' alt="">'+
                                                '<h3>'+n.commodityName+'</h3>'+
                                                '<div class="price"> $ '+n.commodityPrice+'</div>'+
                                                '<button class="btn addCartBtn" onclick="addCartBtn(this)">add to cart</button>'+
                                            '</div>'+
                                       '</div>'
                                      );
            })
            setpage()
        },
    // <div class="list-item">
    //     <div class="one-product">
    //         <img src="image/product1.jpg" alt="">
    //         <h3>watermalon</h3>
    //         <div class="price"> $ 100 </div>
    //         <a href="#" class="btn">add to cart</a>
    //     </div>
    // </div>
        error: err => {
            console.log(err)
        },
    });
}

 