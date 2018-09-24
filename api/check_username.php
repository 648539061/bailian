<?php
    //用户名验证
    //连接数据库
    include 'connect.php';

    //获取用户名
    $username = isset($_GET['username']) ? $_GET['username'] : null;
    //查询username
    $sql = "select * from register where username = '$username'";
    //查询username集合
    $res = $conn->query($sql);
    //判断是否获取username是否有该数据
    if($res -> num_rows>0){
        echo "no";
    }else{
        echo "ok";
    }

    $res->close();
    $conn->close();
?>