<?php
    // 连接数据库 include
    //主机名，用户名，密码，数据库名
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "bailian_goodslist";

    //创建连接
    $conn = new mysqli($servername,$username,$password,$dbname);

    // 检测连接(public 'connect_error' => null)
    if ($conn->connect_error){
        die("连接失败: " . $conn->connect_error);
    }

    //设置编码，防止乱码
    $conn->set_charset('utf8');
 ?>