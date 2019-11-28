<?php
require "header.php";
?>


    <main>
        <div class="login-container">
            <h2 class="title">Online Calendar</h2>
            <form action="lib/login-request.php" method="post">
                <input required maxlength="20" type="text" name="uid" placeholder="Username/E-mail.." value = <?php echo $_GET["uid"] ?? ""; ?>>
                <br>
                <input required maxlength="100" type="password" name="password" placeholder="Password..">
                <br>
                <button class="hovering white" type="submit" name="submit-login">LOGIN</button>
                <br>
                <a href="signup.php">Sign Up?</a>
            </form>

<?php
//check for errors
if (isset($_SESSION["userId"])) {
    echo ("login successful");
    echo ("logged in as " . $_SESSION["username"]);
    header("Location: ./calendar.php");
    exit();
}
if (isset($_GET["error"])) {
    if ($_GET["error"] == "emptyFields") {
        echo ("<div class='error'>Please fill in all fields!</div>");
    } else if ($_GET["error"] == "noUser") {
        echo ("<div class='error'>User does not exist</div>");
    } else if ($_GET["error"] == "wrongPassword") {
        echo ("<div class='error'>Wrong password entered</div>");
    }
}
if (isset($_GET["signup"])) {
    echo ("<div class='success'>Signup successful!</div>");
}
?>
        </div>
    </main>

<?php
require "footer.php";
?>
