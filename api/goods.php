<?php
    include 'connect.php';
    $uid = isset($_GET['uid']) ? $_GET['uid'] : null;
    //找到对应ID的一列
    $sql = "select * from goodslist where id = '$uid'";
    // where id = uid
     // 连接查询结果集
    $res = $conn->query($sql);
    // var_dump($res);
    //取得所有
    $row = $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode($row,JSON_UNESCAPED_UNICODE);
    // var_dump($row);
?>