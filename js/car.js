$(function(){
    $.ajax({
        url: '../api/cargetgoods.php',
        type: 'GET',
        success:function(xhr){
            var xhr = JSON.parse(xhr);
            // console.log(xhr);
            //循环生成html结构
            var div = document.createElement('div');
            div.classList.add('allgoods');
            div.innerHTML = xhr.map(function(goods){
                return`
                    <div class='showgoods' id="${goods.id}" style="margin-top: 16px">
                        <input type='checkbox' class="othercheck"><img src="${goods.imgurl}">
                        
                        <div class='showtitle'><span >${goods.title}</span></div>     
                        <div class='showprice'><span class="price">${goods.price}</span></div>
                        <div class='showNumber'>
                            <em class="reduce">-</em>
                            <input class="now_num" type='text' value="${goods.number}">
                            <em class="add">+</em>
                        </div>
                        <div class="total"><i>￥</i><span class="now_total">${goods.total}</span></div>
                        <div class="del"><a href="javascript:void(0)">删除</a></div>
                    </div>
                `
            }).join('');
            $('.shangpin').append(div);
        }
    });
    
    //商品种类
    function zhonglei(arr){
        var arr = checknum();
        $('.xuanze').find('b').text(arr.length);   
    }

        // $price = $('#shangpin #total').val();
        // //计算总价
        // console.log($price); 
    // window.onscroll = function(){
    //     var tall = scrollY;
    //     console.log(tall);
    //     if(scrollY<=188){
    //         $('.goodscar').css({'position':'fixed','bottom':'188','left':'50'});
    //     }
    //     else{
    //         $('.goodscar').css({'position':'relative','bottom':'0'});
    //     }
    // }

    //商品减数量
    $('#shangpin').on('click','.reduce',function(){
        var val = $(this).next().val();
        val--;
        if(val<=1){
            val = 1;
        }
        $(this).next().val(val);
        // e.target.next()
        $price = $(this).parent().prev().find('.price').text();

        // console.log($price);
        $total = Number($price)*$(this).next().val();

        $(this).parent().next().find('span').text($total);

        //减完计算被选中 商品数量、价格
        var arr = checknum();
        allnum(arr);
        allprice(arr);
    });


    //商品加
    $('#shangpin').on('click','.add',function(){
        var val = $(this).prev().val();
        val++;
        if(val>=100){
            val = 100;
        }
        $(this).prev().val(val);
        
        $price = $(this).parent().prev().find('.price').text();

        $total = Number($price)*$(this).prev().val();

        $(this).parent().next().find('span').text($total);
        //加完计算被选中 商品数量、价格
        var arr = checknum();
        allnum(arr);
        allprice(arr);
        zhonglei(arr);
    });
  

    //每次点击计算一次商品数量总数

    //全选（点击全选按钮判断是否全部选择）
    var ischecked = true;
    $('#allcheck').on('click',function(){
        //全选为真添加选中属性
        
        if(ischecked){
            $('#allcheck').prop('checked','checked');
            $('.othercheck').prop('checked','checked');
            $('#all').prop('checked','checked');
        }else{
            //否则移除属性
            $('#allcheck').removeAttr('checked');
            $('.othercheck').removeAttr('checked');
            $('#all').removeAttr('checked');
        }
        var arr = checknum();
        allnum(arr);
        allprice(arr);
        zhonglei(arr);
        ischecked = !ischecked;
        
    });


    //上面的全选
    var ischecked2 = true;
    $('#all').on('click',function(){
        //全选为真添加选中属性
        if(ischecked2){
            $('#allcheck').prop('checked','checked');
            $('.othercheck').prop('checked','checked');
            $('#all').prop('checked','checked');
        }else{
            //否则移除属性
            $('#allcheck').removeAttr('checked');
            $('.othercheck').removeAttr('checked');
            $('#all').removeAttr('checked');
        }
        //先判断再取数组数量
        var arr = checknum();
        allnum(arr);
        allprice(arr);
        zhonglei(arr);
        ischecked2 = !ischecked2;
        
    });


    //勾选的数量
    function checknum(){
        //创建一个数组保存数量
        var arr = [];
        //获取子类input的长度
        var length = $('.othercheck').size();
        for(var i = 0;i < length;i++){
            //子类有几个有checked属性
            if($('.othercheck').eq(i).prop('checked')){
                arr.push(i);
            }
        }
        return arr;
        //获得选中数量的数组
    }


    //已选商品的数量
    function allnum(arr){
        //开始为0
        //商品的数量由选中商品的数量决定
        var num = 0;
        //遍历数组找出对应的数量
        for(var i=0;i<arr.length;i++){
            num+= parseInt($('.now_num').eq(arr[i]).val());
        }
        //计算完成
        $('.xuanze i').text(num);
    }


    //子类input委托父类
    $('.shangpin').on('click','.othercheck',function(){
        var arr = checknum();//获取被勾选的数量
        //如果被勾选的数量等于子类的长度
        if(arr.length == $('.othercheck').size()){
            //全选
            $('#allcheck').prop('checked', 'checked');
            $('#all').prop('checked','checked');
            ischecked = false;
            ischecked2 = false;
        }else{
            //不等于移除
            $('#allcheck').removeAttr('checked');
            $('#all').removeAttr('checked');
            //保证下次点击s为true
            ischecked = true;
            ischecked2 = true;
        }
        allnum(arr);//传入勾选数量数组计算商品数
        allprice(arr);
        zhonglei(arr);
    });


    //商品的价格总数(arr为选中数量的数组)
    function allprice(arr){
        // 商品价格为0
        var price = 0;
        // 获取它们各自的商品价格
        for(var i = 0;i<arr.length;i++){
            var nowprice = $('.now_total').eq(arr[i]).text();
            price += parseInt(nowprice);
        }
        //写入商品价格总数
        $('.jine span').text(price);
    }

    //删除操作
    $('#shangpin').on('click','.del',function(){
       
        if(confirm('是否删除该商品')){
            // console.log($(this).parent().attr('id'));
            $uid = $(this).parent().attr('id');
            $(this).parent().remove();
            var arr = checknum();
            allnum(arr);
            allprice(arr);
            zhonglei(arr);
        $.ajax({
            url: '../api/goodsdel.php',
            type: 'GET',
            data: `uid=${$uid}`
            });
        }
    });

    //删除全部商品操作
    $('.shanchu').on('click',function(){
        if(confirm('是否删除全部商品')){
            $(this).parent().parent().remove();
            var arr = checknum();
            allnum(arr);
            allprice(arr);
            zhonglei(arr);
            $.ajax({
                url: '../api/allgoodsdel.php',
                type: 'GET'
            });
        }
    });
});