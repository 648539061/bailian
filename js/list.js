$(function(){
    $.ajax({
        url: '../api/goodslist.php',
        type: 'GET',
        success:function(xhr){
            //得到数据库返回的数据,生成html结构
            var xhr = JSON.parse(xhr);
            console.log(xhr);
            show(xhr);
        }
    });


    //默认综合排序高亮
    $('.zh').css({'background':'#c01133','border':'1px solid #c01133','color':'#FFF'});

    $('.choose_left li').click(function(){
        $(this).css({'background':'#c01133','border-color':'#c01133','color':'#FFF'}).siblings().css({'background':'#f8f8f8','border-color':'#ccc','color':'#666'});
    });

    //点击图片跳转详情页
    $('.goodslist').click(function(e){
        // console.log(e.target);
        if(e.target.parentNode.className === 'picture'){
            //获取当前li
            var currentLi = e.target.parentNode.parentNode.parentNode.parentNode;
            var uid = currentLi.getAttribute('data-id');
            console.log(uid)
            Cookie.set('nowId',uid);
            location.href = 'goods.html';  
        }
    });

    //点击综合
    $('.zh').click(function(){
        $('.goodslist').html('');
        $.ajax({
        url: '../api/goodslist.php',
        type: 'GET',
        success:function(xhr){
            //得到数据库返回的数据,生成html结构
            var xhr = JSON.parse(xhr);
            // console.log(xhr);
            show(xhr);
        }
    });
});

    //点击价格排序
    var res = true;
    $('.jg').click(function(){
        $('.goodslist').html(''); 
        $.ajax({
                url: '../api/goodslist.php',
                type: 'GET',
                async: true,
                success:function(xhr){
                    //得到数据库返回的数据,生成html结构
                var goodslist = JSON.parse(xhr);
                console.log(goodslist[0].price);
                //获取数据
                if(res){
                    goodslist.sort(function(a,b){
                        return a['price'] - b['price'];
                    });

                }else{
                    goodslist.sort(function(a,b){
                        return b['price'] - a['price'];
                    });
                }
                res = !res;
                //刷新显示页面
                // console.log(goodslist); 
                show(goodslist);

            }
        }); 
    });   

    //点击价格排序
    var res1 = true;
    $('.pl').click(function(){
        $('.goodslist').html(''); 
        $.ajax({
                url: '../api/goodslist.php',
                type: 'GET',
                async: true,
                success:function(xhr){
                    //得到数据库返回的数据,生成html结构
                var goodslist = JSON.parse(xhr);

                //获取数据
                if(res1){
                    goodslist.sort(function(a,b){
                        return a['commentCount'] - b['commentCount'];
                    });

                }else{
                    goodslist.sort(function(a,b){
                        return b['commentCount'] - a['commentCount'];
                    });
                }
                res1 = !res1;
                //刷新显示页面
                // console.log(goodslist); 
                show(goodslist);
            }
        }); 
    }); 

    function show(news){
        var ul = document.createElement('ul');
            ul.innerHTML = news.map(function(goods){
                return `
                    <li class="prod" data-id="${goods.id}">
                        <div class="allgoods">     
                            <div class="picture">
                                <img src=${goods.imgurl}>
                            </div>
                            <div class="minip">
                                <span><img src=${goods.imgurl}></span>
                                <span><img src=${goods.imgurl}></span>
                            </div>
                            <p class="price">￥${goods.price}</p>
                            <a href="${goods.url}" class="title">${goods.title}<a>
                            <div class="pinlun">评论数:${goods.commentCount}</div>
                            <div class="join">加入购物车</div>
                            <div class="goods_bt"><span>${goods.store}<span></div>
                        </div> 
                    </li>`
            }).join('');     
        $('.goodslist').append(ul);     
    }

    //点击加入购物车，购物车数量加1
    $('.goodslist').on('click','.join',function(){

        $cartNum = $('#cartNum').text();
        // console.log($cartNum)
        $cartNum++;
        $('#cartNum').text($cartNum);

        //飞入购物车
        var oldImg = $(this).parents('.allgoods');

        var newImg = oldImg.clone();
        newImg.css({
            'position':'absolute',
            'top': oldImg.offset().top +'px',
            'left': oldImg.offset().left +'px',
            'width': oldImg.width() +'px',
            'height': oldImg.height() +'px'
        });
        //新的加入久的
        $(oldImg).parents('.prod').append(newImg);
        // console.log($(this).parent())
        newImg.animate({
            top: $('.right-car').offset().top,
            left: $('.right-car').offset().left,
            width:0,
            height:0
        },"slow",function(){
            $(newImg).remove();
        });
    });

    //分页显示
    // $.ajax({
    //     url: '../api/page.php',
    //     type: 'GET',
    //     data: `page=1&qty=4`,
    //     success:function(){
    //         let len = Math.ceil(res.total/res.qty);
    //         history.innerText = '';
    //         for(let i=0;i<len;i++){
    //             let span = document.createElement('span');
    //             span.innerText = i + 1;
    //             if(i === res.pageNo-1){
    //                 span.className = 'active';
    //             }

    //             $('history').appendChild(span);
    //         }
    //     }
    // });
    
});