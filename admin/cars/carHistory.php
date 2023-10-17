<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";

    $plate = $_POST['plate'];
	//
	$jsonObject = new json(); 
	//
    getCarHistory($dbConn, $plate, $jsonObject);
    $jsonObject->send();

	function getCarHistory($connection, $plate, $jsonObject) {
		$query = "SELECT IFNULL(s.reservation_id, 'None') as reservation_id, s.status, s.date FROM car c JOIN car_status s ON c.plate = s.car_plate
					WHERE c.plate = '$plate' ORDER BY s.date DESC;";
		$result = $connection->query($query);
		$rows = $result->fetch_all(MYSQLI_ASSOC);
		$jsonObject->success = true;
		$jsonObject->history = $rows;
		$result->free_result();
		return true;
	}
?>