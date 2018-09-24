<?php
    include 'connect.php';

    //获取id
    $uid = isset($_GET['uid']) ? $_GET['uid'] : null;

    $sql = "select * from car where id='$uid' ";

    $res = $conn->query($sql);
    // var_dump($res);
    $result = $res ->fetch_all(MYSQLI_ASSOC);
    // var_dump($result);
    $update = "update car set number=0 where id='$uid' ";

    $zhixing = $conn->query($update);
?>