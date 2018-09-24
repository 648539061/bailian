$(function(){
    //用户名验证$('.username')
    $span = $('.username span');
    // 鼠标点击时click
    $('#username').click(function(){
        //生成用户验证提示信息
        if($('#username').val() === ''){
            $span.text('请输入用户名');
            $span.css('color','blue');
        }  
    });
    
    //点击登陆跳转登陆页面
    $('#main .denglu').click(function(){
        location.href = '../html/login.html';
    });

    // 键盘失去keyup事件
    let statusCode = [200,304];
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(statusCode.indexOf(xhr.status)>=0){
            let res = xhr.responseText;
            console.log(res);
            if(res === 'no'){
                $span.text('该用户名已被注册');
                $span.css('color','red');
            }
        }
    }
    $('#username').keyup(function(){
        $username = $('#username').val();
        //失去焦点时
        var reg = /^[a-z0-9][\w\-]{5,19}$/;
        console.log($('#username span'));
        if(!reg.test($username)){
            $span.text('用户名不合法');
            $span.css('color','red');
            return false;
        }else{
            $span.text('输入正确');
            $span.css('color','green');
        }
        xhr.open('get','../api/check_username.php?username='+$username,true);
        xhr.send();
    });
});