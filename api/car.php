<?php
    include 'connect.php';

    //获取传过来的id和数量
    $carNum = isset($_GET['carnum']) ? $_GET['carnum'] : null;
    $id = isset($_GET['uid']) ? $_GET['uid'] : null;
    $sql = "select * from car where id='$id' ";

    //得到对应的id集合
    $res = $conn->query($sql);
    var_dump($res);
    if($res->num_rows>0){
        $update = "update car set number='$carNum' where id='$id'";
        $updateres = $conn->query($update);
        // var_dump($updateres);
    }else{
        $add = "insert into car(number) values('$carNum')";
        $addres = $conn->query($add);
        // var_dump($addres);
    }

    //计算商品总价
    $total = "select (number * price) as total from car where id='$id'";

    $result = $conn->query($total);
    if($result->num_rows>=0){
        $updatetotal = "update car set total=number * price where id='$id'";
        $all = $conn->query($updatetotal);
        // var_dump($all);
    }
   
?>