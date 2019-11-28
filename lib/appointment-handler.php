<?php

require_once "dbh.php";

class AppointmentHandler extends Dbh
{
    public function getAppointments($uid, $minTime, $maxTime){
        $connection = $this->connect();
        $stmt = $connection->prepare("SELECT * FROM appointments WHERE _UID = ? AND time >= ? AND time < ?");
        $stmt->bind_param("iss", $uid, $minTime, $maxTime);
        if (!$stmt->execute()) {
            $connection->close();
            echo "internal server error";
        }
        $result = $stmt->get_result();
        $myArray = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $myArray[] = $row;
        }
        return json_encode($myArray);
        $connection->close();
    }

    public function addAppointment($uid, $content, $time){
        $connection = $this->connect();
        $stmt = $connection->prepare("INSERT INTO appointments (_UID, content, time) VALUES (?, ?, ?)");
        $stmt->bind_param("iss", $uid, $content, $time);
        if (!$stmt->execute()) {
            echo "internal server error";
        }
        $connection->close();
    }

    public function deleteAppointment($uid, $appointmentId){
        $connection = $this->connect();
        $stmt = $connection->prepare("DELETE FROM appointments WHERE _UID = ? AND id = ?");
        $stmt->bind_param("ii", $uid, $appointmentId);
        if (!$stmt->execute()) {
            echo "internal server error";
        }
        $connection->close();
    }


}