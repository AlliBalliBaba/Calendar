<?php

require_once "./dbh.php";

class UserHandler extends Dbh
{
    public function signup($username, $email, $password, $repeatPassword)
    {
        if (empty($username) || empty($email) || empty($password) || empty($repeatPassword)) {
            die(header("Location: ../signup.php?error=emptyFields&uid=" . $username . "&email=" . $email));
        }
        if ($password !== $repeatPassword) {
            die(header("Location: ../signup.php?error=noPwrdMatch&uid=" . $username . "&email=" . $email));
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            die(header("Location: ../signup.php?error=invalidEmail&uid=" . $username. "&email=" . $email));
        }
        if (!preg_match("/^[a-zA-Z0-9]*$/", $username)) {
            die(header("Location: ../signup.php?error=invalidUsername&uid=" . $username . "&email=" . $email));
        }

        $connection = $this->connect();
        $stmt = $connection->prepare("SELECT name FROM users WHERE name=?");
        $stmt->bind_param("s", $username);
        if (!$stmt->execute()) {
            $connection->close();
            die(header("Location: ../signup.php?error=databankError&uid=" . $username . "&email=" . $email));
        }

        $result = $stmt->get_result();
        if (mysqli_stmt_num_rows($result) > 0) {
            $connection->close();
            die(header("Location: ../signup.php?error=UsernameTaken&uid=" . $username . "&email=" . $email));
        }

        $stmt = $connection->prepare("SELECT email FROM users WHERE email=?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        if (mysqli_stmt_num_rows($result) > 0) {
            $connection->close();
            die(header("Location: ../signup.php?error=EmailTaken&uid=" . $username . "&email=" . $email));
        }

        $hashword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $connection->prepare("INSERT INTO users (name, email, hashword) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $hashword);

        if (!$stmt->execute()) {
            header("Location: ../signup.php?error=databankError&uid=" . $username . "&email=" . $email);
        } else {
            header("Location: ../index.php?signup=sucess&uid=" . $username);
        }
        $connection->close();

    }


    public function login($uid, $password)
    {

        if (empty($uid) || empty($password)) {
            header("Location: ../index.php?error=emptyFields&uid=" . $uid);
            exit();
        }

        $connection = $this->connect();
        $stmt = $connection->prepare("SELECT * FROM users WHERE name = ? OR email = ?");
        $stmt->bind_param("ss", $uid, $password);

        if (!$stmt->execute()) {
            $connection->close();
            die(header("Location: ../index.php?error=emptyFields&uid=" . $uid));
        }
        $result = $stmt->get_result();
        $row = mysqli_fetch_assoc($result);

        if (!$row) {
            $connection->close();
            die(header("Location: ../index.php?error=noUser&uid=" . $uid));
        }

        if(!password_verify($password, $row["hashword"])){
            $connection->close();
            die(header("Location: ../index.php?error=wrongPassword&uid=" . $uid));
        }

        session_start();
        $_SESSION["userId"] = $row["id"];
        $_SESSION["username"] = $row["name"];
        header("Location: ../index.php?success=login");
    }

}
