<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";
	require_once "../../utils/crypto.php";

	$reservationID = $_POST['reservationID'];
	$amount = $_POST['amount'];
	//
	$jsonObject = new json(); 
	//
    createPayment($dbConn, $reservationID, $amount, $jsonObject);
	$jsonObject->send();

	function createPayment($connection, $reservationID, $amount, $jsonObject)
	{
		$query = <<<EOD
            INSERT INTO subpayment(payment_id, amount, date) VALUES ((SELECT payment_id FROM reservation WHERE reservation.id = $reservationID), $amount, CURDATE());
EOD;
		$result = $connection->query($query);
        $jsonObject->success = true;
		return true;
	}
?>