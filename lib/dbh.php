<?php

class Dbh{

    const SERVERNAME="localhost";
    const USERNAME = "yourusername";
    const PASSWORD = "yourpassword";
    const DBNAME = "onlinecalendar";

    protected function connect()
    {
        $conn = new mysqli(self::SERVERNAME, self::USERNAME, self::PASSWORD, self::DBNAME);
        if ($conn->connect_error) {
            die("Verbindung fehlgeschlagen: " . $conn->connect_error);
        }
        return $conn;
    }


}
