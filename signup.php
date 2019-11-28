<?php
require "header.php";
?>
    <main>
        <div class="login-container">
            <h2>Signup</h2>
            <form action="lib/signup-request.php" method="post">
                <input required maxlength="20" type="text" name="uid" placeholder="Username.." value = <?php echo $_GET["uid"] ?? ""; ?>>
                <br>
                <input required maxlength="256" type="text" name="email" placeholder="Email.." value = <?php echo $_GET["email"] ?? ""; ?>>
                <br>
                <input required maxlength="100" type="password" name="pwrd" placeholder="Password..">
                <br>
                <input required maxlength="100" type="password" name="repeat-pwrd" placeholder="Repeat Password..">
                <br>
                <button class="hovering white" type="submit" name="submit-signup">Signup</button>
            </form>


<?php
//check for errors
if (isset($_GET["error"])) {
    if ($_GET["error"] == "emptyFields") {
        echo ("<div class='error'>Please fill in all fields!</div>");
    } else if ($_GET["error"] == "UsernameTaken") {
        echo ("<div class='error'>>Username is already taken. Please choose a different one.</div>");
    } else if ($_GET["error"] == "databankError") {
        echo ("<div class='error'>Internal server error, please try again later.</div>");
    } else if ($_GET["error"] == "invalidUsername") {
        echo ("<div class='error'>Invalid username, please use only regular charakters!</div>");
    } else if ($_GET["error"] == "invalidEmail") {
        echo ("<div class='error'>Invalid E-mail adress!</div>");
    } else if ($_GET["error"] == "noPwrdMatch") {
        echo ("<div class='error'>The passwords don't match!</div>");
    } else if ($_GET["error"] == "EmailTaken") {
        echo ("<div class='error'>>There already is an account registered under that E-mail address.</div>");
    }
}
?>

</div>
    </main>

<?php
require "footer.php";
?>