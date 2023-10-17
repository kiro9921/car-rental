<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";

    $plate = $_POST['plate'];
    $status = $_POST['status'];
    //
    $jsonObject = new json();
    //
    changeStatus($dbConn, $plate, $status, $jsonObject);
    $jsonObject->send();

	function changeStatus($connection, $plate, $status, $jsonObject)
	{
		$query = <<<EOD
            INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('$plate',NULL,'$status',current_timestamp());
EOD;
		$result = $connection->query($query);
        $jsonObject->success = true;
		return true;
	}
?>