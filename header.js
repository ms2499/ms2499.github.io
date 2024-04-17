$('.header').load('header.html', function(){
    let searchForm = document.querySelector('.search-form');

    document.querySelector('#search-btn').onclick = () =>{
        searchForm.classList.toggle('active');
        shoppingCart.classList.remove('active');
        loginForm.classList.remove('active');
        navbar.classList.remove('active');
        registerForm.classList.remove('active');
    }
    
    let shoppingCart = document.querySelector('.shopping-cart');
    
    document.querySelector('#cart-btn').onclick = () =>{
        shoppingCart.classList.toggle('active');
        searchForm.classList.remove('active');
        loginForm.classList.remove('active');
        navbar.classList.remove('active');
        registerForm.classList.remove('active');
    }
    
    let loginForm = document.querySelector('.login-form');
    
    document.querySelector('#login-btn').onclick = () =>{
        loginForm.classList.toggle('active');
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        navbar.classList.remove('active');
        registerForm.classList.remove('active');
    }
    
    let navbar = document.querySelector('.navbar');
    
    document.querySelector('#menu-btn').onclick = () =>{
        navbar.classList.toggle('active');
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        loginForm.classList.remove('active');
        registerForm.classList.remove('active');
    }

    let registerForm = document.querySelector('.register-form');

    document.querySelector('#go-register').onclick = () =>{
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        loginForm.classList.remove('active');
        registerForm.classList.toggle('active');
    }
    
    window.onscroll = () =>{
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        loginForm.classList.remove('active');
        navbar.classList.remove('active');
        registerForm.classList.remove('active');
    }

    $('.register-form').on('submit', function() {
        let dataUrl = apiUrl + "/user/createUser"
        let jsonData = {
            userAccount: $('#regAccount').val(),
            userPassword: $('#regPassword').val(),
            userName: $('#regName').val(),
            userEmail: $('#regEmail').val(),
            userPhone: $('#regPhone').val(),
            userAddress: $('#regAddress').val(),
        }

        $.ajax({
            url: dataUrl,
            method: 'POST',
            dataType: 'text',
            data: JSON.stringify(jsonData),
            async: true,
            contentType: 'application/json;charset=utf-8',
            cache: false,

            success: res => {
                window.alert(res)
            },

            error: err => {
                console.log(err)
                window.alert("註冊失敗!")
            },
        });
    })

    $('.login-form').on('submit', function() {
        let dataUrl = apiUrl + "/user/userLogin"
        let jsonData = {
            userAccount: $('#loginAccount').val(),
            userPassword: $('#loginPassword').val()
        }

        $.ajax({
            url: dataUrl,
            method: 'POST',
            dataType: 'text',
            data: JSON.stringify(jsonData),
            async: true,
            contentType: 'application/json;charset=utf-8',
            cache: false,

            success: res => {
                localStorage.setItem("token", res)
                localStorage.setItem("account", $('#loginAccount').val())
                window.alert("登入成功!")
                location.reload()
            },

            error: err => {
                window.alert(err.responseText)
            },
        });     
    })

    $(document).ready(()=>{
        //先驗證是否登入
        var jwt = localStorage.getItem("token")
        if (jwt == null){
            $('#login-input-area').show()
            $('#login-user-area').hide()
        }else{
            let dataUrl = apiUrl + "/user/userVerify"            

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

        //購物車清單
        let cartMap = new Map(JSON.parse(localStorage.getItem("cartMap")))
        if (cartMap != null){
            cartMap.forEach((value, key)=>{
                $('#cartArea').append('<div class="box" id="'+key+'">'+
                                          '<p style="display: none;">'+key+'</p>'+
                                          '<i class="fas fa-trash" onclick="removeCart(this)"></i>'+
                                          '<img src="'+value[3]+'" alt="">'+
                                          '<div class="content">'+
                                              '<h3>'+value[0]+'</h3>'+
                                              '<span class="price">$'+value[1]*value[2]+'/-</span>'+
                                              '<span class="quantity">qty : '+value[1]+'</span>'+
                                          '</div>'+
                                      '</div>')
            })
        } 
        updateCartTotal()
    })

    $('#logout').on('click', () => {
        localStorage.removeItem("token")
        location.reload()
    })

    $('#searchBtn').on('click', () => {
        let tag = $('#search-box').val()
        let type = 2
        location.href="product-page.html?type="+type+"&tag="+tag
    })

    if(typeof(EventSource)!=="undefined")
    {        
        var source = new EventSource(apiUrl + "/sse/get");
        source.onmessage = function(event)
        {
            // document.getElementById("result").innerHTML+=event.data + "<br>";
            document.getElementById('userMsg').innerText = event.data ;
        };
    }
    else
    {
        document.getElementById("userMsg").innerHTML="瀏覽器不支持 server-sent...";
    }        
})