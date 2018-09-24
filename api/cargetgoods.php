<?php
    include 'connect.php';

    $sql = "select * from car where number>0";

    $res = $conn->query($sql);

    $result = $res -> fetch_all(MYSQLI_ASSOC);
    $res->close();
    echo json_encode($result,JSON_UNESCAPED_UNICODE);
?>