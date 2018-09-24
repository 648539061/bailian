<?php
    include 'connect.php';



    $update = "update car set number=0";

    $result = $conn->query($update);
?>