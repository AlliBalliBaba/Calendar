<?php session_start() ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="style.css">

    <link rel="manifest" href="./build/manifest.json" />
    <link href="./build/static/css/main.ee7d6dfa.chunk.css" rel="stylesheet">
    <title>Calendar</title>

</head>
<body>
    <header>
        <nav class="navbar">
            <div class="logo-container"> 
                <img  class="logo"src="./img/logo.png" alt=""> 
                <div class="username">
                    <?php echo (isset($_SESSION["username"]) ? $_SESSION["username"] : "Online Calendar" )?>
                </div>
            </div>
            <a class="hovering white" href="index.php">HOME</a>
            <a class="hovering white" href="about.php">ABOUT</a>
            <?php 
                if(isset($_SESSION["userId"])){
                    echo('<a class="hovering white" href="lib/logout-request.php">LOGOUT</a>');
                }
            ?>
            
        </nav>
        
    </header>