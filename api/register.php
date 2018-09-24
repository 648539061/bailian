<?php
    //注册验证
    include 'connect.php';
    $username = isset($_GET['username']) ? $_GET['username'] : null;
    $password = isset($_GET['password']) ? $_GET['username'] : null;
    //
    //编写sql语句
    $sql = 'select * from register'; 

    //读取数据库中register表,查询结果集合
    $result = $conn->query($sql);

    //获取查询结果集中所有数据
    $row = $result->fetch_all(MYSQLI_ASSOC);

    var_dump($result);
?>