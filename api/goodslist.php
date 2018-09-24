<?php
    include 'connect.php';

    // $page = isset($_GET['page']) ? $_GET['page'] : 1;
    // $qty = isset($_GET['qty']) ? $_GET['qty'] : 10;

    //编写sql语句
    $sql = 'select * from goodslist';

    //读取数据库中goodslist表,查询结果集合
    $res = $conn->query($sql);

    //获取查询结果goodslist所有数据
    $row = $res->fetch_all(MYSQLI_ASSOC);
    //转为json字符串传给前端
    // $rel= array(
    //     'total' => count($row),
    //     'pageNo' => $page*1,
    //     'qty' => $qty*1,
    //     'data' => array_slice($row,($page-1)*$qty,$qty)
    // );
    echo json_encode($row,JSON_UNESCAPED_UNICODE);

    $res->close();
    $conn->close();
?>