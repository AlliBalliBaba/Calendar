<?php

require_once("./user-handler.php");
if(!isset($_POST["submit-signup"])){
    exit();
}

$userHandler = new UserHandler();
$userHandler->signup($_POST["uid"], $_POST["email"], $_POST["pwrd"], $_POST["repeat-pwrd"]);

