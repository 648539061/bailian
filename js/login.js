$(function(){
    //注册新账号
    $('.title a').click(function(){
        location = '../html/register.html';
    });
    //获取button、点击时进行验证
    $('button').click(function(){
    //获取用户名密码
        $username = $('#username').val();
        $password = $('#password').val();
        //请求验证
        
        $.ajax({
            url: '../api/login.php',
            type: 'POST',
            data: {'username':$username,'password':$password},
            success:function(xhr){
                if(xhr === 'success'){
                    location = 'list.html';
                }else{
                    alert('用户名或密码错误');
                }
            }
        });
    }); 
});