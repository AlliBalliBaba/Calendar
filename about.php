<?php
    require("header.php");

    if (isset($_GET["signup"])) {
        echo ("<div class='success'>Signup successful!</div>");
    }
?>


    <main>
        <div class="login-container">
            <h2 class="title">About</h2>
            <p style="margin:20px; font-size:18px">This is a free online calendar/diary/datebook. Click on a day in the calender to add a new note for that day. 
                The data is saved on a MySQL Database. 
            </p>
            <p style="font-size:18px">Source code on github: </p>
            <a href="https://github.com/AlliBalliBaba">https://github.com/AlliBalliBaba</a>
        </div>
    </main>


<?php
    require("footer.php");
?>