$(function(){
    //获取ID
    var id = Cookie.get('nowId');
    console.log(id);
    $.ajax({
        url: '../api/goods.php',
        tyep: 'get',
        data: `uid=${id}`,
        async: true,
        success:function(xhr){
            var xhr = JSON.parse(xhr);
            // console.log(xhr);
            var ul = document.createElement('ul');
            ul.innerHTML = xhr.map(function(goods){
                return `
                    <h1 data-id="${goods.id}">${goods.title}</h1>
                    <div class="goodsprice"><span>销售价</span>￥${goods.price}.00</div>     
                    <div class="service">
                        <ul>
                            <li class="cx"><p><span>促销</span>[满减清仓]</p></li>
                            <li class="ps"><span>配送</span>
                            <select>
                                <option value ="广东广州">广东广州</option>
                                <option value ="广东佛山">广东佛山</option>
                                <option value="广东深圳">广东深圳</option>
                                <option value="广东珠海">广东珠海</option>
                                </select><b>满一元免邮</b>
                            </li>
                            <li class="fw">
                                <span>服务</span>
                                <span>由"${goods.store}"提供发货和售后服务<span>
                                <p><i>●</i>不支持到店自提    
                                    <i>●</i>支持7天无理由退货
                                    <i>●</i>不支持货到付款
                                </p>
                            </li>
                            <li class="color">
                                <span>颜色</span>
                                <ul>
                                    <li>酒红色</li>
                                    <li>黑色</li>
                                    <li>红色</li>
                                    <li>棕色</li>
                                </ul>
                            </li>
                            <li class="cc">
                                <span>尺寸</span>
                                <ul>
                                    <li>M</li>
                                    <li>L</li>
                                    <li>XL</li>
                                    <li>2XL</li>
                                    <li>3XL</li>
                                </ul>
                            </li>
                            <li class="num">
                                <span>购买数量</span>
                                <button id="reduce">-</button>
                                <input value="1" type="text" id="itemnumber" oninput="value=value.replace(/[^\\d]/g,'')">
                                <button id="addnum">+</button>
                            </li>
                        </ul>                             
                    </div>               
                    `
            }).join(''); 
            $('.message').append(ul);
                var value = $('#itemnumber').val();
            if(value=1){
                $('.message #reduce').css({'background': '#eee','cursor':'not-allowed','color':'#d2d2d2'});
            }
        }
    });
    //li选择
    $('.message').on('click','.color li',function(){
        // console.log(6)
        $(this).css('border-color','#ec595c').siblings().css('border-color','#ccc',);
    });
    $('.message').on('click','.cc li',function(){
        // console.log(6)
        $(this).css('border-color','#ec595c').siblings().css('border-color','#ccc',);
    });

    //商品减
    $('.message').on('click','#reduce',function(){
        //它的下一个子类
        var value = $(this).next().val();
        console.log($(this).next().val())
        value--;
        // 当数组为1时不允许减
        if(value<=1){
            value = 1;
        }
        $(this).next().val(value);
        nowNum();
    });

    //商品加
    $('.message').on('click','#addnum',function(){
        //它的下一个子类
        var value = $(this).prev().val();
        value++;
        // 当数组为1时不允许减
        if(value>=999){
            value = 999;
        }
        $(this).prev().val(value);
        nowNum();
    });

    //当前数量
    $('.message').on('keyup','#itemnumber',function(){
            nowNum();
    });
    function nowNum(){
        if($('.message #itemnumber').val()>1){
            $('.message #reduce').css({'background': '#fff','cursor':'pointer','color':'#000'});
        }else{
            $('.message #reduce').css({'background': '#eee','cursor':'not-allowed','color':'#d2d2d2'});
        }      
    }

    //点击加入购物车，购物车数量加1
    $('#addCart').click(function(){
        //获取加入数量
        $addNum = $('.message #itemnumber').val();

        $cartNum = $('#cartNum').text();
        $nowNum = Number($cartNum) + Number($addNum);
        $('#cartNum').text($nowNum);

        //飞入购物车
        var oldImg = $('.tb-pic').children('img');
        var newImg = $('.tb-pic').children('img').clone();
        newImg.css({position:"fixed"});
        //新的加入久的
        $(oldImg).parents('.tb-pic').append(newImg);

        newImg.animate({
            right:0,
            bottom:20,
            width:0,
            height:0
        },"slow","",function(){
            $(newImg).remove();
        })
    });

    //右侧链
    $('.p').click(function(e){
        // console.log(e.target);
        if(e.target){
            $('#right-slidebar').css('right',0);
        }
    });

    $('.sidebar-closed').click(function(e){
        console.log(e.target);
        if(e.target.className == 'sidebar-closed' ){
            $('#right-slidebar').css('right','-276px');
        }
    });

    $('.sidebar-closed').mouseover(function(){
        console.log(666)
        $('.remove .sidebar-closed').css('margin-left', 20);
        $('.remove .sidebar-closed').mouseout(function(){
            $('.remove .sidebar-closed').css('margin-left', 18);
        });
    });

    //点击查看购物车
    $('.look_top').on('click','a',function(){
        //获取商品数量
        $cartNum = $('#cartNum').text();
        if($cartNum== 0){
            alert("您的购物车为空");
            return false;
        }
        $.ajax({
            url: '../api/car.php',
            type: 'GET',
            data: `carnum=${$cartNum}&uid=${id}`,
            success:function(){
                location.href = 'car.html';
            }    
        }); 
    });

    //放大镜图片请求
    $.ajax({
        url: '../api/goods.php',
        type: 'get',
        data: `uid=${id}`,
        success:function(xhr){
            var xhr = JSON.parse(xhr);
            console.log(xhr);
            var li = document.createElement('li');
            li.classList.add('tb-selected');
            li.innerHTML = xhr.map(function(img){
                return `
                <div class="tb-pic tb-s40">
                    <a href="javascript:void(0)">
                        <img src="${img.imgurl}" mid="${img.imgurl}" big="${img.imgurl}">
                    </a>
                </div>
                `
            }).join('');
            $('#thumblist').append(li);

            var div = document.querySelector('.tb-s310');
            div.innerHTML = xhr.map(function(img){
                return `
                    <a href="${img.imgurl}">
                        <img src="${img.imgurl}"  rel="${img.imgurl}" class="jqzoom"/>
                    </a>
                `
            }).join('');
            // $('.box').append(div);
        }
    });
});