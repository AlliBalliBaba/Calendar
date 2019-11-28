<?php

// appointments api
session_start();
require_once("./lib/appointment-handler.php");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT,POST,DELETE");
header("Access-Control-Allow-Origin: *");
$appHandler = new AppointmentHandler();
$inputJSON = file_get_contents('php://input');
$arr = json_decode($inputJSON, TRUE); 

//check if person is logged in
if(empty($_SESSION["userId"]) || $_SERVER['REQUEST_METHOD'] === 'POST'){
    //die("unathourized access");
}
//$currentId = $_SESSION["userId"];
$currentId=9;

if (array_key_exists("content", $arr) && array_key_exists("time", $arr)) {
    $appHandler->addAppointment($currentId, $arr["content"], $arr["time"]);
}

if (array_key_exists("appId", $arr)) {
    $appHandler->deleteAppointment($currentId, $arr["appId"]);
}

echo $appHandler->getAppointments($currentId, $arr["mintime"], $arr["maxtime"]);


