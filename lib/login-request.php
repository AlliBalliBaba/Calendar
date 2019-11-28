<?php

require_once("./user-handler.php");
if(!isset($_POST["submit-login"])){
    exit();
}

$userHandler = new UserHandler();
$userHandler->login($_POST["uid"], $_POST["password"]);