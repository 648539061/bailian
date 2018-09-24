$(function(){
    //吸顶菜单
    //顶部高度
    // var boxTop = $('#box').offset().top;
    // $(window).on('scroll',function (){
    //     //滚动高度
    //     var scrollTop = $(document).scrollTop();
    //     if(scrollTop>=boxTop){
    //         $('#box').css({'position':'fixed','display':'block','top':'0'});
    //     }else{
    //         $('#box').css({'position':'absolute','display':'none'});
    //     }
    // });
    // 登陆页面
    $('#banner .denglu').click(function(){
        location.href = 'html/login.html';
    });
    
    //注册页面
    $('#banner .zhuce').click(function(){
        location.href = 'html/register.html';
    });

    //左侧链
    $('.zuoce li').click(function(){
        //获取点击的index
        var index = $('.zuoce li').index(this);
        //点击移出active
        $(this).css({"background":"#ff6f6f","color":"#000"}).siblings().css({"background":"#333","color":"#fff"});

        // h为当前的offsettop
        var h = $(".box-zhuti").eq(index).offset().top;

        //根据html或body动画移动，时间0.5s
        $('html, body').animate({
            scrollTop: h + 'px'
        }, 500);
    });

    $(".gotop").click(function(){
        // 点击返回顶部
        this.onclick = ()=>{
    
            let timer = setInterval(()=>{
                // 计算缓冲速度（差值越大速度越大）
                let speed = window.scrollY/10;
                scrollBy(0,-speed);
                if(window.scrollY <= 0){
                    clearInterval(timer);

                    // 重置目标值
                    scrollTo(0,0);
                }
            },30);
        }
    });


    window.onscroll = function(){
        // var index = $('.zuoce li').index($('.zuoce li'));
        // var h = $(".box-zhuti").eq(index).offset().top;
        // if(window.scorllY == h){
        //     $(this).css({"background":"#ff6f6f","color":"#000"}).siblings().css({"background":"#333","color":"#fff"});
        // }
        if(scrollY<927){
            $('.zuoce').css('display','none');

        }else{
            $('.zuoce').css('display','block');
        }
    }

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

    //轮播图按钮隐藏
    $('.swiper-container').mouseover(function(){
        $('.my-button-hidden').css('display','blcok');
        // $('.swiper-button-next').css('display','blcok');
    });
});
