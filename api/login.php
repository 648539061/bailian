<?php
    include 'connect.php';
    //获取用户名，密码
    $username = isset($_POST['username']) ? $_POST['username'] : null;
    $password = isset($_POST['password']) ? $_POST['password'] : null;

    //判断有无用户名，密码
    if($username && $password){
        //编写sql语句,判断是否有该用户
        $sql = "select * from register where username = '$username' and password='$password'"; 
        $res = $conn->query($sql);
        if($res->num_rows>0){
            echo 'success';
        }else{
            echo 'fail';
        }
    }
?>