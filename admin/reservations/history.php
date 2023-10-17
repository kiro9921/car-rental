<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";

    $reservationID = $_POST['reservationID'];
	//
	$jsonObject = new json(); 
	//
    getReservationHisotry($dbConn, $reservationID, $jsonObject);
    $jsonObject->send();

	function getReservationHisotry($connection, $reservationID, $jsonObject) {
		$query = "SELECT r.id as reservation_id, cs.status, cs.date
                    FROM reservation r join car_status cs on r.id = cs.reservation_id
                    WHERE r.id = $reservationID ORDER BY cs.date DESC;";
		$result = $connection->query($query);
		$rows = $result->fetch_all(MYSQLI_ASSOC);
		$jsonObject->success = true;
		$jsonObject->history = $rows;
		$result->free_result();
		return true;
	}
?>