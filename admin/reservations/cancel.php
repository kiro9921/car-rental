<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";
	require_once "../../utils/crypto.php";

	$reservationID = $_POST['reservationID'];
	//
	$jsonObject = new json();
	//
    deleteReservation($dbConn, $reservationID, $jsonObject);
	$jsonObject->send();

	function deleteReservation($connection, $reservationID, $jsonObject)
	{
		$query = <<<EOD
            DELETE p FROM payment p join reservation r on p.id = r.payment_id
                where r.id = $reservationID;
EOD;
		$result = $connection->query($query);
        $jsonObject->success = true;
		return true;
	}
?>